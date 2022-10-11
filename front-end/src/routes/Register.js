import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/login.css";
import Header from "../components/Header";
//import {toast} from 'react-toastify';

const Register = () => {
    const [details, setDetails] = useState({
        firstName: " ",
        lastName: " ",
        email: " ",
        password: " ",
        confirmPassword: " ",
        city: " ",
        county: " ",
        phone: " "
    })
  
    const { user, loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();
   
    useEffect(() => {
        if (user !== null) navigate("/signin");
    }, [user]);

    const handleChange = (e) => {
        setDetails(prev=>({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (details.password !== details.confirmPassword) {
            //toast.error('Passwords do not match');
            return;
          };
        if (details.phone.length !== 11) {
            //toast.error('Insert a valid phone number');
            console.log("phone not valid =>", details.phone.length);
            return;
          }
        try {
            const results = await axios.post("/register",
            details
            );
            //toast.success('Registration succesful. Please login.');
            
            setDetails({
                firstName: " ",
                lastName: " ",
                email: " ",
                password: " ",
                confirmPassword: " ",
                city: " ",
                county: " ",
                phone: " "
            });
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
            <form className="lContainer" onSubmit={handleSubmit}>
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
                <input 
                    type="text" 
                    className="rInput" 
                    placeholder="City" 
                    id="city"
                    onChange={handleChange} 
                    required
                />
                <input 
                    type="text" 
                    className="rInput" 
                    placeholder="County" 
                    id="county"
                    onChange={handleChange} 
                    required
                />
                <input 
                    type="text" 
                    className="rInput" 
                    placeholder="Your Phone" 
                    id="phone"
                    onChange={handleChange} 
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