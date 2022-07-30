// Dependencies
import React from "react";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// Components
import Posts from "../components/dashboard/Post/posts";
import Left from "../components/profil/left";
import LastUser from "../components/global/lastUser";
import TopPost from "../components/global/topPost";

// Style
import "../styles/profil.css";
import "../styles/search.css";

// Provider
import { UserContext } from "../utils/context/user";
import { PopupContext } from "../utils/context/popup";
import { SystemContext } from "../utils/context/system";

// Utils
import burl from "../utils/api";

function Global(props) {
  // Context
  const { LoadProfil, userProfil, userPost } = useContext(UserContext);
  const { update, callUpdate } = useContext(PopupContext);
  const { inSearch, searchResult, setInSearch } = useContext(SystemContext);

  // Convert URL for getting user profil name
  var url = window.location.href;
  url = url.split("/");
  url = url[4];

  // Token
  const token = localStorage.getItem("token");

  // Fetch current profil user data
  useEffect(() => {
    if (props.option === "profil") {
      LoadProfil(token, url, props.user);
    }
  }, [update]);

  return !userProfil && props.option == "profil" ? (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1 style={{ color: "white" }}>Cette utilisateur n'existe pas !</h1>
    </div>
  ) : (
    <>
      <div
        style={{ display: inSearch ? "none" : "block" }}
        id="main--container"
      >
        {props.option === "profil" && userProfil ? (
          <div className="profil--cover">
            <img
              src={
                userProfil
                  ? burl + userProfil.cover
                  : burl + `images/default-cover.jpg`
              }
              onError={(e) => (
                (e.target.onError = null),
                (e.target.src = burl + `images/default-cover.jpg`)
              )}
            />
          </div>
        ) : null}

        <div
          className="profil--container"
          style={{
            marginTop: props.option === "profil" ? "-110px" : "0px",
          }}
        >
          <div className="left">
            {props.option === "profil" && userProfil && props.user ? (
              <Left
                key={Math.random()}
                me={props.user}
                user={userProfil}
                option={props.option}
              />
            ) : props.option === "feed" ? (
              <Left option={props.option} me={props.user} user={props.user} />
            ) : props.option === "details" ? (
              <Left option={props.option} me={props.user} user={props.user} />
            ) : null}
          </div>

          <div className="center">
            <div className="blocks">
              {props.option === "details" ? (
                <Posts key={Math.random()} option="details" user={props.user} />
              ) : props.option === "profil" ? (
                <Posts option={"profil"} user={props.user} post={userPost} />
              ) : props.option === "feed" ? (
                <Posts option="feed" user={props.user} />
              ) : null}
            </div>
          </div>

          <div className="right">
            <div className="blocks">
              <div className="blocks--title">Derniers Inscrits</div>
              <LastUser data={props.LastUser} />
            </div>
            <div className="blocks">
              <div className="blocks--title">Top Posts</div>
              <TopPost data={props.TopPost} />
            </div>
          </div>
        </div>
      </div>

      <div
        className="searchResult"
        style={{ display: inSearch ? "flex" : "none" }}
      >
        {searchResult?.length > 0
          ? searchResult.map((item) => (
              <Link
                onClick={() => {
                  setInSearch(false);
                  callUpdate(Math.random());
                }}
                to={"/user/" + item.name}
              >
                <div className="searchResult--item">
                  <div className="searchResult--item--cover">
                    <img src={burl + item.cover}></img>
                  </div>
                  <div className="searchResult--item--avatar">
                    <img src={burl + item.avatar}></img>
                  </div>
                  <div className="searchResult--item--infos">
                    <span>
                      {item.name} {item.lastName}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          : null}
      </div>
    </>
  );
}

export default Global;
