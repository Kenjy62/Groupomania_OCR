// Dependencies
import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Provider
import { UserContext } from "../utils/context/user";
import { ErrorSuccessContext } from "../utils/context/error-success";

// Style and assets
import "../styles/login.css";
import Logo from "../assets/global/icon-left-font-monochrome-white.png";

function Login() {
  // Context
  const { Login } = useContext(UserContext);
  const { error } = useContext(ErrorSuccessContext);

  return (
    <div className="wrapper" style={{ height: "100vh" }}>
      <div className="wrapper-content">
        <div id="logo">
          <img src={Logo}></img>
        </div>

        <div class="error" style={{ display: error ? "block" : "none" }}>
          {error}
        </div>

        <form id="login">
          <label for="email">Votre Email d'entreprise</label>
          <input
            id="email"
            type="text"
            placeholder="@groupomania.com"
            name="email"
          ></input>
          <label for="password">Votre mot de passe</label>
          <input
            id="password"
            type="Password"
            placeholder="*****"
            name="password"
          ></input>
          <Link to="/register" style={{ textAlign: "right", marginBottom: 10 }}>
            <span>S'inscrire</span>
          </Link>
          <button type="submit" onClick={(e) => Login(e)}>
            Se Connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
