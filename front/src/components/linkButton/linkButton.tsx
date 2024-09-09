/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** linkButton
*/
import React from 'react';
import { NavLink } from "react-router-dom";

interface LinkButtonProps {
    link: string;
    name: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ link, name }) => {
return (
        <NavLink
        to={link}
        style={({ isActive }) => ({
            textDecoration: "none",
            height: "65%",
            cursor: "pointer",
            margin: "0 10px",
            display: "inline-block",
            fontWeight: "bold",
            color: isActive ? "#7a4c83" : "rgb(37, 37, 77)",
            fontSize: "20px"
        })}
        >
        <span>{name}</span>
        </NavLink>
    );
};

export default LinkButton;