import { useNavigate } from 'react-router-dom';
import { loginThunk } from '../../thunks/login-thunks';
import './index.css';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCookies } from "react-cookie";

const Login = () => {
    const { user } = useAuthContext();
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
        loginThunk(dispatch, input).then((data) => {
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
                name="username"
                className="form-control mt-1"
                placeholder="Enter username"
                value={input.username}
                onChange={handleChange}
              />
              {errors.username && <p style={{color: "red"}}>{errors.username}</p>}
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value = {input.password}
                onChange= {handleChange}
              />
              {errors.password && <p style={{color: "red"}}>{errors.password}</p>}
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    );
}

export default Login;