// Dependencies
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Provider
import { PopupProvider } from "./utils/context/popup";
import { UserProvider } from "./utils/context/user";
import { PostProvider } from "./utils/context/post";
import { InputCommentProvider } from "./utils/context/input_comment";
import { ErrorSuccessProvider } from "./utils/context/error-success";
import { SystemProvider } from "./utils/context/system";

// Roads
import Login from "./containers/Login";
import Register from "./containers/Register";
import Dashboard from "./containers/Dashboard";
import Profil from "./containers/Profil";
import Post from "./containers/Post.jsx";
import NotFound from "./components/global/404";

// CSS
import "./styles/normalize.css";
import "./styles/icons.css";
import "./styles/global.css";

// Protected
import { Protected } from "./utils/context/auth";

// Root
const root = ReactDOM.createRoot(document.getElementById("root"));

// Roads
root.render(
  <BrowserRouter>
    <SystemProvider>
      <ErrorSuccessProvider>
        <PopupProvider>
          <UserProvider>
            <PostProvider>
              <InputCommentProvider>
                <Routes>
                  <Route path="*" element={<NotFound />}></Route>
                  <Route path="/" element={<Login />}></Route>
                  <Route path="/register" element={<Register />}></Route>
                  <Route
                    path="/dashboard"
                    element={
                      <Protected>
                        <Dashboard option="feed" />
                      </Protected>
                    }
                  ></Route>
                  <Route
                    path="/user/*"
                    element={
                      <Protected>
                        <Profil option="profil" />
                      </Protected>
                    }
                  ></Route>
                  <Route
                    path="/post/*"
                    element={
                      <Protected>
                        <Post option="details" />
                      </Protected>
                    }
                  ></Route>
                </Routes>
              </InputCommentProvider>
            </PostProvider>
          </UserProvider>
        </PopupProvider>
      </ErrorSuccessProvider>
    </SystemProvider>
  </BrowserRouter>
);
