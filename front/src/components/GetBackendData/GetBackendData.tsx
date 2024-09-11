/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** GetBackendData
 */

import axios, { AxiosResponse, AxiosError } from 'axios';
import { CustomerData } from './interfaces/CustomersInterface';
import { EmployeeData } from './interfaces/EmployeeInterface';
import { TipsData } from './interfaces/TipsInterface';
// import { ClothesData } from "./interfaces/ClosthesInterface";
import { EventsData } from './interfaces/EventsInterface';
import { EncounterData } from './interfaces/EncounterInterface';

export const getTips = async (): Promise<TipsData[] | undefined> => {
  try {
    const res: AxiosResponse = await axios.get('http://localhost:3001/tips');
    if (res.data) {
      console.log(res.data);
      return res.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Cannot get the data', error.message);
    } else {
      console.error('An unexpected error occurred', error);
    }
  }
  return undefined;
};

export const getCustomers = async (): Promise<CustomerData[] | undefined> => {
  try {
    const res: AxiosResponse = await axios.get(
      'http://localhost:3001/customers',
    );
    if (res.data) {
      console.log(res.data);
      return res.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Cannot get the data', error.message);
    } else {
      console.error('An unexpected error occurred', error);
    }
  }
  return undefined;
};

export const getCustomersID = async (
  ID: number,
): Promise<CustomerData | undefined> => {
  try {
    const res: AxiosResponse = await axios.get(
      'http://localhost:3001/customers/' + ID,
    );
    if (res.data) {
      console.log(res.data);
      return res.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Cannot get the data', error.message);
    } else {
      console.error('An unexpected error occurred', error);
    }
  }
  return undefined;
};

export const getEmployee = async (): Promise<EmployeeData[] | undefined> => {
  try {
    const res: AxiosResponse = await axios.get(
      'http://localhost:3001/employees',
    );
    if (res.data) {
      console.log(res.data);
      return res.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Cannot get the data', error.message);
    } else {
      console.error('An unexpected error occurred', error);
    }
  }
  return undefined;
};

// export const getClothes = async (): Promise<ClothesData | undefined> => {
//     try {
//         const res: AxiosResponse = await axios.get('http://localhost:3001/clothes');
//         if (res.data) {
//             console.log(res.data);
//             const parsedResponse: ClothesData = res.data;
//             return parsedResponse;
//         }
//     } catch (error) {
//         if (error instanceof AxiosError) {
//             console.error("Cannot get the data", error.message);
//         } else {
//             console.error("An unexpected error occurred", error);
//         }
//     }
//     return undefined;
// }

export const getEvents = async (): Promise<EventsData[] | undefined> => {
  try {
    const res: AxiosResponse = await axios.get('http://localhost:3001/events');
    if (res.data) {
      console.log(res.data);
      return res.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Cannot get the data', error.message);
    } else {
      console.error('An unexpected error occurred', error);
    }
  }
  return undefined;
};

export const getEncouters = async (): Promise<EncounterData[] | undefined> => {
  try {
    const res: AxiosResponse = await axios.get(
      'http://localhost:3001/encounters',
    );
    if (res.data) {
      console.log(res.data);
      const parsedResponse: EncounterData[] = res.data;
      return parsedResponse;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Cannot get the data', error.message);
    } else {
      console.error('An unexpected error occurred', error);
    }
  }
  return undefined;
};

export const getEncoutersById = async (
  id: number,
): Promise<EncounterData | undefined> => {
  try {
    const res: AxiosResponse = await axios.get(
      'http://localhost:3001/encounters/' + id,
    );
    if (res.data) {
      console.log(res.data);
      const parsedResponse: EncounterData = res.data;
      return parsedResponse;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Cannot get the data', error.message);
    } else {
      console.error('An unexpected error occurred', error);
    }
  }
  return undefined;
};
