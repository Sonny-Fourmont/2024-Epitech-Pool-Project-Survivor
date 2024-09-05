/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** profil
*/

import React from "react";
import NavBar from "../navbar/Navbar";
import "../../CSSAstrologicals.css"

const Astrological: React.FC = () => {
  const nbr:number = 10;

  return (
    <>
      <NavBar/>
      <div className="marginTopPage">
        <div className="text-Flex">
          <h2 className="titleTopPage">Astrological Compatibility</h2>
        </div>
        <div className="containerCompatibility">
          <table className="leftCompatibility">
            <tbody>
              <select className='prefabButton choseYourCharacter'>
                <option>Une option</option>
              </select>
            </tbody>
          </table>

          <div className="verticalCompatibility">
            <button className="CompatibilityPercentage TRYButton">TRY</button>
            <p className="heart">❤️</p>
            <p className="CompatibilityPercentageNumber">{nbr}% of Compatibility</p>
          </div>

          <table className="rightCompatibility">
            <tbody>
              <select className='prefabButton choseYourCharacter'>
                <option>Une option</option>
              </select>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Astrological;
