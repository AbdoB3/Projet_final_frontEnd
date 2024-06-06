import React from "react";

function SignUpForm({ handleRegister }) {
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    sexe: "",
    city: "",  
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    const { firstName, lastName, sexe, city, email, password, phone } = state;
    handleRegister(firstName, lastName, sexe, city, email, password, phone);
    setState({
      firstName: "",
      lastName: "",
      sexe: "",
      city: "", 
      phone: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        {/* <h1>Créer un compte</h1> */}
        <input
          type="text"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
          placeholder="Prénom"
          required
        />
        <input
          type="text"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
          placeholder="Nom"
          required
        />
    
    <select
          name="sexe"
          value={state.sexe}
          onChange={handleChange}
          className="custom-select"
          required
        >
          <option value="">Sélectionner le sexe</option>
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
        </select>

        <input
          type="text"
          name="phone"
          value={state.phone}
          onChange={handleChange}
          placeholder="Telephone"
          required
        />
        <input
          type="text"
          name="city"
          value={state.city}
          onChange={handleChange}
          placeholder="Ville"
          required
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          required
        />  
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default SignUpForm;
