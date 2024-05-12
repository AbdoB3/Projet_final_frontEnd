import React, { useState } from "react";
import "./styles.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Login() {
  const [type, setType] = useState("signIn");

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3002/patient/login', { email, password });
      const data = response.data;
      console.clear(); // Clear console
      console.log('Login successful'); // White console log
      // Optionally, you can redirect to a new page or perform other actions upon successful login
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (display error message, etc.)
    }
  };

  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass = "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="login-container">
      <div className="App">
        <div id="container" className={containerClass}>
          <SignUpForm />
          <SignInForm handleLogin={handleLogin} /> {/* Pass handleLogin function as prop */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <div className="logo flex items-center">
                  <FontAwesomeIcon icon={faHeartbeat} className="text-4xl mr-2" style={{ color: 'black' }} />
                  <h1 className="font-bold text-8xxl" style={{ color: 'white' }}>ConsultaMed</h1>
                </div>
                <p>Pour rester connecté avec nous, veuillez vous connecter avec vos informations personnelles</p>
                <button className="ghost" id="signIn" onClick={() => handleOnClick("signIn")}>
                  Se connecter
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <div className="logo flex items-center">
                  <FontAwesomeIcon icon={faHeartbeat} className="text-4xl mr-2 " style={{ color: 'black' }} />
                  <h1 className="font-bold text-8xxl" style={{ color: 'white' }}>ConsultaMed</h1>
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
