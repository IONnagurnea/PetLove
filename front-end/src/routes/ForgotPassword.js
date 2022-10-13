import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {toast} from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

const ForgotPawwsord = () => {
    //state
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false);
    const [code, setCode] = useState('')
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // context
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    //redirect if user is login
    useEffect(() => {
        if(user !== null) navigate("/");                         
    }, [user]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post("/forgot-password", { email });
            setSuccess(true);
            toast("Check your email for secret code");
            setLoading(false);
        } catch (err) {
            console.log("Error => ", err.response.data.message);
            setLoading(false);
            toast("User not found");
            
        }
    };

    const handleResetPassword = async(e) => {
        e.preventDefault();
        // console.log(email, code, newPassword);
       
        if (newPassword !== confirmNewPassword) {
            toast.error('Passwords do not match');
            return;
        };

        try {
            setLoading(true);
            const {data} = await axios.post('/reset-password', { 
                email, 
                code, 
                newPassword,
            });
            setEmail('');
            setCode('');
            setNewPassword('');
            setLoading(false);
            toast("Great! Now you can login with your new password");
            navigate('/signin');
        } catch (err) {
            console.log("Error =>", err.response.data.message);
            setLoading(false);
            toast("Wrong code or email!");
        }
    };

    return (
        <>
            <h1 className="jumbotron text-center bg-primary square">
                Forgot password
            </h1>
            <div className="conatiner col-md-4 offset-md-4 pb-5">
                <form onSubmit={success ? handleResetPassword : handleSubmit}>
                    <input  
                        type="email" 
                        className="form-control mb-4 p-2" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder = "Enter email"
                        required
                    />
                    {success && (
                      <>
                        <input  
                        type="text" 
                        className="form-control mb-4 p-2" 
                        value={code} 
                        onChange={(e) => setCode(e.target.value)}
                        placeholder = "Enter secret code "
                        required
                        />
                        <input  
                        type="password" 
                        className="form-control mb-4 p-2" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder = "Enter new password"
                        required
                        />
                        <input  
                        type="password" 
                        className="form-control mb-4 p-2" 
                        value={confirmNewPassword} 
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        placeholder = "Confirm new password"
                        required
                        />
                      </>
                    )}
                    <button 
                        type="submit" 
                        className="btn btn-primary full" 
                        disabled={loading || !email}
                    >
                        {loading ? <CircularProgress /> : "Submit"}
                    </button>
                </form>
            </div>
        </>
    );
};
export default ForgotPawwsord;