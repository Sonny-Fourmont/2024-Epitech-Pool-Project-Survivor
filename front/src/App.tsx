/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** App
*/

import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

import Login from './components/loginPage';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
		<Route path="*" element={<Navigate to={"/"} />}/>
      </Routes>
    </div>
  );
};

export default App;
