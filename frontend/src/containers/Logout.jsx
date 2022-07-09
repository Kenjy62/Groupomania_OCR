import { useContext } from "react";
import { UserContext } from "../utils/context/user";

function Logout() {
  const { Logout } = useContext(UserContext);
  Logout();
}

export default Logout;
