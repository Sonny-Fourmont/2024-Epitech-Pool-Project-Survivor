/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** accountPage
*/

import React, { useState } from 'react';
import NavBar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError, AxiosResponse } from 'axios';
import MultiSelectDropdown from '../charts/MultiSelectDropdown';

interface AccountCreationFormState  {
  email: string;
  password: string;
  name: string;
  surname: string;
  birth_date: string;
  gender: string;
  work: string;
}

const AccountPage: React.FC = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState<AccountCreationFormState> ({
    email: '',
    password: '',
    name: '',
    surname: '',
    birth_date: '',
    gender: '',
    work: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData, [name]: value}));
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const res: AxiosResponse = await axios.post('http://localhost:3001/employees/create', formData);
      if (res.data === "OK") {
        navigate("/dashboard");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Cannot post the form");
      }
    }
  }

  return (
    <>
      <NavBar/>
      <div className='account'>
        <p className='account-header'>New employee</p>
        <form onSubmit={handleSubmit} className='account-form'>

          <label htmlFor='email' className='account-title'>Email: </label>
          <input
            className="account-text-field"
            type="email"
            name="email"
            id='email'
            placeholder="your-email@mail.com"
            onChange={handleChange}
            value={formData.email}
            required
            maxLength={40}
          />

          <label htmlFor='name' className='account-title'>Name: </label>
          <input
            className="account-text-field"
            type="name"
            name="name"
            id='name'
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            required
            maxLength={40}
          />

          <label htmlFor='surname' className='account-title'>Surname: </label>
          <input
            className="account-text-field"
            type="surname"
            name="surname"
            id='surname'
            placeholder="Surname"
            onChange={handleChange}
            value={formData.surname}
            required
            maxLength={40}
          />

          <label htmlFor='birth_date' className='account-title'>Birth Date: </label>
          <input
            className="account-text-field"
            type="date"
            name="birth_date"
            id='birth_date'
            placeholder="Birth Date"
            onChange={handleChange}
            value={formData.birth_date}
            required
            maxLength={40}
          />

          <label htmlFor='work' className='account-title'>Work: </label>
          <select className='account-dropdown' required>
            <option value={formData.work}>Option 1</option>
            <option value={formData.work}>Option 2</option>
            <option value={formData.work}>Option 3</option>
          </select>

          <label htmlFor='assign-client' className='account-title'>Assign Client: </label>
          <select className='account-dropdown' required>
            <option value={formData.work}>Option 1</option>
            <option value={formData.work}>Option 2</option>
            <option value={formData.work}>Option 3</option>
          </select>
          {/* <MultiSelectDropdown/> */}

          <label htmlFor='gender' className='account-title'>Gender: </label>
          <div className='account-gender'>
            <div>
              <input className='account-gender-input' type='radio' value="Male" name='gender' onChange={handleChange}/>
              <label className='account-gender-label'>Male</label>
            </div>
            <div>
              <input className='account-gender-input' type='radio' value="Female" name='gender' onChange={handleChange}/>
              <label className='account-gender-label'>Female</label>
            </div>
          </div>

          <button type='submit'>Create</button>
        </form>
      </div>
    </>
  );
};

export default AccountPage;