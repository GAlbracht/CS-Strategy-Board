import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import axios from 'axios';
import './signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        console.log("Attempting to submit form", { email, password }); 
    
        try {
            const response = await axios.post('https://cs-strategy-board-0b3c449c0c46.herokuapp.com/register', { email, password });
            console.log("Response received", response.data); 
    
            
            if (response.status === 201) {
                console.log("Signup successful, navigating to home");
                navigate('/home'); 
            } else {
                console.error("Unexpected response status:", response.status);
            }
        } catch (error) {
            if (error.response) {
                
                console.error("Signup error response:", error.response.data);
            } else if (error.request) {
               
                console.error("Signup error request not responded:", error.request);
            } else {
               
                console.error("Signup error message:", error.message);
            }
        }
    };

    return (
        <div>
            <div className="homepage">
                    <nav className="navigation">
                    <Link to="/maps"><img src='images/logo.webp' alt="Maps" /></Link>
                        <ul>
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/maps">Map Directory</Link></li>
                            <li><Link to="/signup">Signup</Link></li>
                        </ul>
                    </nav>
                    <header>
                        <h1>CS Strategy Board</h1>
                    </header>
                    <form onSubmit={handleSubmit} className="form">
                        <h2>Signup</h2>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" value={email} onChange={handleEmailChange} />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" value={password} onChange={handlePasswordChange} />
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
            </div>
        </div>
    );
};

export default Signup;
