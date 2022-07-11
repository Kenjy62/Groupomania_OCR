// Dependencies
import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Ressource and Style
import Logo from "../assets/global/icon-left-font-monochrome-white.png";

// Provider
import { UserContext } from "../utils/context/user";
import { ErrorSuccessContext } from "../utils/context/error-success";

function Register() {
  // Context
  const { Register } = useContext(UserContext);
  const { success, error } = useContext(ErrorSuccessContext);

  return (
    <div className="wrapper" style={{ height: "100vh" }}>
      <div className="wrapper-content">
        <div id="logo">
          <img src={Logo}></img>
        </div>
        <Link to="/">
          <div class="success" style={{ display: success ? "block" : "none" }}>
            {success}
          </div>
        </Link>
        <div class="error" style={{ display: error ? "block" : "none" }}>
          {error}
        </div>

        <form id="register">
          <label for="name">Prénom :</label>
          <input id="name" type="text" placeholder="Doe" name="name"></input>
          <label for="lastName">Nom de Famille :</label>
          <input
            id="lastName"
            type="text"
            placeholder="John"
            name="lastName"
          ></input>
          <label for="email">Email d'entreprise :</label>
          <input
            id="email"
            type="text"
            placeholder="@groupomania.com"
            name="email"
          ></input>
          <label for="password">Mot de passe : </label>
          <input
            id="password"
            type="password"
            placeholder="****"
            name="password"
          ></input>
          <Link to="/" style={{ textAlign: "right", marginBottom: 10 }}>
            Se connecter
          </Link>
          <button type="submit" onClick={(e) => Register(e)}>
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
