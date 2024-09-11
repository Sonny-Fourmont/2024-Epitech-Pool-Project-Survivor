/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** homePage
 */

import React, { useEffect, useState } from 'react';
import NavBar from '../Navbar/Navbar';

import SimpleLineChart from '../Charts/LineChart';
import StackedBarChart from '../Charts/StackedBarChart';
import BasicPie from '../Charts/PieChart';

import { CustomerData } from '../GetBackendData/interfaces/CustomersInterface';
import { EventsData } from '../GetBackendData/interfaces/EventsInterface';

import { getCustomers, getEvents } from '../GetBackendData/GetBackendData';
import { parseISO, format, getMonth, getWeek, getYear } from 'date-fns';
import WorldMapChart from '../Charts/WorldMapChart';

type Statistics = {
  byMonth: Record<string, number>;
  byWeek: Record<string, number>;
  byDay: Record<string, number>;
};

const Dashboard: React.FC = () => {
  const [customersData, setCustomersData] = useState<
    CustomerData[] | undefined
  >([]);
  const [eventData, setEventsData] = useState<EventsData[] | undefined>([]);
  const [stats, setStats] = useState<Statistics>({
    byMonth: {},
    byWeek: {},
    byDay: {},
  });

  const calculateEventStatistics = (
    events: EventsData[] | undefined,
  ): Statistics => {
    const stats: Statistics = {
      byMonth: {},
      byWeek: {},
      byDay: {},
    };

    events?.forEach((event) => {
      const eventDate = parseISO(event.date);

      const monthKey = `${getYear(eventDate)}-${(getMonth(eventDate) + 1)
        .toString()
        .padStart(2, '0')}`;
      stats.byMonth[monthKey] = (stats.byMonth[monthKey] || 0) + 1;

      const weekKey = `${getYear(eventDate)}-W${getWeek(eventDate)
        .toString()
        .padStart(2, '0')}`;
      stats.byWeek[weekKey] = (stats.byWeek[weekKey] || 0) + 1;

      const dayKey = format(eventDate, 'yyyy-MM-dd');
      stats.byDay[dayKey] = (stats.byDay[dayKey] || 0) + 1;
    });

    return stats;
  };

  const sumValues = (obj: Record<string, number>) => {
    return Object.values(obj).reduce((sum, value) => sum + value, 0);
  };

  const averageValues = (obj: Record<string, number>) => {
    const values = Object.values(obj);
    return values.length > 0 ? (sumValues(obj) / values.length).toFixed(2) : 0;
  };

  useEffect(() => {
    const loadCustomersData = async () => {
      try {
        const result = await getCustomers();
        setCustomersData(result);
      } catch (error) {
        console.error(error, 'Failed to fetch customers data');
      }
    };

    const loadEventsData = async () => {
      try {
        const result = await getEvents();
        setEventsData(result);
      } catch (error) {
        console.error('Failed to fetch events data', error);
      }
    };

    if (eventData && eventData.length > 0) {
      setStats(calculateEventStatistics(eventData));
    }

    loadCustomersData();
    loadEventsData();
  }, [eventData]);

  const totalMonthlyEvents = averageValues(stats.byMonth);
  const totalWeeklyEvents = averageValues(stats.byWeek);
  const averageDailyEvents = averageValues(stats.byDay);

  return (
    <>
      <NavBar />
      <div className="dashboard">
        <div className="dashboard-title">
          <div>
            <h1>Dashboard</h1>
            <h3>Welcome!</h3>
          </div>
          <div className="dashboard-right">
            <button className="dashboard-dropdown">Last 30 Days</button>
            <button className="dashboard-popup">Reports</button>
          </div>
        </div>

        <div className="dashboard-cards-duo">
          <table className="card">
            <tbody>
              <tr className="card-title">
                <th>
                  <h2>Customers Overview</h2>
                  <h4>When customers have join in the time</h4>
                </th>
                <th className="duration-button">
                  <button className="trigger-button trigger-button-left">
                    7 D
                  </button>
                  <button className="trigger-button">1 M</button>
                  <button className="trigger-button trigger-button-right">
                    3 M
                  </button>
                </th>
              </tr>
              <tr className="card-values">
                <td className="card-values-first-group">
                  <p className="card-values-title">Customers</p>
                  <p className="card-values-number">{customersData?.length}</p>
                  <p className="green">+ XX.X%</p>
                </td>
                <td className="card-values-second-group">
                  <p className="card-values-title">Doing meetings</p>
                  <p className="card-values-number">XX%</p>
                  <p className="red">- XX.X%</p>
                </td>
                <td className="card-values-second-group">
                  <p className="card-values-title">Customers by coach</p>
                  <p className="card-values-number">XX</p>
                </td>
              </tr>
              <tr>
                <SimpleLineChart />
              </tr>
            </tbody>
          </table>

          <table className="card">
            <tbody>
              <tr className="card-title">
                <th>
                  <h2>Events</h2>
                  <h4>Our events and their status</h4>
                </th>
                <th className="duration-button">
                  <button className="trigger-button">?</button>
                </th>
              </tr>
              <tr className="card-values">
                <td className="card-values-first-group">
                  <p className="card-values-title">Monthly</p>
                  <p className="card-values-number">{totalMonthlyEvents}</p>
                  <p className="green">+ XX.X%</p>
                </td>
                <td className="card-values-second-group">
                  <p className="card-values-title">Weekly</p>
                  <p className="card-values-number">{totalWeeklyEvents}</p>
                  <p className="red">- XX.X%</p>
                </td>
                <td className="card-values-second-group">
                  <p className="card-values-title">Daily (Avg)</p>
                  <p className="card-values-number">{averageDailyEvents}</p>
                  <p className="green">+XX.X%</p>
                </td>
              </tr>
              <tr className="card-chart">
                <StackedBarChart />
              </tr>
            </tbody>
          </table>
        </div>

        <div className="dashboard-cards-duo">
          <table className="card">
            <tbody>
              <tr className="card-title">
                <th>
                  <h2>Customers by Country</h2>
                </th>
                <th className="duration-button">
                  <select className="trigger-button">
                    <option>This Month</option>
                    <option>This Week</option>
                    <option>Today</option>
                  </select>
                </th>
              </tr>
              <tr className="card-chart">
                <WorldMapChart />
              </tr>
            </tbody>
          </table>

          <table className="card">
            <tbody>
              <tr className="card-title">
                <th>
                  <h2>Meetings top sources</h2>
                </th>
                <th className="duration-button">
                  <select className="trigger-button">
                    <option>This Month</option>
                    <option>This Week</option>
                    <option>Today</option>
                  </select>
                </th>
              </tr>
              <tr>
                <BasicPie />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
