/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** Navbar
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import LinkButton from '../LinkButton';

const NavBar: React.FC = () => {
  return (
    <>
      <nav className="navbar" id="topnav">
        <div className="navbar-wrapper">
          <h2>Soul connection</h2>
          <div className="nav-center">
            <LinkButton
              link="/dashboard"
              name="Dashboard"
              nav={true}
            ></LinkButton>
            <LinkButton link="/coaches" name="Coaches" nav={true}></LinkButton>
            <LinkButton
              link="/customers"
              name="Customers"
              nav={true}
            ></LinkButton>
            <LinkButton link="/tips" name="Tips" nav={true}></LinkButton>
            <LinkButton link="/events" name="Events" nav={true}></LinkButton>
            <LinkButton
              link="/Astrological"
              name="Astrological"
              nav={true}
            ></LinkButton>
            <LinkButton link="/clothes" name="Clothes" nav={true}></LinkButton>
            <LinkButton link="/account" name="Account" nav={true}></LinkButton>
          </div>
          <div className="nav-right">
            <img
              src="../../../assets/message.png"
              alt=""
              className="nav-icon"
            />
            <img
              src="../../../assets/united-states-of-america.png"
              alt=""
              className="nav-icon"
            />
            <NavLink to="/login">
              <img src="../../../assets/user.png" alt="" className="nav-icon" />
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
