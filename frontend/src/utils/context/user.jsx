import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [userProfil, setUserProfil] = useState();
  const [userPost, setUserPost] = useState();

  const loadUser = (token) => {
    fetch("http://localhost:3000/api/auth/user/" + token, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.status === 200) {
        const data = res.json();
        data.then((json) => {
          let dataParse = json.data;
          setUser(dataParse);
          return setUser;
        });
      } else {
        return "error";
      }
    });
  };

  const LoadProfil = (token, username) => {
    // Fetch UserData
    fetch("http://localhost:3000/api/auth/profil/" + username, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (res.status === 200) {
        const data = res.json();
        data.then((json) => {
          let dataParse = json.message;
          setUserProfil(dataParse);
          return setUserProfil;
        });
      } else {
        return "error";
      }
    });

    fetch("http://localhost:3000/api/post/" + username, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (res.status === 200) {
        const data = res.json();
        data.then((data) => {
          console.log(data);
          if (data.post != "Aucun post pour le moment") {
            setUserPost(data.post);
            return setUserPost;
          } else if (data.post == "Aucun post pour le moment") {
            setUserPost(false);
            return setUserPost;
          }
        });
      }
    });
  };

  const UpdateProfil = (user, avatar, cover, password) => {
    console.log(user);
  };

  const Logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <UserContext.Provider
      value={{
        loadUser,
        user,
        LoadProfil,
        userProfil,
        userPost,
        UpdateProfil,
        Logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
