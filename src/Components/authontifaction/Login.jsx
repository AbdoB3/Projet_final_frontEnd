import React, { useState } from "react";
import "./styles.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="login-container">
      <div className="App ">
      
        <div className={containerClass} id="container">
        <SignUpForm />

          <SignInForm />
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
              <div className="logo flex items-center">
                    <FontAwesomeIcon icon={faHeartbeat} 
                    className="text-4xl mr-2" style={{ color: ' black' }}t />
                    <h1 className="font-bold text-8xxl" style={{ color: 'white' }}>ConsultaMed</h1>
      
                </div>
                <p>
                Pour rester connecté avec nous, veuillez vous connecter avec vos informations personnelles
                </p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => handleOnClick("signIn")}
                >
                  Se connecter
                </button>
              </div>
              <div className="overlay-panel overlay-right">
              <div className="logo flex items-center">
                    <FontAwesomeIcon icon={faHeartbeat} 
                    className="text-4xl mr-2 " style={{ color: ' black' }}t />
                    <h1 className="font-bold text-8xxl" style={{ color: 'white' }}>ConsultaMed</h1>
      
                </div>
                <p>Entrez vos informations personnelles et commencez votre voyage avec nous</p>
                <button
                  className="ghost "
                  id="signUp"
                  onClick={() => handleOnClick("signUp")}
                >
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
