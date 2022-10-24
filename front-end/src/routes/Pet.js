import React, {useContext} from 'react';
import { useLocation } from 'react-router-dom';
import Header from "../components/Header";
import PetCard from "../components/cards/PetCard.js"
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pet = () => {

  const location = useLocation()
  const { item } = location.state

  return ( 
    <div>
      <Header />
      <ToastContainer />
      <PetCard  item={item} />
    </div>
  )
}
 
export default Pet;