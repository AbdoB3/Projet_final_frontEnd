import React from "react";

function SignUpForm({ handleRegister }) {
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    sexe: "",
    adresse: "",  
    date_nais: "",
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
    const { firstName, lastName, sexe, adresse, email, password, date_nais } = state;
    handleRegister(firstName, lastName, sexe, adresse, email, password, date_nais);
    setState({
      firstName: "",
      lastName: "",
      sexe: "",
      adresse: "", 
      date_nais: "",
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
          name="date_nais"
          value={state.date_nais}
          onChange={handleChange}
          placeholder="Date de naissance (DD/MM/YYYY)"
          required
        />
        <input
          type="text"
          name="adresse"
          value={state.adresse}
          onChange={handleChange}
          placeholder="Adresse"
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
