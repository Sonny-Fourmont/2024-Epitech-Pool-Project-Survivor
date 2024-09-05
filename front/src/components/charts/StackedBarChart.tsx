/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** StackedBarChart
*/

import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const data = [1, 2, 3, 1, 1, 1, 1, 3, 1, 2, 4, 3, 4, 4, 4, 4, 2, 2, 2, 1, 4, 4, 4, 3, 4, 4, 4, 4, 3, 3];
const xLabels = ['01 Jul, 2024', '02 Jul, 2024', '03 Jul, 2024', '04 Jul, 2024', '05 Jul, 2024', '06 Jul, 2024', '07 Jul, 2024', '08 Jul, 2024', '09 Jul, 2024', '10 Jul, 2024',
  '11 Jul, 2024', '12 Jul, 2024', '13 Jul, 2024', '14 Jul, 2024', '15 Jul, 2024', '16 Jul, 2024', '17 Jul, 2024', '18 Jul, 2024', '19 Jul, 2024', '20 Jul, 2024',
  '21 Jul, 2024', '22 Jul, 2024', '23 Jul, 2024', '24 Jul, 2024', '25 Jul, 2024', '26 Jul, 2024', '27 Jul, 2024', '28 Jul, 2024', '29 Jul, 2024', '30 Jul, 2024',
];

export default function StackedBarChart() {
  return (
    <BarChart
      width={850}
      height={300}
      series={[
        { data: data, id: 'pvId', stack: 'total' }
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
  );
}
