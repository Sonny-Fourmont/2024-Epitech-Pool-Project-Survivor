/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** coaches
*/

import React, {useState, useEffect} from 'react';
import NavBar from '../navbar/Navbar';
import LinkButton from "../linkButton/linkButton";
import { getEmployee } from '../GetBackendData/GetBackendData';
import { EmployeeData } from "../GetBackendData/interfaces/EmployeeInterface";
import "../../CSSCustomerList.css"


const CoachesList: React.FC = () => {
  const [data , setData] = useState<EmployeeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [sortColumn, setSortColumn] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const activeAll = () => {
    setSelectAll(!selectAll);
    setCheckedItems(new Array(data.length).fill(!selectAll))
  };

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index]
    setCheckedItems(updatedCheckedItems);
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = '../../assets/user.png';
  };

  const sortClients = (column: keyof EmployeeData) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);

    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return newSortOrder === "asc" ? -1 : 1;
      if (a[column] > b[column]) return newSortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getEmployee();
        setData(result || []);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
    loadData();
  }, []);
  if (loading) {return <h1 className='centerTEXT'>Loading...</h1>;}
  if (error) {return <h1 className='centerTEXT'>Error: {error}</h1>;}

  let employeeCount:number = data.length;

  return (
    <>
      <NavBar/>
      <div className="marginTopPage">
        <div className="text-Flex flexBack">
          <div className='interSpace'>
            <h2 className="titleTopPage">Coaches List</h2>
            <p className='fakeCounter'>You have total {employeeCount} Coaches</p>
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
                <img src='../../../assets/sort.png' alt='sort' className='scaleSort' onClick={() => sortClients("name")}></img>
              </div>
              <tr className='leftAlign'>
                <th><label><input type="checkbox" onClick={activeAll}/>Coach</label></th>
                <th>Email</th>
                <th>Phone</th>
                <th>Number of customers</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((Employees, index) =>
                <tr key={Employees.id}>
                  <td>
                    <label className='imagePostion alineCenter'>
                      <input type="checkbox" checked={checkedItems[index]} onChange={() => handleCheckboxChange(index)} /><img src={`../../assets/coachesImages/${Employees.name}_${Employees.surname}.png`} alt='img' onError={handleImageError} className='profilPicture'></img> {Employees.name} {Employees.surname}
                    </label>
                  </td>
                  <td>{Employees.email}</td>
                  <td>+342 675-6578</td>
                  <td>911</td>
                  <td><LinkButton link="/coaches" name="..."/></td>
                </tr>
              )};
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CoachesList;