// Dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, Redirect } from "react-router-dom";


/* Roads */
import Login from './containers/Login';
import Register from './containers/Register'
import Dashboard from './containers/Dashboard'
import Profil from './containers/Profil'
import Post from './containers/Post.jsx'


/* CSS */
import './styles/normalize.css'
import './styles/icons.css'
import './styles/global.css'

/* Provider */
import { PopupProvider } from './utils/context/popup'
import { UserProvider } from './utils/context/user';
import { PostProvider } from './utils/context/post';
import { InputCommentProvider } from './utils/context/input_comment';
import { ErrorSuccessProvider } from './utils/context/error-success';

// Protected
import { Protected } from './utils/context/auth';

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

// Roads
root.render(
  <BrowserRouter>
  <ErrorSuccessProvider>
  <PopupProvider>
  <UserProvider>
  <PostProvider>
  <InputCommentProvider>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/dashboard" element={<Protected><Dashboard option="feed"/></Protected>}></Route>
      <Route path="/user/*" element={<Protected><Profil option='profil' /></Protected>}></Route>
      <Route path="/post/*" element={<Protected><Post option='details' /></Protected>}></Route>
    </Routes>
  </InputCommentProvider>
  </PostProvider>
  </UserProvider>
  </PopupProvider>
  </ErrorSuccessProvider>
  </BrowserRouter>
);