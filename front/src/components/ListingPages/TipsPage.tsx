/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** tipsPage
 */

import React from 'react';
import NavBar from '../Navbar/Navbar';
import { useLoadingList } from '../GetBackendData/GetBackendData';
import { TipsData } from '../GetBackendData/interfaces/TipsInterface';
import './ListingPage.css';

const Tips: React.FC = () => {
  const dataList = useLoadingList<TipsData>('http://localhost:3001/tips');

  if (dataList.loading) {
    return <h1 className="centerTEXT">Loading...</h1>;
  }
  if (dataList.error) {
    return <h1 className="centerTEXT">Error: {dataList.error}</h1>;
  }

  return (
    <>
      <NavBar />
      <div className="marginTopPage">
        <div className="text-Flex flexBack">
          <div className="interSpace">
            <h2 className="titleTopPage">Tips for coaches</h2>
          </div>
        </div>
        <div className="container">
          <table className="clientList">
            <tbody>
              {dataList.data.map((Tips) => (
                <tr key={Tips.id}>
                  <details>
                    <summary>{Tips.title}</summary>
                    <p>{Tips.tip}</p>
                  </details>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tips;
