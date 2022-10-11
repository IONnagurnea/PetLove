import React, {useContext} from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import PetCard from "../components/cards/PetCard.js"

const Pet = () => {

  const location = useLocation()
  const { item } = location.state

  const { loading } = useContext(AuthContext);
  
  return ( 
    <div>
      <Header />
      <PetCard  item={item} />
    </div>
  )
}
 
export default Pet;