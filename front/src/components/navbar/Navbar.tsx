/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** Navbar
*/

import React from "react";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <>
      <nav className="navbar" id="topnav">
        <div className="navbar-wrapper">
          <h2>Soul connection</h2>
          <div className="nav-center">
            <NavLink to="/dashboard" style={({ isActive }) => {
              return {
                height: "65%",
                cursor: "pointer",
                margin: "0 10px",
                display: "inline-block",
                borderBottom: isActive ? "solid" : "hidden",
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "#c2185b" : "#c2185b;",
              };
            }}>
              <p className="icon">Dashboard</p>
            </NavLink>
            <NavLink to="/coaches" style={({ isActive }) => {
              return {
                height: "65%",
                cursor: "pointer",
                margin: "0 10px",
                display: "inline-block",
                borderBottom: isActive ? "solid" : "hidden",
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "#c2185b" : "#c2185b;",
              };
            }}>
              <p className="icon">Coaches</p>
            </NavLink>
            <NavLink to="/customers" style={({ isActive }) => {
              return {
                height: "65%",
                cursor: "pointer",
                margin: "0 10px",
                display: "inline-block",
                borderBottom: isActive ? "solid" : "hidden",
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "#c2185b" : "#c2185b;",
              };
            }}>
              <p className="icon">Customers</p>
            </NavLink>
            <NavLink to="/tips" style={({ isActive }) => {
              return {
                height: "65%",
                cursor: "pointer",
                margin: "0 10px",
                display: "inline-block",
                borderBottom: isActive ? "solid" : "hidden",
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "#c2185b" : "#c2185b;",
              };
            }}>
              <p className="icon">Tips</p>
            </NavLink>
            <NavLink to="/events" style={({ isActive }) => {
              return {
                height: "65%",
                cursor: "pointer",
                margin: "0 10px",
                display: "inline-block",
                borderBottom: isActive ? "solid" : "hidden",
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "#c2185b" : "#c2185b;",
              };
            }}>
              <p className="icon">Events</p>
            </NavLink>
            <NavLink to="/Astrological" style={({ isActive }) => {
              return {
                height: "65%",
                cursor: "pointer",
                margin: "0 10px",
                display: "inline-block",
                borderBottom: isActive ? "solid" : "hidden",
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "#c2185b" : "#c2185b;",
              };
            }}>
              <p className="icon">Astrological</p>
            </NavLink>
            <NavLink to="/clothes" style={({ isActive }) => {
              return {
                height: "65%",
                cursor: "pointer",
                margin: "0 10px",
                display: "inline-block",
                borderBottom: isActive ? "solid" : "hidden",
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "#c2185b" : "#c2185b;",
              };
            }}>
              <p className="icon">Clothes</p>
            </NavLink>
            <NavLink to="/account" style={({ isActive }) => {
              return {
                height: "65%",
                cursor: "pointer",
                margin: "0 10px",
                display: "inline-block",
                borderBottom: isActive ? "solid" : "hidden",
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "#c2185b" : "#c2185b;",
              };
            }}>
              <p className="icon">Account</p>
            </NavLink>
          </div>
          <div className="nav-right">
            <img src="../../../assets/message.png" alt="" className="nav-icon"/>
            <img src="../../../assets/united-states-of-america.png" alt="" className="nav-icon"/>
            <NavLink to="/login">
              <img src="../../../assets/user.png" alt="" className="nav-icon"/>
            </NavLink>
          </div>
        </div>

      </nav>
    </>
  );
};

export default NavBar;