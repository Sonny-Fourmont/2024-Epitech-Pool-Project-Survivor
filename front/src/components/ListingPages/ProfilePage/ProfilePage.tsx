/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** profil
 */

import React from 'react';
import NavBar from '../../Navbar/Navbar';
import StarRating from '../../StarRating/StarRating';
import LinkButton from '../../LinkButton';
import { useLoading } from '../../GetBackendData/GetBackendData';
import { CustomerData } from '../../GetBackendData/interfaces/CustomersInterface';
import './ProfilePage.css';

const Profile: React.FC = () => {
  const clientID: number = parseInt(
    window.location.pathname.split('/').pop() || '',
  );
  const dataList = useLoading<CustomerData>(
    'http://localhost:3001/customers' + clientID,
  );

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = '../../assets/user.png';
  };

  if (dataList.loading) {
    return <h1 className="centerTEXT">Loading...</h1>;
  }
  if (dataList.error) {
    return <h1 className="centerTEXT">Error: {dataList.error}</h1>;
  }

  const { name, surname, email, address, id } = dataList.data || {};

  return (
    <>
      <NavBar />
      <div className="marginTopPage">
        <div className="text-Flex flexBack">
          <h2 className="titleTopPage">Customer Details</h2>
          <button className="prefabButton">
            <LinkButton link="/customers" name="← Back" />
          </button>
        </div>
        <div className="container">
          <table className="left">
            <tbody>
              {dataList.data && (
                <tr>
                  <th colSpan={3} className="profil-header">
                    <img
                      src={`../../assets/clientsImages/${name}_${surname}.png`}
                      alt="img"
                      className="profilPicture"
                      onError={handleImageError}
                    ></img>
                    <p className="name-container">
                      {name} {surname}
                    </p>
                  </th>
                </tr>
              )}
              <tr></tr>
              <tr className="text-Flex">
                <td className="statistic-customers horizontaleLineUp">23</td>
                <td className="statistic-customers horizontaleLineUp">20</td>
                <td className="statistic-customers horizontaleLineUp">3</td>
              </tr>
              <tr className="text-Flex">
                <td className="statistic-customers horizontaleLineDown">
                  Total
                  <br />
                  Encounters
                </td>
                <td className="statistic-customers horizontaleLineDown">
                  Positives
                </td>
                <td className="statistic-customers horizontaleLineDown">
                  In Progress
                </td>
              </tr>
              <h4>SHORT DETAILS</h4>
              {dataList.data && (
                <tr className="interSpace interLine">
                  <p className="customerTitleDetails">User ID:</p>
                  <p className="customerDetails">{id}</p>
                </tr>
              )}
              {dataList.data && (
                <tr className="interSpace interLine">
                  <p className="customerTitleDetails">Email:</p>
                  <p className="customerDetails">{email}</p>
                </tr>
              )}
              {dataList.data && (
                <tr className="interSpace interLine">
                  <p className="customerTitleDetails">Address:</p>
                  <p className="customerDetails">{address}</p>
                </tr>
              )}
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
                    <StarRating maxStars={5} initialRating={3} />
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
                <tr>
                  {' '}
                  {/*for exemple*/}
                  <td>20 Jul 2024</td>
                  <td>Visa</td>
                  <td>-$45.00</td>
                  <td>Monthly Subscription</td>
                </tr>{' '}
                {/*for exemple end*/}
              </tbody>
            </table>
          </table>
        </div>
      </div>
    </>
  );
};

export default Profile;
