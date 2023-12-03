import './index.css';
import { Link,  useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
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
        signupThunk(input).then((data) => {
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
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary">
                <Link to="/login"> 
                    Log In
                </Link>
              </span>
            </div>
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
            {errors.username && <p style={{color: "red"}}>{errors.username}</p>}
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value = {input.email}
                onChange={handleChange}
              />
              {errors.email && <p style={{color: "red"}}>{errors.email}</p>}
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value = {input.password}
                onChange={handleChange}
              />
              {errors.password && <p style={{color: "red"}}>{errors.password}</p>}
            </div>
            <div className="form-group mt-3">
              <label>Confirm Password</label>
              <input
                type="password"
                name="cpassword"
                className="form-control mt-1"
                placeholder="Re-enter password"
                value = {input.cpassword}
                onChange={handleChange}
              />
              {errors.cpassword && <p style={{color: "red"}}>{errors.cpassword}</p>}
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    );
}

export default SignUp;