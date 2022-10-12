import React, { useState } from "react";
import Header from "../components/Header";
import AllPets from "../components/AllPets";

const Home = () => {
  const [searchBreed, setSearchBreed] = useState('');
  return (
    <div>
      <Header setSearchBreed={setSearchBreed}/>
      <AllPets searchBreed={searchBreed}/>
    </div>
  );
};

export default Home;