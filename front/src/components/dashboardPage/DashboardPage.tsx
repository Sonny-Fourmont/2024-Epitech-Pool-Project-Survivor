/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** homePage
*/

import React, { useEffect, useState } from 'react';
import NavBar from '../navbar/Navbar';

import SimpleLineChart from '../charts/LineChart';
import StackedBarChart from '../charts/StackedBarChart';
import BasicPie from '../charts/PieChart';

import { CustomerData } from '../GetBackendData/interfaces/CustomersInterface';
import { EventsData } from '../GetBackendData/interfaces/EventsInterface';

import { getCustomers, getEvents } from '../GetBackendData/GetBackendData';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Dashboard: React.FC = () => {

  const [customersData, setCustomersData] = useState<CustomerData[] | undefined>([]);
  const [eventData, setEventsData] = useState<EventsData[] | undefined>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const loadCustomersData = async () => {
      try {
        const result = await getCustomers();
        setCustomersData(result);
    } catch (error) {
        setError("Failed to fetch data");
      }
    };

    const loadEventsData = async () => {
      try {
        const result = await getEvents();
        setEventsData(result);
    } catch (error) {
        setError("Failed to fetch data");
      }
    };

    loadCustomersData();
    loadEventsData();
  }, []);

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

        <div className='dashboard-cards-duo'>

          <table className='card'>
            <tbody>
              <tr className='card-title'>
                <th>
                  <h2>Customers Overview</h2>
                  <h4>When customers have join in the time</h4>
                </th>
                <th className="duration-button">
                  <button className='trigger-button trigger-button-left'>7 D</button>
                  <button className='trigger-button'>1 M</button>
                  <button className='trigger-button trigger-button-right'>3 M</button>
                </th>
              </tr>
              <tr className='card-values'>
                <td className='card-values-first-group'>
                  <p className='card-values-title'>Customers</p>
                  <p className='card-values-number'>{customersData?.length}</p>
                  <p className='green'>+ 12.37%</p>
                </td>
                <td className='card-values-second-group'>
                  <p className='card-values-title'>Doing meetings</p>
                  <p className='card-values-number'>28.49%</p>
                  <p className='red'>- 12.37%</p>
                </td>
                <td className='card-values-second-group'>
                  <p className='card-values-title'>Customers by coach</p>
                  <p className='card-values-number'>34</p>
                </td>
              </tr>
              <tr>
                <SimpleLineChart/>
              </tr>
            </tbody>
          </table>

          <table className='card'>
            <tbody>
              <tr className='card-title'>
                <th>
                  <h2>Events</h2>
                  <h4>Our events and their status</h4>
                </th>
                <th className="duration-button">
                  <button className='trigger-button'>?</button>
                </th>
              </tr>
              <tr className='card-values'>
                <td className='card-values-first-group'>
                  <p className='card-values-title'>Monthly</p>
                  <p className='card-values-number'>{eventData?.length}</p>
                  <p className='green'>+ 4.63%</p>
                </td>
                <td className='card-values-second-group'>
                  <p className='card-values-title'>Weekly</p>
                  <p className='card-values-number'>20</p>
                  <p className='red'>- 1.92%</p>
                </td>
                <td className='card-values-second-group'>
                  <p className='card-values-title'>Daily (Avg)</p>
                  <p className='card-values-number'>3</p>
                  <p className='green'>+3.45%</p>
                </td>
              </tr>
              <tr className='card-chart'>
                <StackedBarChart/>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='dashboard-cards-duo'>

          <table className='card'>
            <tbody>
              <tr className='card-title'>
                <th>
                  <h2>Customers by Country</h2>
                </th>
                <th className="duration-button">
                  <button className='trigger-button'>30 Days ^</button>
                </th>
              </tr>
              <tr>
                {/* ADD MAP */}
              </tr>
            </tbody>
          </table>

          <table className='card'>
            <tbody>
              <tr className='card-title'>
                <th>
                  <h2>Meetings top sources</h2>
                </th>
                <th className="duration-button">
                  <button className='trigger-button'>30 Days ^</button>
                </th>
              </tr>
              <tr>
                <BasicPie/>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
