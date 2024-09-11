/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** profil
 */

import React, { useEffect, useState } from 'react';
import NavBar from '../navbar/Navbar';
import { getCustomers } from '../GetBackendData/GetBackendData';
import { CustomerData } from '../GetBackendData/interfaces/CustomersInterface';
import '../../CSSAstrologicals.css';

const Astrological: React.FC = () => {
  const [data, setData] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [compatibility, setCompatibility] = useState<number>(0);

  const randNumber = (): number => {
    const rand = Math.random() * (100 - 1);
    return Math.trunc(rand);
  };

  const handleClick = () => {
    setCompatibility(randNumber());
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getCustomers();
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
                {data.map((data) => (
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
                {data.map((data) => (
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
