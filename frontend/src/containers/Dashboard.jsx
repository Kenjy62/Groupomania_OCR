// Import dependances
import { useEffect, useContext } from "react";

// Style
import "../styles/dashboard.css";
import "../styles/post.css";

// Provider
import { UserContext } from "../utils/context/user";
import { PopupContext } from "../utils/context/popup";

// Components
import Header from "../components/global/header";
import Main from "../components/dashboard/main";

function App(props) {
  // Token and User Infos
  const token = localStorage.getItem("token");
  const { loadUser, user } = useContext(UserContext);
  const { update } = useContext(PopupContext);

  // Fetch UserData
  useEffect(() => {
    console.log("here");
    loadUser(token);
  }, [update]);

  // Render Page
  return (
    <>
      <Header user={user} option="home" />
      {user ? <Main option={props.option} user={user} /> : null}
    </>
  );
}

export default App;
