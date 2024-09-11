/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** profil
 */

import React, { useState } from 'react';
import NavBar from '../Navbar/Navbar';
import { useLoadingList } from '../GetBackendData/GetBackendData';
import { CustomerData } from '../GetBackendData/interfaces/CustomersInterface';
import './AstrologicalPage.css';

const Astrological: React.FC = () => {
  const dataList = useLoadingList<CustomerData>(
    'http://localhost:3001/customers',
  );
  const [compatibility, setCompatibility] = useState<number>(0);

  const randNumber = (): number => {
    const rand = Math.random() * (100 - 1);
    return Math.trunc(rand);
  };

  const handleClick = () => {
    setCompatibility(randNumber());
  };

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
        <div className="text-Flex">
          <h2 className="titleTopPage">Astrological Compatibility</h2>
        </div>
        <div className="containerCompatibility">
          <table className="leftCompatibility">
            <tbody>
              <select className="prefabButton choseYourCharacter">
                {dataList.data.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.name} {data.surname}: {data.astrological_sign}
                  </option>
                ))}
              </select>
            </tbody>
          </table>

          <div className="verticalCompatibility">
            <button
              className="CompatibilityPercentage TRYButton"
              onClick={handleClick}
            >
              TRY
            </button>
            <p className="heart">❤️</p>
            <p className="CompatibilityPercentageNumber">
              {compatibility}% of Compatibility
            </p>
          </div>

          <table className="rightCompatibility">
            <tbody>
              <select className="prefabButton choseYourCharacter">
                {dataList.data.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.name} {data.surname}: {data.astrological_sign}
                  </option>
                ))}
              </select>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Astrological;
