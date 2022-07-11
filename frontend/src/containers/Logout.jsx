import { useContext } from "react";
import { UserContext } from "../utils/context/user";

// TODO Fix Logout system!

function Logout() {
  const { Logout } = useContext(UserContext);
  Logout();
}

export default Logout;
