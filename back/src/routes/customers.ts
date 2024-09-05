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
import { Category } from "../config/dbClass";

router.use(express.json());

router.get('/customers', (req: Request, res: Response) => {
    const options = {
        method: 'GET',
        url: 'https://soul-connection.fr/api/customers',
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        },
    }

    axios.request(options)
    .then(response => {
        console.log(`[${Date()}] : User connected as customer;`);
        client.addManyDocumentInCollection(Category.Customers, response.data);
        res.status(response.status).send(response.data);
    })
    .catch(error => {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error.response.data)
        res.status(error.response.status).send(error.response.data);
    });
});


router.get('/customers/:id', (req: Request, res: Response) => {
    const options = {
        method: 'GET',
        url: `https://soul-connection.fr/api/customers/${req.params.id}`,
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        },
    }

    axios.request(options)
    .then(response => {
        console.log(`[${Date()}] : User connected as customer n°${req.params.id};`);
        client.addDocumentInCollection(Category.Customers, response.data);
        res.status(response.status).send(response.data);
    })
    .catch(error => {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error.response.data)
        res.status(error.response.status).send(error.response.data);
    });
});

export default router;