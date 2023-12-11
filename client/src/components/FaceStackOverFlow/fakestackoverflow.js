import React from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../../reducers/data-reducer.js"
import Header from "./banner/index.js";
import './index.css';
import Navbar from "./navbar/index.js";
import navReducer from "../../reducers/nav-reducer.js";
import { AllTagsComponent } from "../tags/index.js"
import HomePage from "./homepage/index.js";
import { useEffect, useState } from "react";
import { findQuestionThunk } from "../../thunks/question-thunks";
import { findTagThunk } from "../../thunks/tag-thunks";
import { findAnswerThunk } from "../../thunks/answer-thunks";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useAuthContext } from "../../hooks/useAuthContext.js";
import commentsReducer from "../../reducers/comments-reducer.js"; 
import UserProfile from '../profile/index.js';
import profileNavReducer from '../../reducers/profile-nav-reducer.js';

const store = configureStore({
  reducer : { data : dataReducer, nav : navReducer, comments: commentsReducer, profileNavReducer: profileNavReducer},
});

axios.defaults.withCredentials = true;

function FakeStackOverFlow() {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    // const [user, setUser] = useState("");
    useEffect(() => {
        const verifyCookie = async () => {
            try {
              const {data} = await axios.post(
                "http://localhost:8000",
                {},
                { withCredentials: true }
              );
              console.log("DATA FROM BACKEND", data);
              const { success, user } = data;
              console.log("AUTH CONTEXT", user);
              console.log("COOKIE", cookies);
              if (success) {
                // If authentication is successful, set the user in state
                // setUser(user);
                // console.log()
                dispatch({ type: 'LOGIN', payload: user });
              } else {
                // If authentication fails, remove the token and navigate to login
                removeCookie("token");
              }
            } catch (error) {
              console.error("Error while verifying cookie:", error);
            }
        };
    
        // Call the verifyCookie function
        verifyCookie();
      }, [cookies, navigate, removeCookie, dispatch]);
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}




function AppContent(){
  const navState = useSelector(state => state.nav);
  const [questionButton, setQuestionButton] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findTagThunk());
    dispatch(findAnswerThunk());
    dispatch(findQuestionThunk()); 
  }, [dispatch])
  return(
    <div>
      <Header />
      {navState.profile && <UserProfile/>}
      {(navState.questions || navState.tags) &&(
        <div id="home-container">
          <Navbar questionButton = {questionButton} setQuestionButton = {setQuestionButton}/>
          {navState.questions && <HomePage questionButton = {questionButton}/>}
          {navState.tags && <AllTagsComponent/>}
        </div>
      )}
    </div>
  );
}

export default FakeStackOverFlow;