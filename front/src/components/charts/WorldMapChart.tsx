/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** WorldMapChart
*/

import WorldMap from 'react-svg-worldmap';

const WorldMapChart = () => {

  const data = [
    { country: "cn", value: 50 }, // china
    { country: "in", value: 13 }, // india
    { country: "us", value: 90 }, // united states
    { country: "id", value: 3 }, // indonesia
    { country: "pk", value: 14 }, // pakistan
    { country: "br", value: 33 }, // brazil
    { country: "ng", value: 21 }, // nigeria
    { country: "bd", value: 11 }, // bangladesh
    { country: "ru", value: 89 }, // russia
    { country: "mx", value: 19 }, // mexico
  ];

  return (
    <WorldMap
        color="purple"
        valueSuffix="customers"
        size="lg"
        data={data}
    />
  );
};

export default WorldMapChart;