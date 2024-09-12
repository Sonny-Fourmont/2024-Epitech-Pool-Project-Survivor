import React, { useState } from 'react';
import NavBar from '../Navbar/Navbar';
import './ClothesPage.css';
import { useLoadingList } from '../GetBackendData/GetBackendData';
import { ClothesData } from '../GetBackendData/interfaces/ClosthesInterface';
import { CustomerData } from '../GetBackendData/interfaces/CustomersInterface';

const Clothes: React.FC = () => {
  const [clientID, setClientID] = useState<number | null>(1);
  const [hatIndex, setHatIndex] = useState(0);
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [shoesIndex, setShoesIndex] = useState(0);

  const dataListCustomers = useLoadingList<CustomerData>(
    'http://localhost:3001/customers/',
  );
  const dataListClothes = useLoadingList<ClothesData>(
    'http://localhost:3001/customers/' + clientID + '/clothes',
  );

  const hatClothes = dataListClothes.data.filter(
    (item) => item.body.type === 'hat/cap',
  );
  const topClothes = dataListClothes.data.filter(
    (item) => item.body.type === 'top',
  );
  const bottomClothes = dataListClothes.data.filter(
    (item) => item.body.type === 'bottom',
  );
  const shoesClothes = dataListClothes.data.filter(
    (item) => item.body.type === 'shoes',
  );

  const handleScroll = (type: string, direction: 'left' | 'right') => {
    if (type === 'hat/cap') {
      if (direction === 'left') {
        setHatIndex((prev) => (prev > 0 ? prev - 1 : hatClothes.length - 1));
      } else {
        setHatIndex((prev) => (prev < hatClothes.length - 1 ? prev + 1 : 0));
      }
    } else if (type === 'top') {
      if (direction === 'left') {
        setTopIndex((prev) => (prev > 0 ? prev - 1 : topClothes.length - 1));
      } else {
        setTopIndex((prev) => (prev < topClothes.length - 1 ? prev + 1 : 0));
      }
    } else if (type === 'bottom') {
      if (direction === 'left') {
        setBottomIndex((prev) =>
          prev > 0 ? prev - 1 : bottomClothes.length - 1,
        );
      } else {
        setBottomIndex((prev) =>
          prev < bottomClothes.length - 1 ? prev + 1 : 0,
        );
      }
    } else if (type === 'shoes') {
      if (direction === 'left') {
        setShoesIndex((prev) =>
          prev > 0 ? prev - 1 : shoesClothes.length - 1,
        );
      } else {
        setShoesIndex((prev) =>
          prev < shoesClothes.length - 1 ? prev + 1 : 0,
        );
      }
    }
  };

  const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClientID = parseInt(event.target.value);
    setClientID(selectedClientID);
    setHatIndex(0);
    setTopIndex(0);
    setBottomIndex(0);
    setShoesIndex(0);
  };

  if (dataListCustomers.loading || dataListClothes.loading) {
    return <h1 className="centerTEXT">Loading...</h1>;
  }
  if (dataListCustomers.error || dataListClothes.error) {
    return (
      <h1 className="centerTEXT">
        Error: {dataListCustomers.error || dataListClothes.error}
      </h1>
    );
  }

  return (
    <>
      <NavBar />
      <div className="marginTopPage">
        <div className="text-Flex">
          <h2 className="titleTopPage">Clothes</h2>
        </div>
        <div>
          <div className="clientSelector">
            <select
              className="selectCustomers"
              onChange={handleClientChange}
              value={clientID || ''}
            >
              <option value="">Select a customer</option>
              {dataListCustomers.data.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} {customer.surname}
                </option>
              ))}
            </select>
          </div>
          <div className="centerDiv">
            <img
              src="../../../assets/body.png"
              alt="body"
              className="picture imageBody"
            />
            {hatClothes.length > 0 && (
              <img
                src={`../../../assets/ClothesImages/hat_${hatClothes[hatIndex].body.id}.png`}
                alt="hat"
                className="picture imageCloth headCloth"
              />
            )}
            {topClothes.length > 0 && (
              <img
                src={`../../../assets/ClothesImages/top_${topClothes[topIndex].body.id}.png`}
                alt="top"
                className="picture imageCloth chestCloth"
              />
            )}
            {bottomClothes.length > 0 && (
              <img
                src={`../../../assets/ClothesImages/bottom_${bottomClothes[bottomIndex].body.id}.png`}
                alt="bottom"
                className="picture imageCloth legsCloth"
              />
            )}

            {shoesClothes.length > 0 && (
              <img
                src={`../../../assets/ClothesImages/shoes_${shoesClothes[shoesIndex].body.id}.png`}
                alt="shoes"
                className="picture imageCloth feetCloth"
              />
            )}

            <div className="verticalCompatibilityCloth leftCloth">
              <p
                className="arrowCloth"
                onClick={() => handleScroll('hat/cap', 'left')}
              >
                ◀
              </p>
              <p
                className="arrowCloth"
                onClick={() => handleScroll('top', 'left')}
              >
                ◀
              </p>
              <p
                className="arrowCloth"
                onClick={() => handleScroll('bottom', 'left')}
              >
                ◀
              </p>
              <p
                className="arrowCloth"
                onClick={() => handleScroll('shoes', 'left')}
              >
                ◀
              </p>
            </div>

            <div className="verticalCompatibilityCloth rigthCloth">
              <p
                className="arrowCloth"
                onClick={() => handleScroll('hat/cap', 'right')}
              >
                ▶
              </p>
              <p
                className="arrowCloth"
                onClick={() => handleScroll('top', 'right')}
              >
                ▶
              </p>
              <p
                className="arrowCloth"
                onClick={() => handleScroll('bottom', 'right')}
              >
                ▶
              </p>
              <p
                className="arrowCloth"
                onClick={() => handleScroll('shoes', 'right')}
              >
                ▶
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clothes;
