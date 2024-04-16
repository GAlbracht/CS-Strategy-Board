import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';



const handleEmailChange = (e) => {
  //setEmail();
};

const handlePasswordChange = (e) => {
  //setPassword();
};

const handleSubmit = (e) => {
};

const HomePage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  return (
    
    <div className="homepage">
      <header>
        <title>CS Strategy Board</title>
      </header>
      <nav className="navigation">
        <ul>
          <li><Link to="/maps"><img src='images/logo.webp' /></Link></li>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/maps">Map Directory</Link></li>
          <li><Link to="/login">Login</Link></li>
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
        <button type="submit">Sign Up</button>
      </form>

    </div>
  );
}

export default HomePage;
