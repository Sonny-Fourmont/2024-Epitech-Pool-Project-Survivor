/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle [WSL: Ubuntu]
** File description:
** employees
*/

import express, { Request, response, Response, Router } from "express";
const router: Router = express.Router();
import axios from "axios";
import { client } from "..";

export var jwToken: string;

router.use(express.json());

router.post('/employees/login', (req: Request, res: Response) => {
    const options = {
        method: 'POST',
        url: 'https://soul-connection.fr/api/employees/login/',
        headers: {
            'X-Group-Authorization': process.env.API_KEY
        },
        data: req.body
    }
    axios.request(options)
    .then(response => {
        console.log(`[${Date()}] : Logged in user;`);
        jwToken = response.data.access_token;
        res.sendStatus(200);
    })
    .catch(error => {
        console.log(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
        res.send(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
    });
});

router.get('/employees/me', (req: Request, res: Response) => {
    const options = {
        method: 'GET',
        url: 'https://soul-connection.fr/api/employees/me',
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        }
    };
    console.log(jwToken)
    axios.request(options)
    .then(response => {
        console.log(response.data)
        res.send(response.data)
    })
    .catch(error => {
        console.log(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
        res.send(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
    });
});

export default router;
