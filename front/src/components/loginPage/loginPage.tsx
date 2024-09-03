/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** loginPage
*/
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {

  const navigate = useNavigate();

  return (
    <section className='login'>
      <form>
        <h3>Login Here</h3>

        <label>Username</label>
        <input type="text" className="login-box" name="email" placeholder="Email"/>
        <label>Password</label>
        <input type="password" className="login-box" name="password" placeholder="Password"/>

        <button onClick={()=>navigate("/dashboard")}>Log In</button>

      </form>
    </section>
  );
};

export default Login;
