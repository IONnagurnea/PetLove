import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { phoneValidation } from "../hooks/phoneValidation"
import { emailValidation } from "../hooks/emailValidation"
import { toast } from 'react-toastify';
import Header from "../components/Header";
import RegistrationForm from "../components/forms/RegistrationForm"

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
            return;
        }
        //check is password has the required lengh
        if(!validLength) {
            toast.error('Passwords must contain at least 8 characters');
            return;
        };
        //check if password includes an uppercase letter
        if(!upperCase) {
            toast.error('Password must contain at least 1 uppercase letter');
            return;
        };
        //check if password includes a lowercase letter
        if(!lowerCase) {
            toast.error('Password must include at least 1 lowercase letter');
            return;
        };
        //check if password includes a number
        if(!hasNumber) {
            toast.error('Password must cinclude a number');
            return;
        }
        // check if password inclused a special character
        if(!specialChar) {
            toast.error('Passwords must include a special charcter');
            return;
        };
        //check if passowrds matching
        if(!match) {
            toast.error('Password does not match');
            return;
        };
       
        //phone validation
        const phoneIsValid = await phoneValidation(phone);
        //console.log(phoneIsValid);
        if (!phoneIsValid) { 
            toast.error('Insert a valid phone number');
            //console.log("phone not valid");
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

  return (
    <div>  
        <Header />
        <RegistrationForm 
           handleSubmit={handleSubmit}
           handleChange={handleChange}
           setShowDialogue={setShowDialogue}
           handlePassword={handlePassword}
           handleConfirmPassword={handleConfirmPassword}
           showDialogue={showDialogue}
           setDialogue={setDialogue}
           country={country}
           setCountry={setCountry}
           state={state}
           setState={setState}
           city={city}
           setCity={setCity}
           setPhone={setPhone}
           validLength={validLength}
           hasNumber={hasNumber}
           upperCase={upperCase}
           lowerCase={lowerCase}
           match={match}
           specialChar={specialChar}
           loading={loading}
        />
    </div>  
  )
};

export default Register;