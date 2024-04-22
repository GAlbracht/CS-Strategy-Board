import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import axios from 'axios';
import './signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Initialize the navigate function

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submit action
        console.log("Attempting to submit form", { email, password }); // Log the values to be sent
    
        try {
            const response = await axios.post('https://cs-strategy-board-0b3c449c0c46.herokuapp.com/register', { email, password });
            console.log("Response received", response.data); // Log the response from the server
    
            // Optionally check response status or data before redirecting
            if (response.status === 201) {
                console.log("Signup successful, navigating to home");
                navigate('/home'); // Navigate on success
            } else {
                console.error("Unexpected response status:", response.status);
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status outside 2xx and provided an error
                console.error("Signup error response:", error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("Signup error request not responded:", error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.error("Signup error message:", error.message);
            }
        }
    };

    return (
        <div>
            <div className="homepage">
                    <nav className="navigation">
                        <ul>
                            <li><Link to="/maps"><img src='images/logo.webp' alt="Maps" /></Link></li>
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
