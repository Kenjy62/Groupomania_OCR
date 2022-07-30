import { createContext, useState, useContext } from "react";
import burl from "../api";

export const SystemContext = createContext();

export const SystemProvider = ({ children }) => {
  const [LastUser, setLastUser] = useState();
  const [TopPost, setTopPost] = useState();
  const [inSearch, setInSearch] = useState(false);
  const [searchResult, setSearchResult] = useState();

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

  const liveSearchUser = (value, token) => {
    if (value.length > 2) {
      setInSearch(true);
      let data = {
        value: value,
      };
      fetch(burl + "/system/liveSearchUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status == 200) {
          const data = res.json();
          data.then((item) => setSearchResult(item));
        }
      });
    } else {
      setInSearch(false);
    }
  };

  return (
    <SystemContext.Provider
      value={{
        lastUser,
        LastUser,
        topPost,
        TopPost,
        liveSearchUser,
        inSearch,
        searchResult,
        setInSearch,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};
