/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** StackedBarChart
 */

import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { getEvents } from '../GetBackendData/GetBackendData';
import { EventsData } from '../GetBackendData/interfaces/EventsInterface';

type StatDate = {
  month: string;
  year: number;
};

export default function StackedBarChart() {
  const [eventData, setEventData] = useState<number[]>([]);
  const [daysList, setDayList] = useState<string[]>([]);
  const [sourceEventData, setSourceEventData] = useState<
    EventsData[] | undefined
  >([]);

  const calculateEventStat = (date: StatDate) => {
    const updatedEventsData = Array(daysList.length).fill(0);

    sourceEventData?.forEach((indexEventData) => {
      const [sourceYear, sourceMonth, sourceDay] =
        indexEventData.date.split('-');
      if (
        sourceMonth === date.month &&
        parseInt(sourceYear, 10) === date.year
      ) {
        const dayIndex = parseInt(sourceDay, 10) - 1;
        updatedEventsData[dayIndex] += 1;
      }
    });

    setEventData(updatedEventsData);
  };

  useEffect(() => {
    const loadEventsData = async () => {
      try {
        const result = await getEvents();
        setSourceEventData(result);
      } catch (error) {
        console.error('Failed to fetch events data', error);
      }
    };

    function getDaysOfMonth(statDate: StatDate) {
      const { month, year } = statDate;

      const objectDayList: string[] = [];

      let daysInMonth = 0;
      if (month === '02') {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
          daysInMonth = 29;
        } else {
          daysInMonth = 28;
        }
      } else {
        if (
          month === '01' ||
          month === '03' ||
          month === '05' ||
          month === '07' ||
          month === '08' ||
          month === '10' ||
          month === '12'
        ) {
          daysInMonth = 31;
        } else {
          daysInMonth = 30;
        }
      }

      for (let day = 1; day <= daysInMonth; day++) {
        let numDay: string = day.toString();
        if (day < 10) {
          numDay = '0' + day;
        }
        const dayString = numDay + '/' + month + '/' + year;
        objectDayList.push(dayString);
      }

      setDayList(objectDayList);
    }

    loadEventsData();

    getDaysOfMonth({ month: '03', year: 2024 });
  }, []);

  useEffect(() => {
    if (sourceEventData && daysList.length > 0) {
      calculateEventStat({ month: '03', year: 2024 });
    }
  }, [sourceEventData, daysList]);

  return (
    <BarChart
      width={850}
      height={300}
      series={[
        { data: eventData, id: 'pvId', stack: 'total', color: '#7a4c83' },
      ]}
      xAxis={[{ data: daysList, scaleType: 'band' }]}
    />
  );
}
