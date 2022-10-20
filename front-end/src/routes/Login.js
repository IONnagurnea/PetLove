import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/login.css";
import Header from "../components/Header";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
            //console.log(res.data);
            dispatch({type:"LOGIN_SUCCESS", payload: res.data});
            toast.success("You are logged in") 
            navigate("/");  
        } catch (err) {
            console.log("this error =>", err.response.data.message);
            dispatch({type:"LOGIN_FAILURE", payload: err.response.data.message} );
            toast.error(error);
        }
    }
    
  return (
    <div>  
        <Header />
        <div className="login">
            <form className="lContainer" onSubmit={handleSubmit} >
                <ToastContainer />
                <h2>Log In</h2>
                <input 
                    type="text" 
                    placeholder="email" 
                    id="email" 
                    onChange={handleChange} 
                    className="lInput" 
                    required
                />
                <input 
                    type="password" 
                    placeholder="password" 
                    id="password" 
                    onChange={handleChange} 
                    className="lInput" 
                    required
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