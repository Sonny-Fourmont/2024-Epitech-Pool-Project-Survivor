/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle [WSL: Ubuntu]
** File description:
** customers
*/

import express, { Request, Response, Router } from "express";
const router: Router = express.Router();
import { jwToken } from "./employees";
import { client } from "..";
import axios from "axios";

router.use(express.json());

router.get('/customers', (req: Request, res: Response) => {
    console.log(req.body)
    const options = {
        method: 'GET',
        url: 'https://soul-connection.fr/api/customers',
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        },
    }

    try {
        axios.request(options)
        .then(response => {
            console.log(`[${Date()}] : user connected for Customer;`);
            res.send(response.data);
        })
        .catch(error => {
            console.log(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
            res.send(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
        });
    } catch (error) {
        console.log(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
        res.send(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
    }
});

export default router;