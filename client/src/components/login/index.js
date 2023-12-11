import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginThunk } from '../../thunks/login-thunks';
import './index.css';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();

    const [input, setInput] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setInput(prevInput => ({...prevInput, [e.target.name]: e.target.value}))
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const trimmedInput = Object.fromEntries(
          Object.entries(input).map(([key, value]) => [key, value.trim()])
        );
    
        setInput(trimmedInput);
        
        loginThunk(dispatch, trimmedInput).then((data) => {
            if(data.success) {
              console.log(data);
              navigate("/home");
            } else {
                console.log(data.error);
                setErrors(data.error);
            }
        })
    }
    return (
        <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Log In</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control mt-1"
                placeholder="Enter username"
                value={input.username}
                onChange={handleChange}
              />
              {errors.username && <p id="login-username-error" style={{color: "red"}}>{errors.username}</p>}
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
                onChange= {handleChange}
              />
              {errors.password && <p id="login-password-error" style={{color: "red"}}>{errors.password}</p>}
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" id="login-submit-btn" className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    );
}

export default Login;