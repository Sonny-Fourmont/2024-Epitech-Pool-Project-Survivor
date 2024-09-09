/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** MultiSelectDropdown
*/

import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const MultiSelectDropdown: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState([]);
  const clientList = [
    { label: "Client 1", value: "client1" },
    { label: "Client 2", value: "client2" },
    { label: "Client 3", value: "client3" }
  ];

  return (
    <MultiSelect
    options={clientList}
    value={selectedClient}
    onChange={setSelectedClient}
    labelledBy='Choose your clients'
    />
  )
}

export default MultiSelectDropdown;