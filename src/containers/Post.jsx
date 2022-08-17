// Dependencies
import { useEffect, useContext } from "react";

// Provider
import { UserContext } from "../utils/context/user";
import { PopupContext } from "../utils/context/popup";
import { SystemContext } from "../utils/context/system";

// Style
import "../styles/dashboard.css";
import "../styles/post.css";

// Components
import Header from "../components/global/header";
import Main from "../components/dashboard/main";

function Post(props) {
  // Context
  const token = localStorage.getItem("token");
  const { loadUser, user } = useContext(UserContext);
  const { update } = useContext(PopupContext);
  const { lastUser, LastUser, topPost, TopPost } = useContext(SystemContext);

  // Fetch current user data
  useEffect(() => {
    loadUser();
  }, [update]);

  // Fetch LastUser, TopPost (5)
  useEffect(() => {
    lastUser(token);
    topPost(token);
  }, []);

  // Render Page
  return (
    <>
      <Header user={user} option="home" />
      <Main
        user={user}
        option={props.option}
        LastUser={LastUser}
        TopPost={TopPost}
      />
    </>
  );
}

export default Post;
