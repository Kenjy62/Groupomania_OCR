//Dependencies
import React from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Assets
import Logo from "../../assets/global/icon-left-font-monochrome-white.png";
import LogoLowScreen from "../../assets/global/logo-low-screen.png";
import Sound from "../../assets/sound/notification.mp3";

// Provider
import { PopupContext } from "../../utils/context/popup";
import { UserContext } from "../../utils/context/user";

// Components
import Notifications from "./notifications";

// Render Page
function Header(props) {
  const [sid, setSid] = useState();

  const token = localStorage.getItem("token");

  // Context
  const { togglePopup } = useContext(PopupContext);
  const { notifyCount, newNotification, openNotificationSidebar } =
    useContext(UserContext);

  useEffect(() => {
    const socket = io("http://localhost:3000/");
    setSid(socket);
    if (props?.user?._id) {
      socket.emit("init", props.user._id, props.user.name);
    }

    socket.on("notify", (data) => {
      var audio = new Audio(Sound);
      audio.muted = false;
      audio.play();
      newNotification();
    });
  }, [props?.user?._id]);

  // Logout function
  function Logout() {
    localStorage.clear();
    sid.emit("ForceDisconnect", sid.id);
  }

  return (
    <>
      <header>
        <div className="logo">
          <Link to="/dashboard">
            <img className="hight-screen" alt="Logo" src={Logo}></img>
            <img className="low-screen" alt="Logo" src={LogoLowScreen}></img>
          </Link>
        </div>

        {props.user ? (
          <nav>
            <ul>
              <Link to="/dashboard">
                <li className={props.option === "home" ? "active" : null}>
                  <i className="fa-solid fa-house"></i> <span>Accueil</span>
                </li>
              </Link>

              <Link to={"/user/" + props.user.name} user={props.user}>
                <li className={props.option === "profil" ? "active" : null}>
                  <i className="fa-solid fa-user"></i> <span>Profil</span>
                </li>
              </Link>

              <li
                className={props.option === "notification" ? "active" : null}
                onClick={() => {
                  openNotificationSidebar(props.user.name, token);
                }}
              >
                <i className="fa-solid fa-bell" style={{}}></i>
                <span>
                  {notifyCount > 1 ? "Notifications" : "Notification"}
                </span>
                <span
                  className="notifyCount"
                  style={{
                    display: notifyCount > 0 ? "initial" : "none",
                    marginRight: notifyCount > 0 ? "10px" : "0px",
                  }}
                >
                  {notifyCount}
                </span>
              </li>

              <Link to="/" onClick={() => Logout()}>
                <li>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  <span>Se déconnecter</span>
                </li>
              </Link>
            </ul>
          </nav>
        ) : null}

        {/* Desktop Button */}
        <div
          onClick={() => togglePopup("create")}
          style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
          className="button animated desktop"
        >
          Nouveau Post
        </div>

        {/* Mobile Button */}
        <div
          onClick={() => togglePopup("create")}
          className="button animated mobile"
        >
          <i className="fa-solid fa-feather"></i>
        </div>
      </header>
      <Notifications user={props.user} token={token} />
    </>
  );
}

export default Header;
