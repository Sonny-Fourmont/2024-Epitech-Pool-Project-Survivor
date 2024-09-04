/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** customersList
*/

import React, {useState} from 'react';
import NavBar from '../navbar/Navbar';
import DropdownButton from "../dropDownButton/dropDownButton";
import { NavLink } from "react-router-dom";
import "../../CSSCustomerList.css"

const options = ["Edit", "Move To Trash", "Bulk Action"];

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

interface TripleDotProps {
  link: string;
}

const TripleDot: React.FC<TripleDotProps> = ({ link }) => {
  return (
    <NavLink
      to={link}
      style={({ isActive }) => ({
        height: "65%",
        cursor: "pointer",
        margin: "0 10px",
        display: "inline-block",
        borderBottom: isActive ? "solid" : "hidden",
        fontWeight: isActive ? "bold" : "normal",
        color: isActive ? "brgb(52, 52, 100)lue" : "rgb(37, 37, 77)",
        textDecoration: "none",
        fontSize: "40px"
      })}
    >
      <span>...</span>
    </NavLink>
  );
};

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      {label}
    </label>
  );
};

const CustomersList: React.FC = () => {
  let fakeCount:number = 932
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const handleSelect = (option: string) => {
    console.log("Bulk Action", option);
  };

  return (
    <>
      <NavBar/>
      <div className="client-size">
        <div className="text-Flex flexBack">
          <div className='interSpace'>
            <h2 className="titleClient">Customer List</h2>
            <p className='fakeCounter'>You have total {fakeCount} customers</p>
          </div>
          <div>
            <button className="backButton">☁ Export</button>
            <button className="backButton">+</button>
          </div>
        </div>
        <div className="container">
          <table className="clientList">
            <thead>
              <div className='buttonAlign'>
                <DropdownButton options={options} onSelect={handleSelect}/>
                <button className='backButton'>Apply</button>
              </div>
              <tr className='leftAlign'>
                <th><Checkbox label="Customer" checked={isChecked} onChange={handleCheckboxChange}/></th>
                <th>Email</th>
                <th>Phone</th>
                <th>Payment Methods</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Checkbox label="Bobby Gilbert" checked={isChecked} onChange={handleCheckboxChange}/></td>
                <td>bobby@softnio.com</td>
                <td>+342 675-6578</td>
                <td>visa</td>
                <td><TripleDot link="/customers/profile"/></td>
              </tr>
              <tr>
                <td><Checkbox label="Bobby Gilbert" checked={isChecked} onChange={handleCheckboxChange}/></td>
                <td>bobby@softnio.com</td>
                <td>+342 675-6578</td>
                <td>visa</td>
                <td><TripleDot link="/customers/profile"/></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomersList;