/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** StackedBarChart
 */

import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { EventsData } from '../GetBackendData/interfaces/EventsInterface';
import { getDaysOfMonth, StatDate } from '../Tools/getDaysOfMont';

type StackedBarChartProps = {
  sourceEventData: EventsData[] | undefined;
};

export default function StackedBarChart({
  sourceEventData,
}: StackedBarChartProps) {
  const [eventData, setEventData] = useState<number[]>([]);
  const [daysList, setDayList] = useState<string[]>([]);

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
    setDayList(getDaysOfMonth({ month: '03', year: 2024 }));
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
