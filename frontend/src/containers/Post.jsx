// Import dependances
import { useEffect, useContext } from "react";

// Provider
import { UserContext } from "../utils/context/user";
import { PopupContext } from "../utils/context/popup";

// Style
import "../styles/dashboard.css";
import "../styles/post.css";

// Components
import Header from "../components/global/header";
import Main from "../components/dashboard/main";

function Post(props) {
  // Context
  const { loadUser, user } = useContext(UserContext);
  const { update } = useContext(PopupContext);

  // Fetch current user data
  useEffect(() => {
    loadUser();
  }, [update]);

  // Render Page
  return (
    <>
      <Header user={user} option="home" />
      <Main user={user} option={props.option} />
    </>
  );
}

export default Post;
