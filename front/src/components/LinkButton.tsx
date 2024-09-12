/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** linkButton
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar/Navbar.css';

interface LinkButtonProps {
  link: string;
  name: string;
  nav?: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = ({ link, name, nav = false }) => {
  return nav ? (
    <NavLink
      to={link}
      style={({ isActive }) => ({
        textDecoration: 'none',
        height: '65%',
        cursor: 'pointer',
        margin: '0 10px',
        display: 'inline-block',
        fontWeight: isActive ? 'bold' : 'normal',
        borderBottom: isActive ? 'solid' : 'hidden',
        color: '#c2185b',
      })}
    >
      <p className="icon">{name}</p>
    </NavLink>
  ) : (
    <NavLink
      to={link}
      style={() => ({
        textDecoration: 'none',
        height: '65%',
        cursor: 'pointer',
        margin: '0 10px',
        display: 'inline-block',
        fontWeight: 'bold',
        color: '#c2185b',
        fontSize: '15px',
      })}
    >
      <p className="icon">{name}</p>
    </NavLink>
  );
};

export default LinkButton;
