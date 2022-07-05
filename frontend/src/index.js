import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Roads */
import Login from './containers/Login';
import Register from './containers/Register'
import Dashboard from './containers/Dashboard'
import Profil from './containers/Profil'
import Post from './containers/Post.jsx'
import Logout from './containers/Logout.jsx'

/* Hooks */
import {Logged} from './utils/auth'

/* CSS */
import './styles/normalize.css'
import './styles/icons.css'
import './styles/global.css'


/* Provider */

import { PopupProvider } from './utils/context/popup'
import { UserProvider } from './utils/context/user';
import { PostProvider } from './utils/context/post';
import { InputCommentProvider } from './utils/context/input_comment';

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

// Roads
root.render(
  <BrowserRouter>
  <PopupProvider>
  <UserProvider>
  <PostProvider>
  <InputCommentProvider>
    <Routes>
      <Route path="/" element={Logged() === true? <Navigate to='/dashboard' /> : <Login />}></Route>
      <Route path="/register" element={Logged() === true? <Navigate to='/dashboard'/> : <Register/>}></Route>
      <Route path="/dashboard" element={<Dashboard  option='feed'/>}></Route>
      <Route path="/user/*" element={<Profil option='profil' />}></Route>
      <Route path="/post/*" element={<Post option='details' />}></Route>
      <Route path="/logout" element={<Logout />}></Route>
    </Routes>
  </InputCommentProvider>
  </PostProvider>
  </UserProvider>
  </PopupProvider>
  </BrowserRouter>
);