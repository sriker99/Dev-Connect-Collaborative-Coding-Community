import { createContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import authReducer from '../reducers/auth-reducer.js';
import { CookiesProvider, useCookies } from "react-cookie";

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        loggedIn: false,
        user: null
    })
    

    return  (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )

}

export {AuthContext, AuthContextProvider};