import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/login.css";
import Header from "../components/Header";
import PhoneInput from 'react-phone-number-input';
import { Country, State, City }  from 'country-state-city';
import {FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import 'react-phone-number-input/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { phoneValidation } from "../hooks/phoneValidation"
import { emailValidation } from "../hooks/emailValidation"
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [details, setDetails] = useState({
        firstName: " ",
        lastName: " ",
        email: " ",
    })
    const [password, setPassword] = useState({
        userPassword: "",
        confirmUserPassword: "",
    });
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

   

    const [
        validLength,
        hasNumber,
        upperCase,
        lowerCase,
        match,
        specialChar,
        ] = usePasswordValidation({
        userPassword: password.userPassword,
        confirmUserPassword: password.confirmUserPassword,
        });
    
    const [phone, setPhone] = useState("");
    const [showDialogue, setShowDialogue] = useState(false);
  
    const { user, loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();
   
    useEffect(() => {
        if (user !== null) navigate("/signin");
    }, [user]);

    const handleChange = (e) => {
        setDetails(prev=>({ ...prev, [e.target.id]: e.target.value }))
    }

    const handlePassword = (e) => {
        setPassword({ ...password, userPassword: e.target.value });
      };
    const handleConfirmPassword = (e) => {
        setPassword({ ...password, confirmUserPassword: e.target.value });
    };
    const setDialogue = (e) => {
        if(validLength && upperCase && lowerCase && hasNumber && specialChar && match ) {
            setShowDialogue(false);
          };
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        //email validation
        const emailIsValid = await emailValidation(details.email);
        if (!emailIsValid) { 
            toast.error('Insert a valid email');
            console.log("Email not valid");
            return;
        }
        //check is password has the required lengh
        if(!validLength) {
            toast.error('Passwords must contain at least 8 characters');
            console.log("Passwords must contain at least 8 characters");
            return;
        };
        //check if password includes an uppercase letter
        if(!upperCase) {
            toast.error('Password must contain at least 1 uppercase letter');
            console.log("Password must contain at least 1 uppercase letter");
            return;
        };
        //check if password includes a lowercase letter
        if(!lowerCase) {
            toast.error('Password must include at least 1 lowercase letter');
            console.log("Password must include at least 1 lowercase letter");
            return;
        };
        //check if password includes a number
        if(!hasNumber) {
            toast.error('Password must cinclude a number');
            console.log("Password must cinclude a number");
            return;
        }
        // check if password inclused a special character
        if(!specialChar) {
            toast.error('Passwords must include a special charcter');
            console.log("Passwords must include a special charcter");
            return;
        };
        //check if passowrds matching
        if(!match) {
            toast.error('Password does not match');
            console.log("Password not matching");
            return;
        };
       
        //phone validation
        const phoneIsValid = await phoneValidation(phone);
        //console.log(phoneIsValid);
        if (!phoneIsValid) { 
            toast.error('Insert a valid phone number');
            console.log("phone not valid");
            return;
        }
        
        try {
            const results = await axios.post("/register",
            {details, password, country, state, city, phone}
            );
            toast.success('Registration succesful. Please login.');
            
            setDetails({
                firstName: " ",
                lastName: " ",
                email: " ",
            });
            setPassword({
                userPassword: "",
                confirmUserPassword: "",
            })
            setCountry("");
            setState("");
            setCity("");
            setPhone ("");
            dispatch({ type: 'LOGIN_START'});
            navigate("../signin");    
        } catch (err) {
            console.log(err);
            toast.error(err.response.data);

        }   
    };

    // password dialogue
    let colour1="red",colour2="red",colour3="red",colour4="red",colour5="red",colour6="red";
    if(validLength) colour1="green";
    if(upperCase) colour2="green";
    if(lowerCase) colour3="green";
    if(hasNumber) colour4="green";
    if(specialChar) colour5="green";
    if(match) colour6="green";
   
    const style={
        boxShadow:"2px 2px 3px 3px #ccc",
        border:"2px #eee",
        padding:"20px",
        marginTop:"25px"
    }

console.log("Password =>", password.userPassword);
console.log("Confirm Password =>", password.confirmUserPassword);
console.log("details =>", details);
console.log("country =>", country);
console.log("county =>", state);
console.log("city =>", city);
console.log("phone =>", phone);
  return (
    <div>  
        <Header />
        <div className="login">
            <form id="rContainer" onSubmit={handleSubmit}>
                <ToastContainer />
                <h2>Register</h2>
                <input 
                    type="text" 
                    className="rInput" 
                    placeholder="First Name" 
                    id="firstName"
                    onChange={handleChange}
                    onFocus={()=>setShowDialogue(false)} 
                    required
                />
                <input 
                    type="text" 
                    className="rInput" 
                    placeholder="Last Name" 
                    id="lastName"
                    onChange={handleChange} 
                    onFocus={()=>setShowDialogue(false)}
                    required
                />
                <input 
                    type="email" 
                    className="rInput" 
                    placeholder="Enter email" 
                    id="email"
                    onChange={handleChange} 
                    onFocus={()=>setShowDialogue(false)}
                    required
                />
                <input 
                    type="password" 
                    className="rInput" 
                    placeholder="Enter password" 
                    id="password"
                    onChange={handlePassword} 
                    onFocus={()=>setShowDialogue(true)}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    autoComplete="on"
                    required
                />
                <input 
                    type="password" 
                    className="rInput" 
                    placeholder="Confirm password" 
                    id="confirmPassword"
                    onFocus={()=>setShowDialogue(true)}
                    onChange={handleConfirmPassword} 
                    onBlur={setDialogue}
                    autoComplete="on"
                    required
                />
                {showDialogue && 
                  <div style={style}>
                    <p style={{fontWeight:"bold"}}>All checkmarks must turn green, password must have:</p>
                    <p><FontAwesomeIcon icon={faCircleCheck} style={{color:colour1,fontSize:"20px"}} aria-hidden="true"/> At least 8 characters</p>
                    <p><FontAwesomeIcon icon={faCircleCheck} style={{color:colour2,fontSize:"20px"}} aria-hidden="true"/> At least 1 uppercase letter</p>
                    <p><FontAwesomeIcon icon={faCircleCheck} style={{color:colour3,fontSize:"20px"}} aria-hidden="true"/> At least 1 lowercase letter</p>
                    <p><FontAwesomeIcon icon={faCircleCheck} style={{color:colour4,fontSize:"20px"}} aria-hidden="true"/> At least 1 number</p>
                    <p><FontAwesomeIcon icon={faCircleCheck} style={{color:colour5,fontSize:"20px"}} aria-hidden="true"/> At least 1 special character</p>
                    <p><FontAwesomeIcon icon={faCircleCheck} style={{color:colour6,fontSize:"20px"}} aria-hidden="true"/> Password === Confirm Password</p>
                  </div>}
                <FormControl>
                    <InputLabel id="country">Country</InputLabel>
                    <Select
                        id="rSelect" 
                        labelId="country"
                        defaultValue=""
                        value={country}
                        onChange={(e) => setCountry(e.target.value) } 
                        onFocus={()=>setShowDialogue(false)}
                        required
                    >
                    {Country.getAllCountries().map((country, index) => (
                        <MenuItem
                            key={index}
                            value={country}
                        >
                            {country.name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="county">County</InputLabel>
                    <Select
                        labelId="county"
                        id="rSelect"  
                        defaultValue=""
                        value={state.length ? state : ""}
                        onChange={(e) => setState(e.target.value)} 
                        disabled={!country}
                        onFocus={()=>setShowDialogue(false)}
                        required
                    >
                        {State.getStatesOfCountry(country.isoCode).map((state, index) => (
                            <MenuItem
                            value={state.name}
                            key={index}
                            >
                                {state.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="city">City</InputLabel>
                    <Select
                        labelId="city"
                        id="rSelect"
                        defaultValue=""  
                        value={city.length ? city : ''}
                        onChange={(e) => setCity(e.target.value)} 
                        disabled={!country}
                        onFocus={()=>setShowDialogue(false)}
                        required
                    >
                    {City.getCitiesOfCountry(country.isoCode).map((city, index) => (
                        <MenuItem
                        value={city.name}
                        key={index}
                        >
                            {city.name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                
                
                
                <PhoneInput  
                    placeholder="Enter phone number" 
                    onChange={(value) => setPhone(value)} 
                    onFocus={()=>setShowDialogue(false)}
                    required
                />
                <button 
                    type="submit" 
                    disable={loading ? true : undefined}   
                    className="lButton"
                >
                    Sign Up
                </button>
                {/* {error && <span>{error.message}</span>} - update the error state if toastify does not work */}
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