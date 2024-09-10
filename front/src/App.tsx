/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** App
*/

import React, {useEffect, useState} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { getCustomers } from './components/GetBackendData/GetBackendData';
import { CustomerData } from "./components/GetBackendData/interfaces/CustomersInterface";
import Dashboard from './components/dashboardPage/DashboardPage';
import Login from './components/loginPage/loginPage';
import Profile from './components/customers/profilePage/profile';
import Coaches from './components/coachesPage/coaches';
import CustomersList from './components/customers/customersList';
import Tips from './components/tipsPage/tipsPage';
import EventPage from './components/EventPage/EventPage';
import Astrological from './components/astrological/astrological';
import Clothes from './components/Clothes/Clothes';
import AccountPage from './components/accountPage/AccountPage';
// import PrivateRoute from './PrivateRoute';

const App: React.FC = () => {
  const [data , setData] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getCustomers();
        setData(result || []);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    loadData();
  }, []);
  if (loading) {return <h1 className='centerTEXT'>Loading...</h1>;}
  if (error) {return <h1 className='centerTEXT'>Error: {error}</h1>;}

  return (
    <div>
      <Routes>
        <Route element={<Navigate to="login" />} path="/" />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/customers" element={<CustomersList />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/astrological" element={<Astrological />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/account" element={<AccountPage />} />
        {data.map((data) =>
          <Route path={"/customers/profile/" + data.id} element={<Profile />} />
          )}

        <Route path="*" element={<Navigate to={"/login"} />}/>
      </Routes>
    </div>
  );
};

export default App;
