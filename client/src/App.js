// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/welcome";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './components/login/index.js';
import SignUp from './components/signup/index.js';
import FakeStackOverFlow from "./components/FaceStackOverFlow/fakestackoverflow.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element= {<Welcome />}></Route>
        <Route path="/login" element= {<Login />}></Route>
        <Route path="/signup" element= {<SignUp />}></Route>
        <Route path="/home" element= {<FakeStackOverFlow />}></Route>
        {/* <Route path="/guest">
            <Guest />
        </Route> */}
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;

