// Dependencies
import { useContext, useEffect } from "react";

// Style
import "../styles/dashboard.css";
import "../styles/post.css";

// Components
import Header from "../components/global/header";
import Main from "../components/dashboard/main";

// Provider
import { UserContext } from "../utils/context/user";
import { PopupContext } from "../utils/context/popup";
import { SystemContext } from "../utils/context/system";

// Render Page
function App(props) {
  // Token
  const token = localStorage.getItem("token");
  const { loadUser, user } = useContext(UserContext);
  const { update } = useContext(PopupContext);
  const { lastUser, LastUser, topPost, TopPost } = useContext(SystemContext);

  // Fetch UserData
  useEffect(() => {
    loadUser(token);
  }, [update]);

  // Fetch LastUser, TopPost (5)
  useEffect(() => {
    lastUser(token);
    topPost(token);
  }, []);

  // Render Page
  return (
    <>
      <Header option={props.option} user={user} />
      <Main
        option={props.option}
        user={user}
        LastUser={LastUser}
        TopPost={TopPost}
      />
    </>
  );
}

export default App;
