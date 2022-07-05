// Import dependances

import { useContext, useEffect } from "react";

// Style
import "../styles/dashboard.css";
import "../styles/post.css";

// Components
import Header from "../components/global/header";
import Main from "../components/dashboard/main";

// Provider
import { UserContext } from "../utils/context/user";

function App(props) {
  // Tokenn
  const token = localStorage.getItem("token");

  const { loadUser, user } = useContext(UserContext);

  // Fetch UserData
  useEffect(() => {
    loadUser(token);
  }, []);

  // Render Page
  return (
    <>
      <Header option={props.option} user={user} />
      <Main option={props.option} user={user} />
    </>
  );
}

export default App;
