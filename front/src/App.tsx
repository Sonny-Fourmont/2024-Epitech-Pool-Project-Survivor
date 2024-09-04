/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** App
*/

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './components/dashboardPage/dashboardPage';
import Login from './components/loginPage/loginPage';
import Profile from './components/customers/profilePage/profile';
import Coaches from './components/coachesPage/coaches';
import CustomersList from './components/customers/customersList';
import Tips from './components/tipsPage/tipsPage';
import Events from './components/eventsPage/eventsPage';
import AccountPage from './components/accountPage/accountPage';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route element={<Navigate to="login" />} path="/" />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/customers" element={<CustomersList />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/events" element={<Events />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/customers/profile" element={<Profile />} />
		    <Route path="*" element={<Navigate to={"/login"} />}/>
      </Routes>
    </div>
  );
};

export default App;
