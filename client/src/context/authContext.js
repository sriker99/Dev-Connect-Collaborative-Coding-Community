import { createContext, useEffect, useReducer } from 'react';
import authReducer from '../reducers/auth-reducer.js';

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        loggedIn: false,
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if(user) {
            dispatch({type: 'LOGIN', payload: user});
        }
    }, [])

    return  (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )

}

export {AuthContext, AuthContextProvider};