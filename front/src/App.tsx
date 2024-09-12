/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** App
 */

import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { getDataList } from './components/GetBackendData/GetBackendData';
import { CustomerData } from './components/GetBackendData/interfaces/CustomersInterface';
import Dashboard from './components/DashboardPage/DashboardPage';
import Login from './components/LoginPage/LoginPage';
import Profile from './components/ListingPages/ProfilePage/ProfilePage';
import Coaches from './components/ListingPages/CoachesPage';
import CustomersList from './components/ListingPages/CustomersListPage';
import Tips from './components/ListingPages/TipsPage';
import EventPage from './components/EventPage/EventPage';
import Astrological from './components/AstrologicalPage/AstrologicalPage';
import Clothes from './components/ClothesPage/ClothesPage';
import AccountPage from './components/AccountPage/CoachForm';
import CustomerForm from './components/AccountPage/CustomerForm';
import CoachForm from './components/AccountPage/CoachForm';
// import PrivateRoute from './PrivateRoute';

const App: React.FC = () => {
  const [data, setData] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getDataList<CustomerData>(
          'http://localhost:3001/customers',
        );
        setData(result || []);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    loadData();
  }, []);
  if (loading) {
    return <h1 className="centerTEXT">Loading...</h1>;
  }
  if (error) {
    return <h1 className="centerTEXT">Error: {error}</h1>;
  }

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
        <Route path="/customerForm" element={<CustomerForm />} />
        <Route path="/coachForm" element={<CoachForm />} />
        {data.map((data) => (
          <Route
            key={data.id}
            path={'/customers/profile/' + data.id}
            element={<Profile />}
          />
        ))}
        {/* <Route path="*" element={<Navigate to={'/login'} />} /> */}
      </Routes>
    </div>
  );
};

export default App;
