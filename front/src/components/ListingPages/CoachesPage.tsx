/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** coaches
 */

import React, { useState, useEffect } from 'react';
import NavBar from '../Navbar/Navbar';
import LinkButton from '../LinkButton';
import { useLoadingList } from '../GetBackendData/GetBackendData';
import { EmployeeData } from '../GetBackendData/interfaces/EmployeeInterface';
import axios from 'axios';
import './ListingPage.css';
import { useNavigate } from 'react-router-dom';

const CoachesList: React.FC = () => {
  const navigate = useNavigate();
  const dataList = useLoadingList<EmployeeData>(
    'http://localhost:3001/employees',
  );
  const [data, setData] = useState<EmployeeData[]>(dataList.data || []);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [action, setAction] = useState<string>('');

  useEffect(() => {
    setData(dataList.data || []);
  }, [dataList.data]);

  const activeAll = () => {
    setSelectAll(!selectAll);
    setCheckedItems(new Array(dataList.data.length).fill(!selectAll));
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

  const sortClients = (column: keyof EmployeeData) => {
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
            axios.delete(`http://localhost:3001/coaches/delete/${id}`),
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

  const employeeCount: number = dataList.data.length;

  return (
    <>
      <NavBar />
      <div className="marginTopPage">
        <div className="text-Flex flexBack">
          <div className="interSpace">
            <h2 className="titleTopPage">Coaches List</h2>
            <p className="fakeCounter">
              You have total {employeeCount} Coaches
            </p>
          </div>
          <div>
            {/* <button className="prefabButton">☁ Export</button> */}
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
                  <option>Bulk Action</option>
                  {/* <option>Edit</option> */}
                  <option>Move To Trash</option>
                </select>
                <button className="prefabButton" onClick={handleDeleteSelected}>
                  Apply
                </button>
                <img
                  src="../../../assets/sort.png"
                  alt="sort"
                  className="scaleSort"
                  onClick={() => sortClients('name')}
                ></img>
              </div>
              <tr className="leftAlign">
                <th>
                  <label>
                    <input type="checkbox" onClick={activeAll} />
                    Coach
                  </label>
                </th>
                <th>Email</th>
                <th>Phone</th>
                <th>Number of customers</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((Employees, index) => (
                <tr key={Employees.id}>
                  <td>
                    <label className="imagePostion alineCenter">
                      <input
                        type="checkbox"
                        checked={checkedItems[index]}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      <img
                        src={`../../assets/coachesImages/${Employees.name}_${Employees.surname}.png`}
                        alt="img"
                        onError={handleImageError}
                        className="profilPicture"
                      ></img>{' '}
                      {Employees.name} {Employees.surname}
                    </label>
                  </td>
                  <td>{Employees.email}</td>
                  <td>+342 675-6578</td>
                  <td>911</td>
                  <td>
                    <LinkButton link="/coaches" name="..." />
                  </td>
                </tr>
              ))}
              ;
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CoachesList;
