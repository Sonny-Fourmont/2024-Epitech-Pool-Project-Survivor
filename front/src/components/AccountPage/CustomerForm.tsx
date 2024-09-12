/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** CustomerForm
 */

import React, { useState } from 'react';
import NavBar from '../Navbar/Navbar';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { CustomerData } from '../GetBackendData/interfaces/CustomersInterface';

const astroList = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

const CustomerForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CustomerData>({
    _id: 0,
    id: 0,
    email: '',
    name: '',
    surname: '',
    birth_date: '',
    gender: '',
    description: '',
    astrological_sign: '',
    phone_number: '',
    address: '',
  });
  const [description, setDescription] = useState<string>('');
  const [astro, setAstro] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    try {
      const body: CustomerData = {
        _id: formData._id,
        id: formData.id,
        email: formData.email,
        name: formData.name,
        surname: formData.surname,
        birth_date: formData.birth_date,
        gender: formData.gender,
        description: description,
        astrological_sign: astro,
        phone_number: formData.phone_number,
        address: formData.address,
      };
      console.log('Sending body:', body);
      const res: AxiosResponse = await axios.post(
        'http://localhost:3001/customers/register',
        body,
      );
      if (res) {
        console.log('Customer sucessfully created');
      } else {
        console.error('Cannot send the newly created customer');
      }
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Cannot post the form');
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="account">
        <p className="account-header">New customer</p>
        <form onSubmit={handleSubmit} className="account-form">
          <label htmlFor="email" className="account-title">
            Email:{' '}
          </label>
          <input
            className="account-text-field"
            type="email"
            name="email"
            id="email"
            placeholder="your-email@mail.com"
            onChange={handleChange}
            value={formData.email}
            required
            maxLength={40}
          />

          <label htmlFor="name" className="account-title">
            Name:{' '}
          </label>
          <input
            className="account-text-field"
            type="name"
            name="name"
            id="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            required
            maxLength={40}
          />

          <label htmlFor="surname" className="account-title">
            Surname:{' '}
          </label>
          <input
            className="account-text-field"
            type="surname"
            name="surname"
            id="surname"
            placeholder="Surname"
            onChange={handleChange}
            value={formData.surname}
            required
            maxLength={40}
          />

          <label htmlFor="birth_date" className="account-title">
            Birth Date:{' '}
          </label>
          <input
            className="account-text-field"
            type="date"
            name="birth_date"
            id="birth_date"
            placeholder="Birth Date"
            onChange={handleChange}
            value={formData.birth_date}
            required
            maxLength={40}
          />

          <label htmlFor="gender" className="account-title">
            Gender:{' '}
          </label>
          <div className="account-gender">
            <div>
              <input
                className="account-gender-input"
                type="radio"
                value={'male'}
                name="gender"
                onChange={handleChange}
                key={'Male'}
              />
              <label className="account-gender-label">Male</label>
            </div>
            <div>
              <input
                className="account-gender-input"
                type="radio"
                value={'female'}
                name="gender"
                onChange={handleChange}
                key={'Female'}
              />
              <label className="account-gender-label">Female</label>
            </div>
          </div>

          <label htmlFor="description" className="account-title">
            Description:
          </label>
          <textarea
            className="account-text-field"
            name="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
            rows={4}
            cols={20}
          />

          <label htmlFor="astro" className="account-title">
            Astrological Sign:{' '}
          </label>
          <select
            className="account-dropdown"
            required
            onChange={(e) => {
              setAstro(e.target.value);
            }}
          >
            {astroList.map((astro) => (
              <option key={astro} value={astro}>
                {astro}
              </option>
            ))}
          </select>

          <label htmlFor="phone_number" className="account-title">
            Phone Number:{' '}
          </label>
          <input
            className="account-text-field"
            type="tel"
            name="phone_number"
            id="phone_number"
            placeholder="Phone Number"
            onChange={handleChange}
            value={formData.phone_number}
            required
            maxLength={30}
          />

          <label htmlFor="address" className="account-title">
            Adress:{' '}
          </label>
          <input
            className="account-text-field"
            type="text"
            name="address"
            id="address"
            placeholder="Adress"
            onChange={handleChange}
            value={formData.address}
            required
            maxLength={10}
          />

          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
};

export default CustomerForm;
