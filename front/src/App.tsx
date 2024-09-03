/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** App
*/

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/homePage';
import Login from './components/loginPage';
import Profile from './components/profilePage/profile';
import NavBar from './components/Navbar/Navbar';

const App: React.FC = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
		    <Route path="*" element={<Navigate to={"/"} />}/>
      </Routes>
    </div>
  );
};

export default App;
