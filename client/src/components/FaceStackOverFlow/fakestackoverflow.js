
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
import authReducer from "../../reducers/auth-reducer.js";
import commentsReducer from "../../reducers/comments-reducer.js"; 

const store = configureStore({
  reducer : { data : dataReducer, nav : navReducer, comments: commentsReducer},
});
 
function FakeStackOverFlow() {
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
        <div id="home-container">
          <Navbar questionButton = {questionButton} setQuestionButton = {setQuestionButton}/>
          {navState.questions && <HomePage questionButton = {questionButton}/>}
          {navState.tags && <AllTagsComponent/>}
        </div>
      </div>
  );
}

export default FakeStackOverFlow;