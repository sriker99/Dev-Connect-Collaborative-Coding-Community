import { createContext, useReducer } from 'react';
import React from 'react';
import authReducer from '../reducers/auth-reducer.js';

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