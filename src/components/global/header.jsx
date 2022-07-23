//Dependencies
import React from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { io } from "socket.io-client";

// Assets
import Logo from "../../assets/global/icon-left-font-monochrome-white.png";
import LogoLowScreen from "../../assets/global/logo-low-screen.png";

// Provider
import { PopupContext } from "../../utils/context/popup";
import { UserContext } from "../../utils/context/user";

// Render Page
function Header(props) {
  console.log(props);

  useEffect(() => {
    const socket = io("http://localhost:3000/");
    if (props?.user?._id) {
      socket.emit("init", props.user._id);
    }

    socket.on("notify", (data) => {
      console.log("new Notif");
      newNotification();
    });
  }, [props?.user?._id]);

  // Logout function
  function Logout() {
    localStorage.clear();
  }

  // Context
  const { togglePopup } = useContext(PopupContext);
  const { notifyCount, newNotification } = useContext(UserContext);

  return (
    <>
      <header>
        <div className="logo">
          <Link to="/dashboard">
            <img class="hight-screen" src={Logo}></img>
            <img class="low-screen" src={LogoLowScreen}></img>
          </Link>
        </div>

        {props.user ? (
          <nav>
            <ul>
              <Link to="/dashboard">
                <li className={props.option == "home" ? "active" : null}>
                  <i class="fa-solid fa-house"></i> <span>Home</span>
                </li>
              </Link>

              <Link to={"/user/" + props.user.name} user={props.user}>
                <li className={props.option == "profil" ? "active" : null}>
                  <i class="fa-solid fa-user"></i> <span>Profil</span>
                </li>
              </Link>

              <Link to={"/user/" + props.user.name} user={props.user}>
                <li className={props.option == "profil" ? "active" : null}>
                  <i class="fa-solid fa-user"></i> <span>Notifications</span>
                  <span
                    style={{
                      padding: 10,
                      backgroundColor: "#FFD7D7",
                      borderRadius: 100,
                      marginLeft: 5,
                      color: "black",
                    }}
                  >
                    {notifyCount}
                  </span>
                </li>
              </Link>

              <Link to="/" onClick={() => Logout()}>
                <li>
                  <i class="fa-solid fa-arrow-right-from-bracket"></i>
                  <span>Exit</span>
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
          New Post
        </div>

        {/* Mobile Button */}
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
