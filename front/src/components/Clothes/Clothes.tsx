/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** Clothes
*/

import React from "react";
import NavBar from "../navbar/Navbar";
import "../../CSSClothes.css"

interface SelectionArrowProps {
    path: string;
}

const SelectionArrow: React.FC<SelectionArrowProps> = ({ path }) => {
    return (
        <img src={path} alt="clothes" className="picture imageCloth" />
    );
};

const Clothes: React.FC = () => {
    return (
        <>
            <NavBar />
            <div className="marginTopPage">
                <div className="text-Flex">
                    <h2 className="titleTopPage">Clothes</h2>
                </div>
                <div>
                    <div className="clientSelector">
                        <select className="prefabButton">
                            <option>Clients</option>
                        </select>
                    </div>
                    <div className="centerDiv">
                        <img src="../../../assets/body.png" alt="clothes" className="picture imageBody"/>
                        <img src="../../../assets/survivor.jpg" alt="clothes" className="picture imageCloth headCloth"/>
                        <img src="../../../assets/survivor.jpg" alt="clothes" className="picture imageCloth chestCloth"/>
                        <img src="../../../assets/survivor.jpg" alt="clothes" className="picture imageCloth legsCloth"/>
                        <img src="../../../assets/survivor.jpg" alt="clothes" className="picture imageCloth feetCloth"/>
                        <div className="verticalCompatibilityCloth leftCloth">
                            <p className="arrowCloth">◀</p>
                            <p className="arrowCloth">◀</p>
                            <p className="arrowCloth">◀</p>
                            <p className="arrowCloth">◀</p>
                        </div>
                        <div className="verticalCompatibilityCloth rigthCloth">
                            <p className="arrowCloth">▶</p>
                            <p className="arrowCloth">▶</p>
                            <p className="arrowCloth">▶</p>
                            <p className="arrowCloth">▶</p>
                        </div>
                    </div>
                    <div className="centerDivRight"></div>
                </div>
            </div>
        </>
    );
};

export default Clothes;
