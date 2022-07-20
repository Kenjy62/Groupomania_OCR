import React from "react";
import { Link } from "react-router-dom";

// Assets
import Logo from "../../assets/global/icon-left-font-monochrome-white.png";
import LogoLowScreen from "../../assets/global/logo-low-screen.png";

// Popup Context
import { useContext } from "react";
import { PopupContext } from "../../utils/context/popup";

function Header(props) {
  function Logout() {
    localStorage.clear();
  }

  const { togglePopup } = useContext(PopupContext);

  return (
    <>
      <header>
        <div className="logo">
          <Link to="/dashboard">
            <img class="hight-screen" src={Logo}></img>
            <img class="low-screen" src={LogoLowScreen}></img>
          </Link>
        </div>
        <nav>
          <ul>
            <Link to="/dashboard">
              <li className={props.option == "home" ? "active" : null}>
                <i class="fa-solid fa-house"></i> <span>Home</span>
              </li>
            </Link>
            <Link to="">
              <li className={props.option == "notification" ? "active" : null}>
                <i class="fa-solid fa-bell"></i> <span>Notifications</span>
              </li>
            </Link>
            {props.user ? (
              <Link to={"/user/" + props.user.name} user={props.user}>
                <li className={props.option == "profil" ? "active" : null}>
                  <i class="fa-solid fa-user"></i> <span>Profil</span>
                </li>
              </Link>
            ) : (
              <Link to={"/user/"}>
                <li className={props.option == "profil" ? "active" : null}>
                  <i class="fa-solid fa-user"></i> <span>Profil</span>
                </li>
              </Link>
            )}

            <Link to="/" onClick={() => Logout()}>
              <li>
                <i class="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                <span>Exit</span>
              </li>
            </Link>
          </ul>
        </nav>
        <div
          onClick={() => togglePopup("create")}
          style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
          className="button animated desktop"
        >
          New Post
        </div>
        <div
          onClick={() => togglePopup("create")}
          style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
          className="button animated mobile"
        >
          <i class="fa-solid fa-feather"></i>
        </div>
      </header>
    </>
  );
}

export default Header;
