import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import AddPet from "./routes/AddPet";
import Pet from "./routes/Pet";
import ForgotPawwsord from "./routes/ForgotPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/forgot-password" element={<ForgotPawwsord/>}/>
        <Route path="/add-pet" element={<AddPet/>}/>
        <Route path="/pet" element={<Pet/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
