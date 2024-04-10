import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" value={email} onChange={handleEmailChange} />
                <br />
                <label>Password:</label>
                <input type="password" value={password} onChange={handlePasswordChange} />
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;