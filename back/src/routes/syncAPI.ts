/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** syncAPI
*/

import express, { Router } from "express";
import { Category } from "../config/dbClass";
const router: Router = express.Router();
import { client } from "..";
import axios from "axios";

export async function getJwtoken(): Promise<any> {
    const options = {
        method: 'POST',
        url: 'https://soul-connection.fr/api/employees/login/',
        headers: {
            'X-Group-Authorization': process.env.API_KEY
        },
        data: {
            "email": process.env.LOGIN,
            "password": process.env.PASSWORD
        }
    };

    axios.request(options)
    .then(response => {
        console.log(`[${Date()}] : Logged in user;`);
        const jwToken = response.data.access_token;
        return jwToken;
    })
    .catch(error => {
        console.log(`[${Date()}] : Failed to retrieve JWT token;\n${error}`);
    });
}


export async function fetchTips(jwToken: string): Promise<void> {
    const options = {
        method: 'GET',
        url: 'http://localhost:3001/tips',
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        }
    };

    axios.request(options)
    .then(response => {
        console.log(`[${Date()}] : Got the tips list!`);

         client.addManyDocumentInCollection(Category.Tips, response.data);
        console.log(`[${Date()}] : Tips successfully saved to the database!`);
    })
    .catch(error => {
        console.log(`[${Date()}] : An error occurred while fetching tips;\n${error}`);
    });
}