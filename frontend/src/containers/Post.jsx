// Import dependances

import { useEffect, useContext } from "react";

// Provider

import { UserContext } from "../utils/context/user";

// Style
import "../styles/dashboard.css";
import "../styles/post.css";

// Components
import Header from "../components/global/header";
import Main from "../components/dashboard/main";

function Post(props) {
  // Token
  const token = localStorage.getItem("token");

  const { loadUser, user } = useContext(UserContext);

  // Fetch UserData
  useEffect(() => {
    loadUser();
  }, []);

  // Render Page
  return (
    <>
      <Header user={user} option="home" />
      <Main user={user} option={props.option} />
    </>
  );
}

export default Post;
