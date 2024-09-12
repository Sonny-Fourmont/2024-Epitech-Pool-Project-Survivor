import React, { useState, useEffect } from 'react';
import NavBar from '../Navbar/Navbar';
import LinkButton from '../LinkButton';
import { useLoadingList } from '../GetBackendData/GetBackendData';
import { CustomerData } from '../GetBackendData/interfaces/CustomersInterface';
import axios from 'axios';
import './ListingPage.css';
import { useNavigate } from 'react-router-dom';

const CustomersList: React.FC = () => {
  const navigate = useNavigate();
  const dataList = useLoadingList<CustomerData>(
    'http://localhost:3001/customers',
  );
  const [data, setData] = useState<CustomerData[]>(dataList.data || []);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [action, setAction] = useState<string>('');

  useEffect(() => {
    setData(dataList.data || []);
    setCheckedItems(new Array(dataList.data.length).fill(false));
  }, [dataList.data]);

  const activeAll = () => {
    const allChecked = !selectAll;
    setSelectAll(allChecked);
    setCheckedItems(new Array(data.length).fill(allChecked));
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
    setSortOrder(newSortOrder);

    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return newSortOrder === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return newSortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  const handleDeleteSelected = async () => {
    if (action === 'Move To Trash') {
      const idsToDelete = data
        .filter((_, index) => checkedItems[index])
        .map((customer) => customer.id);

      try {
        await Promise.all(
          idsToDelete.map((id) =>
            axios.delete(`http://localhost:3001/customers/delete/${id}`),
          ),
        );

        const remainingData = data.filter(
          (customer) => !idsToDelete.includes(customer.id),
        );
        setData(remainingData);
        setCheckedItems(new Array(remainingData.length).fill(false));
        setSelectAll(false);
      } catch (error) {
        console.error('Failed to delete selected customers:', error);
      }
    } else {
      console.log('No valid action selected or action is not Move To Trash');
    }
  };

  const handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAction(e.target.value);
  };

  if (dataList.loading) {
    return <h1 className="centerTEXT">Loading...</h1>;
  }
  if (dataList.error) {
    return <h1 className="centerTEXT">Error: {dataList.error}</h1>;
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
            <button
              className="prefabButton"
              onClick={() => navigate('/account')}
            >
              +
            </button>
          </div>
        </div>

        <div className="container">
          <table className="clientList space">
            <thead>
              <div className="buttonAlign">
                <select className="prefabButton" onChange={handleActionChange}>
                  <option value="">Bulk Action</option>
                  <option value="Edit">Edit</option>
                  <option value="Move To Trash">Move To Trash</option>
                </select>
                <button className="prefabButton" onClick={handleDeleteSelected}>
                  Apply
                </button>
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
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onClick={activeAll}
                    />
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
