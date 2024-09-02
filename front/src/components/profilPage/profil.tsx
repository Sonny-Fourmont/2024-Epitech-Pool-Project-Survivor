/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** profil
*/

import React, { useState } from "react";

const EditableField: React.FC<{label: string; value: string; isEditing: boolean; onValueChange: (newValue: string) => void;}> = ({ label, value, isEditing, onValueChange }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>
        {isEditing ? (<textarea value={value} onChange={(e) => onValueChange(e.target.value)}/>) : (value)}
      </td>
    </tr>
  );
};

const Profil: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [fields, setFields] = useState({ address: "Rue champs elysee", description: "Add a short description here", name: "Maria Anders"});
  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
  };
  const handleFieldChange = (field: keyof typeof fields, newValue: string) => {
    setFields((prevFields) => ({ ...prevFields, [field]: newValue }));
  };

  return (
    <div>
      <h1>PROFIL</h1>
      <table>
        <tbody>
          <EditableField label="Name:" value={fields.name} isEditing={isEditing} onValueChange={(newValue) => handleFieldChange('name', newValue)}/>
          <tr>
            <td></td>
            <td><img src="../../../assets/survivor.jpg" alt="YouSuck" /></td>
          </tr>
          <EditableField label="Address:" value={fields.address} isEditing={isEditing} onValueChange={(newValue) => handleFieldChange('address', newValue)}/>
          <EditableField label="Description:" value={fields.description} isEditing={isEditing} onValueChange={(newValue) => handleFieldChange('description', newValue)}/>
        </tbody>
      </table>
      <button onClick={handleEditClick}>
        {isEditing ? 'Enregistrer' : 'Modifier'}
      </button>
    </div>
  );
};

export default Profil;
