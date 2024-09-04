/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** homePage
*/

import React from 'react';
import NavBar from '../navbar/Navbar';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Dashboard: React.FC = () => {
  return (
    <>
      <NavBar/>
      <div className='dashboard'>
        <div className="dashboard-title">
          <div>
            <h1>Dashboard</h1>
            <h3>Welcome!</h3>
          </div>
          <div className="dashboard-right">
            <button className='dashboard-dropdown'>Last 30 Days</button>
            <button className='dashboard-popup'>Reports</button>
          </div>
        </div>
        <div className='card'>
          <div className='card-title'>
            <div>
              <h2>Customers Overview</h2>
              <h4>When customers have join in the time</h4>
            </div>
            <div className="duration-button">
              <button className='trigger-button trigger-button-left'>7 D</button>
              <button className='trigger-button'>1 M</button>
              <button className='trigger-button trigger-button-right'>3 M</button>
            </div>
          </div>
          <div className='card-values'>
            <div className='card-values-title-group'>
              <p className='card-values-title'>Customers</p>
              <p className='card-values-title'>Doing meetings</p>
              <p className='card-values-title'>Customers by coach</p>
            </div>
            <div className='card-values-number-group'>
              <p className='card-values-number'>932</p>
              <p className='card-values-number'>28.49%</p>
              <p className='card-values-number'>34</p>
            </div>
            <div className='card-values-percentage-group'>
              <p className='card-values-percentage green'>+ 12.37%</p>
              <p className='card-values-percentage red'>- 12.37%</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
