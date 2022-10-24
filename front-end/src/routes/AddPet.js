import React, { useContext, useEffect, useState }from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Resizer from 'react-image-file-resizer';
import PetForm from "../components/forms/PetForm";
import { toast } from 'react-toastify';

const AddPet = () => {

    const { user } = useContext(AuthContext);

    const [pets, setPets] = useState({
        name: " ",
        type: "Dog",
        breed: " ",
        gender: "Male",
        age: " ",
        origin: " ",
        colour: " ",
        description: " ",
        licence: " ",
        price: " ",
        vaccinated: "Yes",
        loading: false, 
    });

    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState([]);

    const [video, setVideo] = useState("");
    const [current, setCurrent] = useState({});
    const [uploading, setUploading] = useState(false);
    const [uploadButtonVideo, setUploadButtonVideo] = useState("Upload Video");
    const [progress, setProgress] = useState(0);

    //console.log(user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) navigate("../signin");
    }, [user]);

    const handleChange = (e) => {
        setPets(prev=>({ ...prev, [e.target.id]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) }))
    }

    const  handleImage = async (e) => {
        try {

            let files = e.target.files;
            //console.log("Files =>", files);
            const fileArray = Array.from(files).map((file)=> window.URL.createObjectURL(file));
            setPreview((prevImages) => prevImages.concat(fileArray))
            setPets({...pets, loading: true });
            
            const imageArray = Object.keys(files).map(item => {
                return files[item]
            })
            //console.log("Images array => ", imageArray);
    
            let galery = [];
            imageArray.map((file) => Resizer.imageFileResizer(file, 300, 300, "JPEG", 100, 0, async (uri) => {
                await galery.push(uri);
                const {data} = await axios.post('/pets/upload-image', {
                    images: galery
                })
            
                //console.log("Images uploaded => " , await data)
                setImages(data.map(item => item.Location));
                setPets({...pets, loading:false}); 
            }));   
            //console.log("Galery => ", galery);   
        } catch (err) {
            //console.log(err);
            setPets({...pets, loading:false});
            toast.error('Image upload failed. Try later.');
        }
        
    };
    

    const handleImageRemove = async (image) => {
        try {
            //console.log("REMOVE IMAGE")

            setPreview(preview.filter((e) => e !== image))

            const res = await axios.post('/pets/remove-image', { image });

            //console.log("image removed =>", res);
            return

            // setPets({...pets, loading: true});
            // setImages(images.filter(images[0] => images.splice[images[0]]));
            // setPets({...pets, loading: false});
        } catch (err) {
            //console.log(err);
            setPets({ ...pets, loading: false });
            toast.error("Image remove failed.");
        }
    };

    const handleVideo = async(e) => {
        try {

            //remove previous video
            if (current.video && current.video.Location) {
                const res = await axios.post(
                    "/pets/remove-video",
                    video
                );
                console.log("REMOVED ===> ", res);
            }
            // upload a new video
           const file = e.target.files[0];
            setUploadButtonVideo(file.name); 
            setUploading(true);

            const videoData = new FormData(); 
            videoData.append("video", file);
            // save progress bar and send video as form data to backend
            const { data } = await axios.post(
              "/pets/upload-video",
              videoData,
              {
                onUploadProgress: (e) => {
                  setProgress(Math.round((100 * e.loaded) / e.total));
                },
              }
            );
            // once response is received
            // console.log(data);
            setVideo(data.Location);
            setPets({...pets, loading: false });
            setUploading(false);
        } catch (err) {
            console.log(err);
            setPets({...pets, loading:false});
            setUploading(false);
            toast.error("Video upload failed");
        }
        
    };

    const handleVideoRemove = async () => {
        try {
          setUploading(true);
          const { data } = await axios.post(
            "/pets/remove-video",
            video
          );
          console.log(data);
          setVideo("");
          setProgress(0);
          setUploading(false);
          setUploadButtonVideo("Upload another video");
          setPets({...pets, loading: false});
        } catch (err) {
          console.log(err);
          setUploading(false);
          setPets({...pets, loading: false});
          toast.error("Video remove failed");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log("pet name =>", pets.name.length);
        // console.log(images);
        // console.log(video);
        // console.log(user.id);
        if(pets.name.length < 3 ) { 
            toast.error('Insert name');
            //console.log('Insert a name');
            return;
        }
        if (pets.breed.length < 3) { 
            toast.error('Insert breed');
            return;
        }
        if (pets.origin.length < 2) { 
            toast.error('Insert origin');
            return;
        }
        if (pets.colour.length < 3) { 
            toast.error('Insert colour');
            return;
        }
        if (pets.description.length < 5) { 
            toast.error('Insert description');
            return;
        }
        if (pets.licence.length < 5) { 
            toast.error('Insert licence');
            return;
        }
        try {
            const {data} = await axios.post("/pets", {
                ...pets,
                images,
                video,
                user,
            });
            toast.success("Great! Now you can see your add on front page");
            navigate("/");
        } catch (err) {
            toast.error(err.response.data);
        }  
    };
   
    return ( 
        <div>
            <Header />
            <PetForm 
                handleChange={handleChange}
                handleImage={handleImage}
                handleImageRemove={handleImageRemove} 
                pets={pets}
                uploading={uploading}
                progress={progress}
                uploadButtonVideo={uploadButtonVideo}
                handleVideo={handleVideo}
                handleVideoRemove={handleVideoRemove}
                handleSubmit={handleSubmit}
                video={video}
                images={images}
                preview={preview}
            />
        </div>       
     );
}
 
export default AddPet;