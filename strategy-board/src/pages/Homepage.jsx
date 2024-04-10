import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <nav className="navigation">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/maps">Map Directory</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
      </nav>
      <header>
        <h1>CS Strategy Board</h1>
      </header>
      
      <div className="form-group">
        <label htmlFor="login">Login:</label>
        <textarea id="login" name="login" rows="4" cols="50"></textarea> 
      </div>
      
      <div className="form-group">
        <label htmlFor="signup">Signup:</label>
        <textarea id="signup" name="signup" rows="4" cols="50"></textarea>
      </div>
    </div>
  );
}

export default HomePage;
