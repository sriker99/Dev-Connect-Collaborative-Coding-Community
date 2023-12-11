// ********************* DO NOT CHANGE THIS FILE *********************
import React from 'react';
import ReactDOM from 'react-dom/client';
import './stylesheets/index.css';
import App from './App';
import { AuthContextProvider } from './context/authContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
  
);
