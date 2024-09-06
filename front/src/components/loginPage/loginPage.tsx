/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** loginPage
*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { setAuthenticated } from '../../auth';

interface SignUpFormState  {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpFormState> ({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData, [name]: value}));
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const res: AxiosResponse = await axios.post('http://localhost:3001/employees/login', formData);
      if (res.data === "OK") {
        setAuthenticated(true);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Cannot post the form");
      }
    }
  }

  return (
    <section className='login'>
        <h3>Login Here</h3>

        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Username</label>
          <input
            className="login-box"
            type="email"
            name="email"
            id='email'
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
            maxLength={40}
          />

          <label htmlFor='password'>Password</label>
          <input
            className="login-box"
            type="password"
            name="password"
            id="pass"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
            maxLength={40}
          />

          <button type='submit'>Log In</button>
        </form>
    </section>
  );
};

export default Login;
