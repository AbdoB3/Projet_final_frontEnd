import React, { useState } from "react";
import "./styles.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const [type, setType] = useState("signIn");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = new URLSearchParams(location.search).get('redirect') || '/';

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/patient/login', { email, password });
      const data = response.data;

      console.log('Login successful');
      localStorage.setItem('token', data.token);
      navigate(redirectTo);
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  const handleRegister = async (firstName, lastName, sexe, adresse, email, password, date_nais) => {
    try {
      const response = await axios.post('http://localhost:3000/patient/register', { firstName, lastName, sexe, adresse, email, password, date_nais });
      const data = response.data;

      console.log('Register successful');
      localStorage.setItem('token', data.token);

      // Navigate to the dossier page with the original path as a query parameter
      window.location.href = `http://localhost:5173/dossier?redirectTo=${encodeURIComponent(redirectTo)}`;
    } catch (error) {
      console.error('Register error:', error);
      setError('Registration failed. Please check your details and try again.');
    }
  };

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      setError(null); // Reset error message when switching forms
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
                  <FontAwesomeIcon icon={faHeartbeat} className="text-4xl mr-2" style={{ color: 'white' }} beat />
                  <h1 className="font-bold text-2xl" style={{ color: 'white' }}>ConsultaMed</h1>
                </div>
                <p>Pour rester connecté avec nous, veuillez vous connecter avec vos informations personnelles</p>
                <button className="ghost" id="signIn" onClick={() => handleOnClick("signIn")}>
                  Se connecter
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <div className="logo flex items-center">
                  <FontAwesomeIcon icon={faHeartbeat} className="text-4xl mr-2" style={{ color: 'white' }} beat />
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
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}
