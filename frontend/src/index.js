import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Roads */
import Login from './containers/Login';
import Register from './containers/Register'
import Dashboard from './containers/Dashboard'
import Profil from './containers/Profil'
import Post from './containers/Post.jsx'

/* Hooks */
import {Logged} from './utils/auth'

/* CSS */
import './styles/normalize.css'
import './styles/icons.css'
import './styles/global.css'


/* Provider */

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

// Roads
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={Logged() === true? <Navigate to='/dashboard' /> : <Login />}></Route>
      <Route path="/register" element={Logged() === true? <Navigate to='/dashboard'/> : <Register/>}></Route>
      <Route path="/dashboard" element={<Dashboard  />}></Route>
      <Route path="/user/*" element={<Profil option='profil' />}></Route>
      <Route path="/post/*" element={<Post />}></Route>
    </Routes>
  </BrowserRouter>
);