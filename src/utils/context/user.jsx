import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PopupContext } from "./popup";
import { ErrorSuccessContext } from "./error-success";
import burl from "../api";

// Hooks
import Regex from "../regex";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { togglePopup, callUpdate } = useContext(PopupContext);
  const { setError, setSuccess } = useContext(ErrorSuccessContext);
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [userProfil, setUserProfil] = useState();
  const [userPost, setUserPost] = useState();

  // Load Current User
  const loadUser = (token) => {
    fetch(burl + "/auth/user/" + token, {
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
      } else if (res.status === 400) {
        setUser(false);
      }
    });
  };

  // Load Profil
  const LoadProfil = (token, username, user) => {
    console.log("LOAD PROFIL");
    // Fetch UserData
    fetch(burl + "/auth/profil/" + username + "/" + user.admin, {
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
          return setUserProfil(dataParse);
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
          if (data.post != false) {
            setUserPost(data.post);
            return setUserPost;
          } else if (data.post === false) {
            setUserPost(false);
            return setUserPost;
          }
        });
      }
    });
  };

  // Update Profil
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

    fetch(burl + "/auth/profil/" + user.name, {
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

  // Login
  const Login = (e) => {
    e.preventDefault();

    // Data
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let data = {
      email: email,
      password: password,
    };

    const userLogin = fetch(burl + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    userLogin
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.userId) {
          localStorage.setItem("token", data.token);
          navigate("/dashboard", {
            state: { data },
          });
        } else {
          setError("Erreur dans la combinaison Email/Mot de passe");
          setTimeout(() => {
            setError(undefined);
          }, 3000);
        }
      });
  };

  // Register
  const Register = (e) => {
    e.preventDefault();

    // Reset Error/Success MessageBox
    setError(undefined);
    setSuccess(undefined);

    // Data
    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Verification
    if (name && lastName && email && password) {
      if (email.match(Regex.Email)) {
        if (lastName.match(Regex.lastName)) {
          if (name.match(Regex.firstName)) {
            let data = {
              name: name,
              lastName: lastName,
              email: email,
              password: password,
            };

            const userRegister = fetch(burl + "/auth/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });

            userRegister.then((response) => {
              if (response.status === 201) {
                setSuccess("Vous pouvez maintenant vous connectez.");

                const inputs = document.querySelectorAll(
                  "#name, #lastName, #password, #email"
                );

                inputs.forEach((input) => {
                  input.value = "";
                });
              } else if (response.status === 400) {
                setError(`Une erreur est survenue, contacter l'administrateur`);
              }
            });
          } else {
            setError("Veuillez entrer un prénom valide.");
          }
        } else {
          setError("Veuillez entrer un nom de famille valide.");
        }
      } else {
        setError(`L'adresse Email n'est pas valide.`);
      }
    } else {
      setError("Veuillez remplir tout le formulaire.");
    }
  };

  // Disconnect
  const Logout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    });
  };

  const SetAdmin = (username, token) => {
    console.log(username, token);

    let data = {
      name: username,
    };

    fetch(burl + "/admin/setAdmin", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (res.status === 200) {
        const data = res.json();
        data.then((result) => {
          document.getElementById("isAdmin").textContent = result.isAdmin
            ? "Retirer Administrateur"
            : "Passer Administrateur";
        });
      }
    });
  };

  const deleteUser = (me, username, token) => {
    if (me.admin === true) {
      let data = {
        name: username,
      };

      fetch(burl + "/admin/deleteUser", {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((res) => {
        if (res.status === 200) {
          navigate("/dashboard", {
            state: { data },
          });
        }
      });
    }
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
        Login,
        Register,
        SetAdmin,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
