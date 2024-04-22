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
        e.preventDefault();
        try {
            const response = await axios.post('https://cs-strategy-board-0b3c449c0c46.herokuapp.com/register', { email, password });
            console.log(response.data);
            // Redirect to the home page upon successful signup
            navigate('/home');  // Adjust the path as necessary for your routing setup
        } catch (error) {
            if (error.response) {
                console.error('Signup error: ', error.response.data);
            } else if (error.request) {
                console.error('Signup error: No response received', error.request);
            } else {
                console.error('Error', error.message);
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
