import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PopupContext } from "./popup";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { togglePopup, callUpdate } = useContext(PopupContext);

  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [userProfil, setUserProfil] = useState();
  const [userPost, setUserPost] = useState();

  const loadUser = (token) => {
    console.log("test");
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

  const LoadProfil = (token, username, user) => {
    console.log("LOAD PROFIL");
    // Fetch UserData
    fetch(
      "http://localhost:3000/api/auth/profil/" + username + "/" + user.admin,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    ).then((res) => {
      if (res.status === 200) {
        const data = res.json();
        data.then((json) => {
          let dataParse = json.message;
          setUserProfil(dataParse);
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

  const UpdateProfil = (e, user, token) => {
    e.preventDefault();

    console.log(user);

    let fileAvatar = document.getElementById("avatarImage");
    let fileCover = document.getElementById("coverImage");

    // Form Data
    let formData = new FormData();
    formData.append(
      "avatar",
      fileAvatar.files[0] ? fileAvatar.files[0] : undefined
    );
    formData.append(
      "cover",
      fileCover.files[0] ? fileCover.files[0] : undefined
    );
    formData.append("_id", user._id);
    formData.append("admin", user.admin);

    fetch("http://localhost:3000/api/auth/profil/" + user.name, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (res.status == 200) {
        togglePopup(false);
        callUpdate(Math.random());
      }
    });
  };

  const LoadSpecificData = (user) => {
    console.log(user);
  };

  const Logout = () => {
    localStorage.clear();
    navigate("/register");
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
        LoadSpecificData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
