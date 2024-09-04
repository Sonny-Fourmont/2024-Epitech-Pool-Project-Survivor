/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** dropDownButton
*/

import React, { useState } from "react";

interface DropdownButtonProps {
  options: string[];
  onSelect: (option: string) => void;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="dropdown-container" style={{ position: "relative", display: "inline-block" }}>
      <button onClick={handleToggle} className="dropdown-button backButton">
        {selectedOption || "Select an option"}
      </button>
      {isOpen && (
        <ul className="dropdown-menu" style={{
          position: "absolute",
          top: "100%",
          left: 0,
          backgroundColor: "white",
          listStyleType: "none",
          padding: 0,
          margin: 0,
          border: "1px solid #ccc",
          width: "100%",
          zIndex: 1000,
        }}>
          {options.map((option) => (
            <li key={option} onClick={() => handleOptionClick(option)} style={{
              padding: "8px 12px",
              cursor: "pointer",
              borderBottom: "1px solid #ddd",
            }}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownButton;
