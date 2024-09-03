/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** profil
*/

import React, { useState } from "react";
import NavBar from "../navbar/Navbar";
import StarRating from "../starRating/starRating"
import "../../CSSProfile.css"

const Profile: React.FC = () => {
  const [fields] = useState({
    name: "Jeanne Martin",
    address: "Rue champs elysee",
    email: "jeanne.martin@soul-connection.fr"});

  const handleRatingChange = (newRating: number) => {
    console.log(`New rating is: ${newRating}`);
  };

  return (
    <>
      <NavBar/>
      <div className="client-size">
        <div className="text-Flex flexBack">
          <h2 className="titleClient">Customer Details</h2>
          <button className="backButton">← Back</button>
        </div>
        <div className="container">
          <table className="left">
            <thead>
              <tr>
                <th colSpan={3} className="profil-header">
                  <img src="../../../assets/survivor.jpg" alt="Profil" className="profilPicture" />
                  <p className="name-container">{fields.name}</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
              <tr className="text-Flex">
                <td className="statistic-customers horizontaleLineUp">23</td>
                <td className="statistic-customers horizontaleLineUp">20</td>
                <td className="statistic-customers horizontaleLineUp">3</td>
              </tr>
              <tr className="text-Flex">
                <td className="statistic-customers horizontaleLineDown">Total<br/>Encounters</td>
                <td className="statistic-customers horizontaleLineDown">Positives</td>
                <td className="statistic-customers horizontaleLineDown">In Progress</td>
              </tr>
              <h4>SHORT DETAILS</h4>
              <tr className="interSpace interLine">
                <p className="customerTitleDetails">User ID:</p>
                <p className="customerDetails">A Number</p>
              </tr>
              <tr className="interSpace interLine">
                <p className="customerTitleDetails">Email:</p>
                <p className="customerDetails">{fields.email}</p>
              </tr>
              <tr className="interSpace interLine">
                <p className="customerTitleDetails">Address:</p>
                <p className="customerDetails">{fields.address}</p>
              </tr>
              <tr className="interSpace interLine">
                <p className="customerTitleDetails">Last Activity:</p>
                <p className="customerDetails">One day</p>
              </tr>
              <tr className="interSpace interLine">
                <p className="customerTitleDetails">Coach:</p>
                <p className="customerDetails">Someone</p>
              </tr>
            </tbody>
          </table>

          <table className="right">
            <h5>Recent Meeting</h5>
            <table className="clientsTable">
              <tbody>
                <tr>
                  <th>Date</th>
                  <th>Rating</th>
                  <th>Report</th>
                  <th>Source</th>
                </tr>
                <tr>
                  <td>23 Jul 2024</td>
                  <td>
                    <StarRating maxStars={5} initialRating={3} onRatingChange={handleRatingChange} />
                  </td>
                  <td>A very good moment !</td>
                  <td>Dating app</td>
                </tr>
              </tbody>
            </table>
            <h5>Payment History</h5>
            <table className="clientsTable">
              <tbody>
                <tr>
                  <th>Date</th>
                  <th>Payment Methode</th>
                  <th>Amount</th>
                  <th>Comment</th>
                </tr>
                <tr> {/*for exemple*/}
                  <td>20 Jul 2024</td>
                  <td>Visa</td>
                  <td>-$45.00</td>
                  <td>Monthly Subscription</td>
                </tr>
                <tr>
                  <td>20 Jul 2024</td>
                  <td>Visa</td>
                  <td>-$45.00</td>
                  <td>Monthly Subscription</td>
                </tr>
                <tr>
                  <td>20 Jul 2024</td>
                  <td>Visa</td>
                  <td>-$45.00</td>
                  <td>Monthly Subscription</td>
                </tr> {/*for exemple end*/}
              </tbody>
            </table>
          </table>
        </div>
      </div>
    </>
  );
};

export default Profile;
