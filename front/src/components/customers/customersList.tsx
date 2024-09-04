/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** customersList
*/

import React, {useState} from 'react';
import NavBar from '../navbar/Navbar';
import DropdownButton from "../dropDownButton/dropDownButton";
import LinkButton from "../linkButton/linkButton";
import Checkbox from "../checkBox/checkBox";
import "../../CSSCustomerList.css"

const options = ["Edit", "Move To Trash", "Bulk Action"];

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
              <div className='buttonAlign space'>
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
                <td><LinkButton link="/customers/profile" name="..."/></td>
              </tr>
              <tr>
                <td><Checkbox label="Bobby Gilbert" checked={isChecked} onChange={handleCheckboxChange}/></td>
                <td>bobby@softnio.com</td>
                <td>+342 675-6578</td>
                <td>visa</td>
                <td><LinkButton link="/customers/profile" name="..."/></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomersList;