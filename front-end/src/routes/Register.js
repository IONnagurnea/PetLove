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
import Dialogue from '../components/modals/Dialogue';
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
    const [showDialogue, setShowDialogue] = useState(false);
  
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
        if (!details.password.length >= "8") {
            //toast.error('Passwords must contain at least 8 characters');
            return;
        };
        if (!details.password.match(/[A-Z]/)) {
            //toast.error('Password must contain at least 1 uppercase letter');
            return;
        };
        if(!details.password.match(/[a-z]/)) {
            //toast.error('Password must contain at least 1 lowercase letter');
            return;
        };
        if(!details.password.match(/[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/)) {
            //toast.error('Password must contain at least 1 special character');
            return;
        }
        if (details.password !== details.confirmPassword && details.password === " ") {
            //toast.error('Passwords and confirm passwor do not match');
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
                    onFocus={()=>setShowDialogue(false)}
                    onChange={handleChange} 
                    required
                />
                <input 
                    type="text" 
                    className="rInput" 
                    placeholder="Last Name" 
                    id="lastName"
                    onFocus={()=>setShowDialogue(false)}
                    onChange={handleChange} 
                    required
                />
                <input 
                    type="email" 
                    className="rInput" 
                    placeholder="Enter email" 
                    id="email"
                    onFocus={()=>setShowDialogue(false)}
                    onChange={handleChange} 
                    required
                />
                <input 
                    type="password" 
                    className="rInput" 
                    placeholder="Enter password" 
                    id="password"
                    onFocus={()=>setShowDialogue(true)}
                    onChange={handleChange} 
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    required
                />
                <input 
                    type="password" 
                    className="rInput" 
                    placeholder="Confirm password" 
                    id="confirmPassword"
                    onFocus={()=>setShowDialogue(true)}
                    onChange={handleChange} 
                    required
                />
                <Dialogue details={details} showDialogue={showDialogue} setShowDialogue={setShowDialogue}/>
                <Select
                    className="rSelect"  
                    id="country"
                    name="country"
                    label="country"
                    onFocus={()=>setShowDialogue(false)}
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
                    onFocus={()=>setShowDialogue(false)}
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
                    onFocus={()=>setShowDialogue(false)}
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
                    onFocus={()=>setShowDialogue(false)}
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