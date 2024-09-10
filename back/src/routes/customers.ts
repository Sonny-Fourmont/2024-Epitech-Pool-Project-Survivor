/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle [WSL: Ubuntu]
** File description:
** customers
*/

import express, { Request, response, Response, Router } from "express";
const router: Router = express.Router();
import { jwToken } from "./employees";
import { client } from "..";
import axios from "axios";
import { Category } from "../config/dbClass";
import * as fs from 'fs';

router.use(express.json());

router.get('/customers', (req: Request, res: Response) => {
    axios.request({
        method: 'GET',
        url: 'https://soul-connection.fr/api/customers',
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        },
    })
    .then(response => {

        response.data.forEach((element: any) => {
            axios.request({
                method: 'GET',
                url: `https://soul-connection.fr/api/customers/${element.id}`,
                headers: {
                    'X-Group-Authorization': process.env.API_KEY,
                    'Authorization': `Bearer ${jwToken}`
                }
            })
            .then(response => {
                console.log(`[${Date()}] : Got customer n°${element.id} from external API;`);
                client.addDocumentInCollection(Category.Customers, response.data);
            })
            .catch(error => {
                console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred on customer ${element.id};`);
                // console.log(error.response.data)
            });
        });
        (async () => {
            const data: any = await client.getData(
                Category.Customers,
                {})
                res.status(response.status).send(data);
        })()
    })
    .catch(error => {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error.response.data)
        try {
            (async () => {
                const data: any = await client.getData(
                    Category.Customers,
                    {})
                    console.log(`[${Date()}] : Got all customer from the Database;`);
                    res.status(303).send(data);
            })()
        } catch (errorDb) {
            console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
            console.log(errorDb)
            res.status(error.response.status).send(errorDb);
        }
    });
});

router.get('/customers/:id', (req: Request, res: Response) => {
    try {
        console.log(`[${Date()}] : Got customer n°${req.params.id} from Database;`);
        (async () => {
            const data: any = await client.getData(
                Category.Customers,
                {id: parseInt(req.params.id)})
                res.status(200).send(data[0]);
        })();
    } catch(error) {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error)
        res.status(404).send(error);
    }
});

router.get('/customers/:id/image', (req: Request, res: Response) => {
    axios.request({
        method: 'GET',
        url: `https://soul-connection.fr/api/customers/${req.params.id}/image`,
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        },
        responseType: 'arraybuffer'
    })
    .then(response => {
        (async () => {
            const data: any = await client.getData(
                Category.Customers,
                {id: parseInt(req.params.id)})
                fs.writeFileSync(__dirname + `/../../../front/public/assets/${data[0].name}_${data[0].surname}.png`, response.data);
                console.log(`[${Date()}] : User connected as customer n°${req.params.id} with his image;`);
                res.status(response.status).send(response.data);
        })();
    })
    .catch(error => {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error.response.data)
        res.status(error.response.status).send(error.response.data);
    });
});

export default router;