/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** LineChart
 */

import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const fakeJoiningData = [
  5, 2, 4, 1, 1, 6, 3, 1, 10, 3, 7, 1, 8, 9, 4, 5, 1, 4, 9, 3, 6, 8, 4, 6, 3,
  10, 6, 7, 6, 8, 2,
];
const xLabels = [
  '01 Jul, 2023',
  '02 Jul, 2023',
  '03 Jul, 2023',
  '04 Jul, 2023',
  '05 Jul, 2023',
  '06 Jul, 2023',
  '07 Jul, 2023',
  '08 Jul, 2023',
  '09 Jul, 2023',
  '10 Jul, 2023',
  '11 Jul, 2023',
  '12 Jul, 2023',
  '13 Jul, 2023',
  '14 Jul, 2023',
  '15 Jul, 2023',
  '16 Jul, 2023',
  '17 Jul, 2023',
  '18 Jul, 2023',
  '19 Jul, 2023',
  '20 Jul, 2023',
  '21 Jul, 2023',
  '22 Jul, 2023',
  '23 Jul, 2023',
  '24 Jul, 2023',
  '25 Jul, 2023',
  '26 Jul, 2023',
  '27 Jul, 2023',
  '28 Jul, 2023',
  '29 Jul, 2023',
  '30 Jul, 2023',
  '31 Jul, 2023',
];

export default function SimpleLineChart() {
  return (
    <LineChart
      width={850}
      height={300}
      series={[{ data: fakeJoiningData, area: true, color: '#7a4c83' }]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}
