/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** customersList
 */

import React, { useEffect, useState } from 'react';
import NavBar from '../navbar/Navbar';
import LinkButton from '../linkButton/linkButton';
import { getCustomers } from '../GetBackendData/GetBackendData';
import { CustomerData } from '../GetBackendData/interfaces/CustomersInterface';
import '../../CSSCustomerList.css';

const CustomersList: React.FC = () => {
  const [data, setData] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const activeAll = () => {
    setSelectAll(!selectAll);
    setCheckedItems(new Array(data.length).fill(!selectAll));
  };

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
  };

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = '../../assets/user.png';
  };

  const sortClients = (column: keyof CustomerData) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);

    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return newSortOrder === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return newSortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getCustomers();
        setData(result || []);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    loadData();
  }, []);
  if (loading) {
    return <h1 className="centerTEXT">Loading...</h1>;
  }
  if (error) {
    return <h1 className="centerTEXT">Error: {error}</h1>;
  }

  const customerCount: number = data.length;

  return (
    <>
      <NavBar />
      <div className="marginTopPage">
        <div className="text-Flex flexBack">
          <div className="interSpace">
            <h2 className="titleTopPage">Customer List</h2>
            <p className="fakeCounter">
              You have total {customerCount} customers
            </p>
          </div>
          <div>
            <button className="prefabButton">☁ Export</button>
            <button className="prefabButton">+</button>
          </div>
        </div>

        <div className="container">
          <table className="clientList space">
            <thead>
              <div className="buttonAlign">
                <select className="prefabButton">
                  <option>Bulk Action</option>
                  <option>Edit</option>
                  <option>Move To Trash</option>
                </select>
                <button className="prefabButton">Apply</button>
                <img
                  src="../../assets/sort.png"
                  alt="sort"
                  className="scaleSort"
                  onClick={() => sortClients('name')}
                ></img>
              </div>
              <tr className="leftAlign">
                <th>
                  <label>
                    <input type="checkbox" onClick={activeAll} />
                    Customers
                  </label>
                </th>
                <th>Email</th>
                <th>Phone</th>
                <th>Payment Methods</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((customer, index) => (
                <tr key={customer.id}>
                  <td>
                    <label className="imagePostion alineCenter">
                      <input
                        type="checkbox"
                        checked={checkedItems[index]}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      <img
                        src={`../../assets/clientsImages/${customer.name}_${customer.surname}.png`}
                        alt="img"
                        className="profilPicture"
                        onError={handleImageError}
                      ></img>{' '}
                      {customer.name} {customer.surname}
                    </label>
                  </td>
                  <td>{customer.email}</td>
                  <td>{customer.phone_number}</td>
                  <td>{'N/A'}</td>
                  <td>
                    <LinkButton
                      link={`/customers/profile/${customer.id}`}
                      name="..."
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomersList;
