/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** PieChart
*/

import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 305, label: 'Dating App' },
            { id: 1, value: 102, label: 'Social Media' },
            { id: 2, value: 20, label: 'Others' },
          ],
          innerRadius: 50
        },
      ]}
      width={850}
      height={200}
    />
  );
}
