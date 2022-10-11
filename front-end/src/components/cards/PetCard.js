import React, { useEffect, useContext, useState} from 'react';
import { AuthContext } from "../../context/AuthContext";
import "../../styles/pet.css";
//import SimpleImageSlider from "react-simple-image-slider";
import Carousel from 'react-bootstrap/Carousel';
import ReactPlayer from "react-player";
import "bootstrap/dist/css/bootstrap.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PetsIcon from '@mui/icons-material/Pets';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Button from '@mui/material/Button';
import PaymentModal from "../modals/PaymentModal";
import { useLoaction, useLocation, useNavigate } from 'react-router-dom';

const PetCard = ({item}) => {

  const [openModal, setOpenModal] = useState(false);

  const { user, loading, dispatch } = useContext(AuthContext);
  
  // console.log(item);

  const navigate = useNavigate();
  
  // useEffect(() => {
  //   
  // }, []);

  const handleClick = () => {
    if(user === null) navigate("/signin");
    setOpenModal(true);
  };

  return ( 
    <div className='petscreen'>
        {loading ? (
            "Loading..."
        ) : (
        <div className="petcontainer">
            <div className="carousel">
              <Carousel>
               {item.item.image_url.map((image, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="photos"
                        src={image}
                        alt="images"
                    />
                    <Carousel.Caption>
                    <h3>Page {index+1}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
               ))}
                {item.item.video_url && 
                  <Carousel.Item>
                    <ReactPlayer
                    url={item.item.video_url}
                    pip={true}
                    controls={true}
                    playing={true}
                    className="carouselItem"
                    />
                    <Carousel.Caption>
                    <h3>Video 1</h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                }
              </Carousel>  
            </div>

            <div className="location">
              <div>
                <PetsIcon />
                <span>{item.item.name}</span>
              </div> 
              <div>
                <LocationOnIcon />
                <span>{item.item.city}</span>
              </div>
              <div>
                <CurrencyPoundIcon />
                <span>{item.item.price}</span>
              </div>
            </div>

            <Button onClick={handleClick} variant="contained" color="success" >
                <ContactPhoneIcon />
                <span className="contactButton"><b>Get phone number</b></span>
            </Button>

            <div className="petDetails">
                <div className="petColumns">
                    <span><b>Bread:</b> {item.item.bread}</span>
                    <span><b>Gender:</b> {item.item.gender}</span>
                    <span><b>Age:</b> {item.item.age} years old</span>
                    <span><b>Colour:</b> {item.item.colour}</span>
                </div>
                <div className="petColumns">
                    <span><b>Origin:</b> {item.item.origin}</span>
                    <span><b>Licence:</b> {item.item.licence}</span>
                    <span><b>Vaccinated:</b> {item.item.vaccinated=true ? ("Yes") : ("No")}</span>
                </div>  
            </div>

            <div className="petDescription">
                <div className="descriptionItem">
                    <span ><b>Description:</b></span>
                </div>
                <div className="descriptionItem">
                    <span>{item.item.description}</span>
                </div>  
            </div>

           {user && 
            <PaymentModal 
              openModal={openModal} 
              setOpenModal={setOpenModal} 
              item={item}
            />
           }    
        </div>
        )}
    </div>
  );
};
 
export default PetCard;