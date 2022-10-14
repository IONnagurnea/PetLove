import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/login.css";
import Header from "../components/Header";
import PhoneInput from 'react-phone-number-input';
import { Country, State, City }  from 'country-state-city';
import Select from "react-select";
import 'react-phone-number-input/style.css';
//import {toast} from 'react-toastify';

const Register = () => {
    const [details, setDetails] = useState({
        firstName: " ",
        lastName: " ",
        email: " ",
        password: " ",
        confirmPassword: " ",
    })

    const [address, setAddress] = useState({
        country: " ",
        state: null,
        city: null
    })

    const [phone, setPhone] = useState("");
  
    const { user, loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();
   
    useEffect(() => {
        if (user !== null) navigate("/signin");
    }, [user]);

   
    const updatedCountries = Country.getAllCountries().map((country) => ({
        label: country.name,
        value: country.isoCode,
        ...country
    }));

    const updatedStates = (countryCode) =>
        State
          .getStatesOfCountry(countryCode)
          .map((state) => ({ label: state.name, value: state.isoCode, ...state }));
    const updatedCities = (countryCode, stateCode) =>
        City
          .getCitiesOfState(countryCode, stateCode)
          .map((city) => ({ label: city.name, value: city.isoCode, ...city }));
    

    const handleChange = (e) => {
        setDetails(prev=>({ ...prev, [e.target.id]: e.target.value }))
    }
    console.log(phone);
 //console.log(details);
//  console.log("state =>", State.getStatesOfCountry(address.country.isoCode));
//  console.log("city =>", City.getCitiesOfState(address.state.countryCode, address.state.isoCode));
//  console.log(address.country.isoCode);
//  console.log(address.state.isoCode);
//  console.log(address.state.countryCode);
    //console.log(address.country.name);
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (details.password !== details.confirmPassword) {
            //toast.error('Passwords do not match');
            return;
          };
        if (phone.length !== 13) {
            //toast.error('Insert a valid phone number');
            console.log("phone not valid =>", phone.length);
            return;
          }
        try {
            const results = await axios.post("/register",
            {details, address, phone}
            );
            //toast.success('Registration succesful. Please login.');
            
            setDetails({
                firstName: " ",
                lastName: " ",
                email: " ",
                password: " ",
                confirmPassword: " ",
                country: " ",
                city: null,
                county: null,
                phone: " "
            });
            setAddress({
                country: " ",
                state: null,
                city: null
            });
            setPhone ("");
            dispatch({ type: 'LOGIN_START'});
            navigate("../signin");    
        } catch (err) {
            console.log(err);
            //toast.error(err.response.data);

        }   
    };
  return (
    <div>  
        <Header />
        <div className="login">
            <form id="rContainer" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input 
                    type="text" 
                    className="rInput" 
                    placeholder="First Name" 
                    id="firstName"
                    onChange={handleChange} 
                    required
                />
                <input 
                    type="text" 
                    className="rInput" 
                    placeholder="Last Name" 
                    id="lastName"
                    onChange={handleChange} 
                    required
                />
                <input 
                    type="email" 
                    className="rInput" 
                    placeholder="Enter email" 
                    id="email"
                    onChange={handleChange} 
                    required
                />
                <input 
                    type="password" 
                    className="rInput" 
                    placeholder="Enter password" 
                    id="password"
                    onChange={handleChange} 
                    required
                />
                <input 
                    type="password" 
                    className="rInput" 
                    placeholder="Confirm password" 
                    id="confirmPassword"
                    onChange={handleChange} 
                    required
                />
                <Select
                    className="rSelect"  
                    id="country"
                    name="country"
                    label="country"
                    options={updatedCountries}
                    value={address.country}
                    onChange={(value) => {
                        setAddress({ country: value, state: null, city: null }, false);
                      }} 
                    required
                />
                <Select
                    className="rSelect"  
                    id="state"
                    name="state"
                    options={updatedStates(address.country ? address.country.isoCode : null)}
                    value={address.state}
                    onChange={(value) => {
                        setAddress({ country: address.country, state: value, city: null }, false)
                        }} 
                    required
                />
                <Select 
                    className="rSelect" 
                    id="city"
                    name="city"
                    options={updatedCities(address.state ? (address.state.countryCode, address.state.isoCode) : (null))}
                    value={address.city}
                    onChange={(value) => {
                        setAddress({ country: address.country, state: address.state, city: value })
                        }} 
                    required
                />
                <PhoneInput 
                    className="rInput" 
                    placeholder="Enter phone number" 
                    onChange={(value) => setPhone(value)} 
                    required
                />
                <button 
                    type="submit" 
                    disable={loading ? true : undefined}   
                    className="lButton"
                >
                    Sign Up
                </button>
                {error && <span>{error.message}</span>}
                <p className="text-center p-3">
                Already registered?{" "}
                <Link to="/signin">
                    Login
                </Link>
                </p>
            </form>
        </div>
    </div>  
  )
};

export default Register;