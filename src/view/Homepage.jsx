import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Homepage.css';

const HomePage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://cs-strategy-board-0b3c449c0c46.herokuapp.com/login', { email, password });
            console.log(response.data); 
        } catch (error) {
            console.error('Login error:', error.response.data);
        }
    };

    return (
        <div className="homepage">
            <header>
                <title>CS Strategy Board</title>
            </header>
            <nav className="navigation">
            <li><Link to="/maps"><img src='images/logo.webp' alt="Logo" /></Link></li>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/maps">Map Directory</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                </ul>
            </nav>
            
            <form onSubmit={handleSubmit} className="form">
                <h2>Login</h2>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={handleEmailChange} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default HomePage;
