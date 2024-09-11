/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle [WSL: Ubuntu]
** File description:
** clothes
*/

import express, { Request, Response, Router } from "express";
const router: Router = express.Router();
import { jwToken } from "./employees";
import { client } from "..";
import axios from "axios";
import { Category } from "../config/dbClass";
import * as fs from 'fs';

router.use(express.json());

router.get('/clothes/:id/image', (req: Request, res: Response) => {
    axios.request({
        method: 'GET',
        url: `https://soul-connection.fr/api/clothes/${req.params.id}/image`,
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        },
        responseType: 'arraybuffer'
    })
    .then(response => {
        (async () => {
            const data: any = await client.getData(
                Category.CustomersClothes,
                {"body.id": parseInt(req.params.id)})
                console.log(response.data)
                fs.writeFileSync(__dirname + `/../../../front/public/assets/${data[0].body.type[0]}_${req.params.id}.png`, response.data);
                console.log(`[${Date()}] : User connected as clothes n°${req.params.id} with his image;`);
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
