/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle [WSL: Ubuntu]
** File description:
** tips
*/

import express, { Request, Response, Router } from "express";
const router: Router = express.Router();
import axios from "axios";
import { jwToken } from "./employees";
import { client } from "..";
import { Category } from "../config/dbClass";

router.use(express.json());


//--------------------------------------------------------------------------//
//-------------------------  FETCH FROM DATABASE  --------------------------//
//--------------------------------------------------------------------------//
router.get('/tips', (req: Request, res: Response) => {
    try {
        (async () => {
            const data: any = await client.getData(Category.Tips, {})
            console.log(`[${Date()}] : Got all tips from the database;`);
            res.status(res.statusCode).send(data);
        })()
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error)
        res.sendStatus(404).send(error);
    }
});


//--------------------------------------------------------------------------//
//-----------------------  FETCH FROM EXTERNAL API  ------------------------//
//--------------------------------------------------------------------------//
router.get('/api/tips', (req: Request, res: Response) => {
    const options = {
        method: 'GET',
        url: 'https://soul-connection.fr/api/tips',
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        }
    };
    axios.request(options)
    .then(response => {
        client.addManyDocumentInCollection(Category.Tips, response.data);
        console.log("Got the tips list!")
        res.status(response.status).send(response.data)
    })
    .catch(error => {
        console.log(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
        res.send(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
    });
});

export default router;
