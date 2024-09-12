/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle [WSL: Ubuntu]
** File description:
** events
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
router.get('/events', (req: Request, res: Response) => {
    try {
        (async () => {
            const data: any = await client.getData(Category.Events, {})
            console.log(`[${Date()}] : Got all events from the database;`);
            res.status(res.statusCode).send(data);
        })()
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error)
        res.sendStatus(404).send(error);
    }
});

router.get('/events/:id', (req: Request, res: Response) => {
    try {
        console.log(`[${Date()}] : Got events n°${req.params.id} from Database;`);
        (async () => {
            const data: any = await client.getData(Category.Events, {id: parseInt(req.params.id)});
            res.status(200).send(data[0]);
        })();
    } catch(error) {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error)
        res.status(404).send(error);
    }
});


//--------------------------------------------------------------------------//
//-----------------------  FETCH FROM EXTERNAL API  ------------------------//
//--------------------------------------------------------------------------//
router.get('/api/events', (req: Request, res: Response) => {
    axios.request({
        method: 'GET',
        url: 'https://soul-connection.fr/api/events',
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        },
    })
    .then(response => {

        response.data.forEach((element: any) => {
            axios.request({
                method: 'GET',
                url: `https://soul-connection.fr/api/events/${element.id}`,
                headers: {
                    'X-Group-Authorization': process.env.API_KEY,
                    'Authorization': `Bearer ${jwToken}`
                }
            })
            .then(response => {
                console.log(`[${Date()}] : Got events n°${element.id} from external API;`);
                client.addDocumentInCollection(Category.Events, response.data);
            })
            .catch(error => {
                console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred on employee ${element.id};`);
                // console.log(error.response.data)
            });
        });
        (async () => {
            const data: any = await client.getData(
                Category.Events,
                {})
                res.status(response.status).send(data);
        })()
    })
    .catch(error => {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        // console.log(error.response.data)
        res.send(error.response);
    });
});

export default router;
