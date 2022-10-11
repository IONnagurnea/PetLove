import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/login.css";
import Header from "../components/Header";
//import {toast} from 'react-toastify';

const Login =() => {
    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined,
    });

    const { user, loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (user !== null) navigate("/");
    }, [user]);

    const handleChange = (e) => {
        setCredentials(prev=>({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type:"LOGIN_START"});
        try {
            const res = await axios.post("/login", credentials);
            dispatch({type:"LOGIN_SUCCESS", payload: res.data});
            navigate("/");
        } catch (err) {
            dispatch({type:"LOGIN_FAILURE", payload: err.response.data});
            console.log(err);
            //toast.error(err.response.data);
        }
    }
    
  return (
    <div>  
        <Header />
        <div className="login">
            <form className="lContainer" onSubmit={handleSubmit} >
                <h2>Log In</h2>
                <input 
                    type="text" 
                    placeholder="email" 
                    id="email" 
                    onChange={handleChange} 
                    className="lInput" 
                />
                <input 
                    type="password" 
                    placeholder="password" 
                    id="password" 
                    onChange={handleChange} 
                    className="lInput" 
                />
                <button 
                    type="submit" 
                    disable={loading ? true : undefined}  
                    className="lButton"
                >
                    Login
                </button>
                {error && <span>{error.message}</span>}
            
                <p className="text-center p-3">
                    Not yet registered?{" "}
                    <Link to="/signup">
                        Register
                    </Link>
                </p>
                <p className="text-center">
                    <Link to="/forgot-password">
                        Fortgot Password
                    </Link>
                </p>
            </form>
            
        </div>
    </div>  
  )
};

export default Login;