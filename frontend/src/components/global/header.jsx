import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Assets
import Logo from "../../assets/global/icon-left-font-monochrome-white.png";

// Popup Context
import { useContext } from "react";
import { PopupContext } from "../../utils/context/popup";

function Header(props) {
  const { togglePopup } = useContext(PopupContext);

  const [logout, setLogout] = useState();

  let navigate = useNavigate();

  useEffect(() => {
    if (logout == true) {
      localStorage.clear();
      navigate("/");
    }
  }, [logout]);

  return (
    <>
      <header>
        <div className="logo">
          <Link to="/dashboard">
            <img src={Logo}></img>
          </Link>
        </div>
        <nav>
          <ul>
            <Link to="/">
              <li className={props.option == "home" ? "active" : null}>
                <i class="fa-solid fa-house"></i> Home
              </li>
            </Link>
            <Link to="">
              <li className={props.option == "notification" ? "active" : null}>
                <i class="fa-solid fa-bell"></i> Notifications
              </li>
            </Link>
            {props.user ? (
              <Link to={"/user/" + props.user.name} user={props.user}>
                <li className={props.option == "profil" ? "active" : null}>
                  <i class="fa-solid fa-user"></i> Profil
                </li>
              </Link>
            ) : (
              <Link to={"/user/"}>
                <li className={props.option == "profil" ? "active" : null}>
                  <i class="fa-solid fa-user"></i> Profil
                </li>
              </Link>
            )}

            <Link to="/logout">
              <li onClick={() => setLogout(true)}>
                <i class="fa-solid fa-arrow-right-from-bracket"></i> Exit
              </li>
            </Link>
          </ul>
        </nav>
        <div
          onClick={() => togglePopup("create")}
          style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
          className="button animated"
        >
          New Post
        </div>
      </header>
    </>
  );
}

export default Header;
