import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/register', { email, password });
            console.log(response.data);
        } catch (error) {
            console.error('Signup error: ', error.response.data);
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