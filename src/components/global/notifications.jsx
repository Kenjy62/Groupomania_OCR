// Dependencies
import React from "react";
import { Link } from "react-router-dom";

// Provider
import { UserContext } from "../../utils/context/user";
import { useContext } from "react";

// Style
import "../../styles/notifications.css";

// Components
import Loader from "../global/loader";

// Utils
import burl from "../../utils/api";

function Notifications(props) {
  // Context
  const {
    openNotificationSidebar,
    MakeAsRead,
    notificationList,
    toggleSidebar,
    setToggleSidebar,
  } = useContext(UserContext);

  // Token
  const token = localStorage.getItem("token");

  return (
    <div
      id="Notifications"
      style={{ display: toggleSidebar ? "block" : "none" }}
    >
      <div
        className="closeNotificationSidebar"
        onClick={() => {
          openNotificationSidebar(props.user._id, token);
          MakeAsRead(props.user.name, token);
        }}
      >
        <i className="fa-solid fa-arrow-down"></i>
      </div>
      {notificationList ? (
        notificationList.length < 1 ? (
          <center>
            <p>Pas de nouvelle notification</p>
          </center>
        ) : (
          notificationList.reverse().map((item) => (
            <Link
              to={"/post/" + item.postId}
              onClick={() => openNotificationSidebar(props.user._id, token)}
            >
              <div className="notification--item">
                <div className="notification--item--avatar">
                  <img src={burl + item.senderdata[0].avatar}></img>
                </div>
                <div className="notification--item--content">
                  <span>
                    {item.sender}
                    {item.type == "newComment"
                      ? ` à commenter votre poste`
                      : item.type == "newLike"
                      ? ` à aimer votre poste`
                      : item.type == "newDislike"
                      ? ` n'aime pas votre poste`
                      : null}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Notifications;
