import React, { useState } from "react";
import axios from 'axios';


function SignInForm({ handleLogin }) { // Receive handleLogin as prop

  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleChange = evt => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const handleOnSubmit = async evt => {
    evt.preventDefault();

    const { email, password } = state;
    
    try {
      await handleLogin(email, password);
      // Optionally, you can clear form inputs here
      setState({
        email: "",
        password: ""
      });
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (display error message, etc.)
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Connexion</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
        </div>
        <span>ou utilisez votre compte</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Mot de passe oublié ?</a>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default SignInForm;
