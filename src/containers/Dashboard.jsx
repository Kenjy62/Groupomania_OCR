// Import dependances
import { useEffect, useContext } from "react";

// Style
import "../styles/header.css";
import "../styles/dashboard.css";
import "../styles/post.css";

// Provider
import { UserContext } from "../utils/context/user";
import { PopupContext } from "../utils/context/popup";
import { SystemContext } from "../utils/context/system";

// Components
import Header from "../components/global/header";
import Main from "../components/dashboard/main";

function App(props) {
  // Token and Context
  const token = localStorage.getItem("token");
  const { loadUser, user } = useContext(UserContext);
  const { update } = useContext(PopupContext);
  const { lastUser, LastUser, topPost, TopPost } = useContext(SystemContext);

  // Fetch UserData
  useEffect(() => {
    loadUser(token);
  }, [update]);

  useEffect(() => {
    lastUser(token);
    topPost(token);
  }, []);

  // Render Page
  return (
    <>
      <Header user={user} option="home" />
      {user ? (
        <Main
          option={props.option}
          user={user}
          LastUser={LastUser}
          TopPost={TopPost}
        />
      ) : null}
    </>
  );
}

export default App;
