/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** profil
*/

import React, { useState } from "react";
import NavBar from "../navbar/Navbar";

const EditableImage: React.FC<{ isEditing: boolean; imageSrc: string; onImageChange: (newImage: string) => void; }> = ({ isEditing, imageSrc, onImageChange }) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageChange(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  return(
    <div className="image-container">
      {isEditing ? (<input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />) : (<img src={imageSrc} alt="Profil" className="profilPicture"/>)}
    </div>
  );
};

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

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [fields, setFields] = useState({ address: "Rue champs elysee", description: "Add a short description here", name: "Maria Anders", imageSrc: "../../../assets/survivor.jpg"});

  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleFieldChange = (field: keyof typeof fields, newValue: string) => {
    setFields((prevFields) => ({ ...prevFields, [field]: newValue }));
  };

  return (
    <>
      <NavBar/>
      <div className="container">
        <h1>PROFILE</h1>
        <EditableImage isEditing={isEditing} imageSrc={fields.imageSrc} onImageChange={(newImage) => handleFieldChange("imageSrc", newImage)}/>
        <table>
          <tbody>
            <EditableField label="Name:" value={fields.name} isEditing={isEditing} onValueChange={(newValue) => handleFieldChange('name', newValue)}/>
            <EditableField label="Address:" value={fields.address} isEditing={isEditing} onValueChange={(newValue) => handleFieldChange('address', newValue)}/>
            <EditableField label="Description:" value={fields.description} isEditing={isEditing} onValueChange={(newValue) => handleFieldChange('description', newValue)}/>
          </tbody>
        </table>
        <button onClick={handleEditClick}>
          {isEditing ? 'Enregistrer' : 'Modifier'}
        </button>
      </div>
    </>
  );
};

export default Profile;
