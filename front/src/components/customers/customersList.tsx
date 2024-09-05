/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** customersList
*/

import React from 'react';
import NavBar from '../navbar/Navbar';
import LinkButton from "../linkButton/linkButton";
import "../../CSSCustomerList.css"

const CustomersList: React.FC = () => {
  let fakeCount:number = 932

  return (
    <>
      <NavBar/>
      <div className="marginTopPage">
        <div className="text-Flex flexBack">
          <div className='interSpace'>
            <h2 className="titleTopPage">Customer List</h2>
            <p className='fakeCounter'>You have total {fakeCount} customers</p>
          </div>
          <div>
            <button className="prefabButton">☁ Export</button>
            <button className="prefabButton">+</button>
          </div>
        </div>

        <div className="container">
          <table className="clientList space">
            <thead>
              <div className='buttonAlign'>
                <select className='prefabButton'>
                  <option>Bulk Action</option>
                  <option>Edit</option>
                  <option>Move To Trash</option>
                </select>
                <button className='prefabButton'>Apply</button>
              </div>
              <tr className='leftAlign'>
                <th><label><input type="checkbox"/>Customers</label></th>
                <th>Email</th>
                <th>Phone</th>
                <th>Payment Methods</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><label><input type="checkbox"/>Bobby Gilbert</label></td>
                <td>bobby@softnio.com</td>
                <td>+342 675-6578</td>
                <td>visa</td>
                <td><LinkButton link="/customers/profile" name="..."/></td>
              </tr>
              <tr>
                <td><label><input type="checkbox"/>Bobby Gilbert</label></td>
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