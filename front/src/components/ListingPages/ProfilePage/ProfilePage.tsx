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
import {
  useLoading,
  useLoadingList,
} from '../../GetBackendData/GetBackendData';
import { CustomerData } from '../../GetBackendData/interfaces/CustomersInterface';
import {
  EncounterData,
  EncounterIDData,
} from '../../GetBackendData/interfaces/EncounterInterface';
import { PaymentCustomerData } from '../../GetBackendData/interfaces/PaymentCustomerInterface';

import './ProfilePage.css';

const Profile: React.FC = () => {
  const clientID: number = parseInt(
    window.location.pathname.split('/').pop() || '',
  );
  const dataList = useLoading<CustomerData>(
    'http://localhost:3001/customers/' + clientID,
  );
  const dataListEncounters = useLoadingList<EncounterIDData>(
    'http://localhost:3001/encounters/customer/' + clientID,
  );
  const dataListComment = useLoadingList<EncounterData>(
    'http://localhost:3001/encounters',
  );
  const dataListPayments = useLoadingList<PaymentCustomerData>(
    'http://localhost:3001/api/customers/' + clientID + '/payments_history',
  );

  const EncounterList = dataListComment.data.filter(
    (items) => items.customer_id === clientID,
  );

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = '../../assets/user.png';
  };

  if (
    dataList.loading ||
    dataListEncounters.loading ||
    dataListComment.loading ||
    dataListPayments.loading
  ) {
    return <h1 className="centerTEXT">Loading...</h1>;
  }
  if (
    dataList.error ||
    dataListEncounters.error ||
    dataListComment.error ||
    dataListPayments.error
  ) {
    return (
      <h1 className="centerTEXT">
        Error:{' '}
        {dataList.error ||
          dataListEncounters.error ||
          dataListComment.error ||
          dataListPayments.error}
      </h1>
    );
  }

  const { name, surname, email, address, id } = dataList.data || {};
  const nbrComment: number = dataListEncounters.data.length;
  const nbrPositiveComment: number = dataListEncounters.data
    ? dataListEncounters.data.filter((item) => item.rating > 3).length
    : 0;

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
                <td className="statistic-customers horizontaleLineUp">
                  {nbrComment}
                </td>
                <td className="statistic-customers horizontaleLineUp">
                  {nbrPositiveComment}
                </td>
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
                <tr>
                  <p className="customerTitleDetails">Address:</p>
                  <p className="customerDetails">{address}</p>
                </tr>
              )}
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
                {EncounterList.map((list) => (
                  <tr key={list.idC}>
                    <>
                      <td>{list.date}</td>
                      <td>
                        <StarRating maxStars={5} initialRating={list.rating} />
                      </td>
                      <td>{list.comment}</td>
                      <td>{list.source}</td>
                    </>
                  </tr>
                ))}
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
                {dataListPayments.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.body.date}</td>
                    <td>{item.body.payment_method}</td>
                    <td>{item.body.amount}</td>
                    <td>{item.body.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </table>
        </div>
      </div>
    </>
  );
};

export default Profile;
