import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/allPets.css"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PetsIcon from '@mui/icons-material/Pets';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import styled from "styled-components";
import { laptop } from "../utils/responsive";

const Pcard = styled.div`
    margin: 10px;
    width: 35vh;
    height: 30vh;
    overflow: hidden;
    background-color: lightgrey;
    align-items: stretch;
    ${laptop({ width: "48vh" })}
`;

const Image = styled.img`
    width: 33vh;
    height: 23vh;
    ${laptop({ width: "45vh"})}
`;

const AllPets = () => {
  
  const [pets, setPets] = useState([]);
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, [pets]);

  const fetchData = async () => {
      const response = await axios.get("/pets");
      setPets(response.data);  
      setPets(response.data);  
  };

  return (
    <div className="cscreen">
     {loading ? (
       "Loading..."
     ) : (
      <div className="cards">
       {pets.map((item) => (
        <Link to="/pet" state={{ item: {item}}} key={item.id}>
          <Pcard> 
            <div className="pcontainer" >
              <div className="image">
                <Image src={item.image_url[0]} alt="pet profile image" /> 
              </div>
              <div className="pcolum">
                <div className="breed">
                  <PetsIcon />
                  <span>{item.bread}</span>
                </div>
                <div className="city">
                  <LocationOnIcon />
                  <span>{item.city}</span>
                </div>
                <div className="price">
                  <CurrencyPoundIcon />
                  <span>{item.price}</span>
                </div>
              </div>
            </div>
          </Pcard>
        </Link>
        ))} 
      </div>
     )}
    </div>
  );
};

export default AllPets;