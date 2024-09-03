/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** Navbar
*/

import React from "react";

const NavBar: React.FC = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-wrapper">
          <div className="nav-items">
            <a href="/">
              <p className="icon">Home</p>
            </a>
            <a href="/account">
              <p className="icon">Account</p>
            </a>
            <a href="/profil">
              <p className="icon">Profile</p>
            </a>
            <a href="/stats">
              <p className="icon">Stats</p>
            </a>
            <a href="/advices">
              <p className="icon">Advices</p>
            </a>
            <a href="/events">
              <p className="icon">Events</p>
            </a>
            <a href="/login">
              <p className="icon">Login</p>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;