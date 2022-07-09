import React from "react";
import { useEffect, useContext } from "react";

// Components
import Posts from "../components/dashboard/Post/posts";
import Left from "../components/profil/left";

// Context
import { UserContext } from "../utils/context/user";
import { PopupContext } from "../utils/context/popup";

function Global(props) {
  const { LoadProfil, userProfil, userPost } = useContext(UserContext);
  const { update } = useContext(PopupContext);

  // Convert URL for getting user profil name
  var url = window.location.href;
  url = url.split("/");
  url = url[4];

  // Token
  const token = localStorage.getItem("token");

  // Fetch UserData
  useEffect(() => {
    if (props.option === "profil") {
      LoadProfil(token, url, props.user);
    }
  }, [update]);

  return (
    <div id="main--container">
      {props.option === "profil" ? (
        <div
          style={{
            height: "400px",
            backgroundImage: `url(${userProfil ? userProfil.cover : null})`,
            backgroundSize: "cover",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            backgroundPosition: "center",
          }}
        ></div>
      ) : null}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: props.option === "profil" ? "-110px" : "0px",
          padding: "50px",
        }}
      >
        <div className="left">
          {props.option === "profil" && userProfil && props.user ? (
            <Left me={props.user} user={userProfil} option={props.option} />
          ) : props.option === "feed" ? (
            <Left option={props.option} me={props.user} user={props.user} />
          ) : props.option === "details" ? (
            <Left option={props.option} me={props.user} user={props.user} />
          ) : null}
        </div>
        <div className="center">
          <div className="blocks">
            {props.option === "details" ? (
              <Posts option="details" user={props.user} />
            ) : props.option === "profil" ? (
              <Posts option={"profil"} user={props.user} post={userPost} />
            ) : props.option === "feed" ? (
              <Posts option="feed" user={props.user} />
            ) : null}
          </div>
        </div>
        <div className="right">
          <div className="blocks"></div>
        </div>
      </div>
    </div>
  );
}

export default Global;
