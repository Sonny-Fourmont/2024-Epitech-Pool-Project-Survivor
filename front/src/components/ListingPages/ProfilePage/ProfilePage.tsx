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
  const dataListComment = useLoading<EncounterData>(
    'http://localhost:3001/encounters/' + clientID,
  );

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = '../../assets/user.png';
  };

  if (dataList.loading || dataListEncounters.loading) {
    return <h1 className="centerTEXT">Loading...</h1>;
  }
  if (dataList.error || dataListEncounters.error) {
    return <h1 className="centerTEXT">Error: {dataList.error}</h1>;
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
                {dataListEncounters.data.map((list) => (
                  <tr key={list.ID}>
                    {dataListComment.data && (
                      <>
                        <td>{dataListComment.data.date}</td>
                        <td>
                          <StarRating
                            maxStars={5}
                            initialRating={dataListComment.data.rating}
                          />
                        </td>
                        <td>{dataListComment.data.comment}</td>
                        <td>{dataListComment.data.source}</td>
                      </>
                    )}
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
                <tr>
                  <td>20 Jul 2024</td>
                  <td>Visa</td>
                  <td>-$45.00</td>
                  <td>Monthly Subscription</td>
                </tr>
              </tbody>
            </table>
          </table>
        </div>
      </div>
    </>
  );
};

export default Profile;
