import React, { useContext, useEffect, useState }from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Resizer from 'react-image-file-resizer';
import PetForm from "../components/forms/PetForm";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPet = () => {

    const { user } = useContext(AuthContext);

    const [pets, setPets] = useState({
        name: " ",
        type: " ",
        bread: " ",
        gender: "Male",
        age: " ",
        origin: " ",
        colour: " ",
        description: " ",
        licence: " ",
        price: " ",
        vaccinated: " ",
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
            
                console.log("Images uploaded => " , await data)
                setImages(data.map(item => item.Location));
                setPets({...pets, loading:false}); 
            }));   
            //console.log("Galery => ", galery);   
        } catch (err) {
            console.log(err);
            setPets({...pets, loading:false});
            toast('Image upload failed. Try later.');
        }
        
    };
    

    const handleImageRemove = async (image) => {
        try {
            //console.log("REMOVE IMAGE")

            setPreview(preview.filter((e) => e !== image))

            const res = await axios.post('/pets/remove-image', { image });

            console.log("image removed =>", res);
            return

            // setPets({...pets, loading: true});
            // setImages(images.filter(images[0] => images.splice[images[0]]));
            // setPets({...pets, loading: false});
        } catch (err) {
            console.log(err);
            setPets({ ...pets, loading: false });
            toast("Image remove failed.");
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
           const file = e.target.files[0]; //get the file
            setUploadButtonVideo(file.name); //change the state
            setUploading(true);

            const videoData = new FormData(); // using the browser api
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
            toast("Video upload failed");
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
          toast("Video remove failed");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        
            console.log(pets);
            console.log(images);
            console.log(video);
            console.log(user.id);
            const {data} = await axios.post("/pets", {
                ...pets,
                images,
                video,
                user,
            });
            // // toast("Great! Noe you can start adding lessons");
            navigate("/");
        } catch (err) {
            // toast(err.response.data);
        }  
    };
   
    return ( 
        <div>
            <Header />
            <ToastContainer />
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