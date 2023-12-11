import './index.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { signupThunk } from '../../thunks/signup-thunks';

const SignUp = () => {
    const [input, setInput] = useState({
        username: '',
        email:'',
        password:'',
        cpassword:''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setInput(prevInput => ({...prevInput, [e.target.name]: e.target.value}))
    };


    const handleSignUp = (e) => {
        e.preventDefault();
        const trimmedInput = Object.fromEntries(
          Object.entries(input).map(([key, value]) => [key, value.trim()])
        );
    
        setInput(trimmedInput);
        signupThunk(trimmedInput).then((data) => {
            if(data.success) {
                console.log(data);
                navigate("/login");
            } else {
                setErrors(data.error);
                console.log(data.error);
            }
        });
    }
    return (
        <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control mt-1"
                placeholder="Enter username"
                value = {input.username}
                onChange={handleChange}
              />
            {errors.username && <p id="signup-username-error" style={{color: "red"}}>{errors.username}</p>}
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value = {input.email}
                onChange={handleChange}
              />
              {errors.email && <p id="signup-email-error" style={{color: "red"}}>{errors.email}</p>}
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value = {input.password}
                onChange={handleChange}
              />
              {errors.password && <p id="signup-password-error" style={{color: "red"}}>{errors.password}</p>}
            </div>
            <div className="form-group mt-3">
              <label>Confirm Password</label>
              <input
                type="password"
                id="cpassword"
                name="cpassword"
                className="form-control mt-1"
                placeholder="Re-enter password"
                value = {input.cpassword}
                onChange={handleChange}
              />
              {errors.cpassword && <p id="signup-cpassword-error" style={{color: "red"}}>{errors.cpassword}</p>}
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" id="signup-submit-btn" className="btn btn-primary" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    );
}

export default SignUp;