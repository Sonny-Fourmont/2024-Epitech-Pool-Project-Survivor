/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** LineChart
 */

import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const data = [300, 210, 1000];
const xLabels = ['01 Jul 2024', '15 Jul 2024', '30 Jul 2024'];

export default function SimpleLineChart() {
  return (
    <LineChart
      width={850}
      height={300}
      series={[{ data: data, area: true, color: '#7a4c83' }]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}
