/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** profil
*/

import React, { useState } from "react";

const EditableParagraph: React.FC<{ isEditing: boolean; text: string; onTextChange: (text: string) => void }> = ({ isEditing, text, onTextChange }) => {
  return (
    <td>
      {isEditing ? (<textarea value={text} onChange={(e) => onTextChange(e.target.value)}/>) : (text)}
    </td>
  );
};

const Profil: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>("Add a short description here");
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  return (
    <div>
      <h1>PROFIL</h1>
      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>Maria Anders</td>
          </tr>
          <tr>
            <td></td>
            <td><img src="../../../assets/survivor.jpg" alt="YouSuck" /></td>
          </tr>
          <tr>
            <td>Address:</td>
            <td>somewhere</td>
          </tr>
          <tr>
            <td>Phone number:</td>
            <td>maybe</td>
          </tr>
          <tr>
            <td>Description:</td>
            <EditableParagraph isEditing={isEditing} text={text} onTextChange={handleTextChange}/>
          </tr>
        </tbody>
      </table>
      <button onClick={handleEditClick}>{isEditing ? 'Enregistrer' : 'Modifier'}</button>
      <p>This is the about page of our application.</p>
    </div>
  );
};

export default Profil;
