import React from 'react';
import './index.css';
import { Link } from "react-router-dom";

// import Guest from './guest';

const Welcome = () => {
    return (
        <div className="welcome-container">
            <h1>Welcome to FakeStackOverflow</h1>
            <Link to="/login" id="auth-btn" className="login-btn" >Login</Link>
            <Link to="/signup" id="auth-btn" className="signup-btn" >SignUp</Link>
            <Link to="/home" id="auth-btn" className="guest-btn" >Continue as Guest</Link> 
        </div>
    );
}

export default Welcome;