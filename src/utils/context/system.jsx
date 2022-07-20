import { createContext, useState, useContext } from "react";
import burl from "../api";

export const SystemContext = createContext();

export const SystemProvider = ({ children }) => {
  const [LastUser, setLastUser] = useState();
  const [TopPost, setTopPost] = useState();

  const lastUser = (token) => {
    fetch(burl + "/system/lastUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (res.status === 200) {
        const data = res.json();
        data.then((items) => {
          setLastUser(items.data);
        });
      } else {
        setLastUser(false);
      }
    });
  };

  const topPost = (token) => {
    fetch(burl + "/system/topPost", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (res.status === 200) {
        const data = res.json();
        data.then((items) => {
          setTopPost(items.data);
        });
      } else {
        setTopPost(false);
      }
    });
  };

  return (
    <SystemContext.Provider value={{ lastUser, LastUser, topPost, TopPost }}>
      {children}
    </SystemContext.Provider>
  );
};
