import React, { useState } from "react";
import "./styles.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [type, setType] = useState("signIn");
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/patient/login', { email, password });
      const data = response.data;
  
      console.log('Login successful');
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      console.error(' error:', error);
    }
  };

  const handleRegister = async (firstName, lastName, email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/patient/register', { firstName, lastName, email, password });
      const data = response.data;
  
      console.log('Register successful');
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass = "container " + (type === "signUp" ? "right-panel-active" : "sign");

  return (
    <div className="login-container">
      <div className="App">
        <div id="container" className={containerClass}>
          <SignUpForm handleRegister={handleRegister} />
          <SignInForm handleLogin={handleLogin} />
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <div className="logo flex items-center">
                  <FontAwesomeIcon icon={faHeartbeat} className="text-4xl mr-2" style={{ color: 'white' }} beat/>
                  <h1 className="font-bold text-2xl" style={{ color: 'white' }}>ConsultaMed</h1>
                </div>
                <p>Pour rester connecté avec nous, veuillez vous connecter avec vos informations personnelles</p>
                <button className="ghost" id="signIn" onClick={() => handleOnClick("signIn")}>
                  Se connecter
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <div className="logo flex items-center">
                  <FontAwesomeIcon icon={faHeartbeat} className="text-4xl mr-2 " style={{ color: 'white' }} beat />
                  <h1 className="font-bold text-2xl" style={{ color: 'white' }}>ConsultaMed</h1>
                </div>
                <p>Entrez vos informations personnelles et commencez votre voyage avec nous</p>
                <button className="ghost" id="signUp" onClick={() => handleOnClick("signUp")}>
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
