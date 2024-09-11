/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** GetBackendData
 */

import { useEffect, useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

export const useLoadingList = <T,>(
  link: string,
): { data: T[]; loading: boolean; error: string | null } => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res: AxiosResponse<T[]> = await axios.get(link);
        setData(res.data || []);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(`Failed to fetch data: ${err.message}`);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [link]);

  return { data, loading, error };
};

export const useLoading = <T,>(
  link: string,
): { data: T | null; loading: boolean; error: string | null } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res: AxiosResponse<T> = await axios.get(link);
        if (Array.isArray(res.data)) {
          throw new Error('Data is a list, but an object was expected.');
        }
        setData(res.data || null);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(`Failed to fetch data: ${err.message}`);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [link]);

  return { data, loading, error };
};

export const getDataList = async <T,>(
  link: string,
): Promise<T[] | undefined> => {
  try {
    const res: AxiosResponse<T[]> = await axios.get<T[]>(link);
    if (res.data) {
      console.log(res.data);
      return res.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Cannot get the data:', error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
  return undefined;
};
