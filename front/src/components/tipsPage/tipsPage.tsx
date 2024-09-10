/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** tipsPage
*/

import React, {useState, useEffect}from 'react';
import NavBar from '../navbar/Navbar';
import { getTips } from "../GetBackendData/GetBackendData";
import { TipsData } from "../GetBackendData/interfaces/TipsInterface";
import "../../CSSCustomerList.css"


const Tips: React.FC = () => {
  const [data , setData] = useState<TipsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getTips();
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
    <>
      <NavBar/>
      <div className="marginTopPage">
        <div className="text-Flex flexBack">
          <div className='interSpace'>
            <h2 className="titleTopPage">Tips for coaches</h2>
          </div>
        </div>
        <div className="container">
          <table className="clientList">
            <tbody>
              {data.map((Tips) =>
                <tr>
                  <details>
                    <summary>{Tips.title}</summary>
                    <p>{Tips.tip}</p>
                  </details>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tips;