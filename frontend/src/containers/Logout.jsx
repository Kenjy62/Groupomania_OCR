import React from "react";
import { useContext } from "react";
import { UserContext } from "../utils/context/user";
import { Navigate } from "react-router-dom";

function Logout() {
  const { Logout } = useContext(UserContext);
  Logout();
}

export default Logout;
