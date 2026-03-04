// Definiert alle Seitenrouten der App und schützt die Profil-Seite,
// indem sie nur angezeigt wird, wenn ein gültiges Login-Token existiert.
import React from "react";
import Profile from "./components/Profile/Profile.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { getToken } from "./helpers.js";
import SocialCards from "./components/SocialCards/SocialCards.jsx"
import Homepage from "./pages/Homepage";
import Category from "./pages/Category";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn.jsx";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/SocialCards" element={<SocialCards />} />
      <Route path="/" element={<Homepage />} />
      <Route path="/category/:id" element={<Category />} />
<Route path="/signin" element={<SignIn />} />
<Route path="/signup" element={<SignUp />} />
<Route path="/profile" element={getToken() ? <Profile /> : <Navigate to="/signin" />} />

 </Routes>
  );
};

export default AppRoutes;
