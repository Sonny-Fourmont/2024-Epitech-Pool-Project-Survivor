/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle [WSL: Ubuntu]
** File description:
** encounters
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
router.get('/encounters', (req: Request, res: Response) => {
    try {
        (async () => {
            const data: any = await client.getData(Category.Encounters, {})
            console.log(`[${Date()}] : Got all encounters from the database;`);
            res.status(res.statusCode).send(data);
        })()
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error)
        res.status(404).send(error);
    }
});

router.get('/encounters/:id', (req: Request, res: Response) => {
    try {
        (async () => {
            const data: any = await client.getData(Category.Encounters, {id: parseInt(req.params.id)});
            console.log(`[${Date()}] : Got encounter n°${req.params.id} from Database;`);
            res.status(res.statusCode).send(data[0]);
        })();
    } catch(error: any) {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error)
        res.status(404).send(error);
    }
});

router.get('/encounters/customer/:id', (req: Request, res: Response) => {
    try {
        (async () => {
            const data: any = await client.getData(Category.Encounters, {customer_id: parseInt(req.params.id)});
            console.log(`[${Date()}] : Got customer's n°${req.params.id} encounters from Database;`);
            res.status(res.statusCode).send(data);
        })();
    } catch (error: any) {
    }
});


//--------------------------------------------------------------------------//
//-----------------------  FETCH FROM EXTERNAL API  ------------------------//
//--------------------------------------------------------------------------//

router.get('/api/encounters', (req: Request, res: Response) => {
    axios.request({
        method: 'GET',
        url: 'https://soul-connection.fr/api/encounters',
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        },
    })
    .then(response => {

        response.data.forEach((element: any) => {
            axios.request({
                method: 'GET',
                url: `https://soul-connection.fr/api/encounters/${element.id}`,
                headers: {
                    'X-Group-Authorization': process.env.API_KEY,
                    'Authorization': `Bearer ${jwToken}`
                }
            })
            .then(response => {
                console.log(`[${Date()}] : Got encounter n°${element.id} from external API;`);
                client.addDocumentInCollection(Category.Encounters, response.data);
            })
            .catch(error => {
                console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred on encounter ${element.id};`);
                // console.log(error.response.data)
            });
        });
        (async () => {
            const data: any = await client.getData(
                Category.Encounters,
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

router.get('/api/encounters/customer/:id', (req: Request, res: Response) => {
    const options = {
        method: 'GET',
        url: `https://soul-connection.fr/api/encounters/customer/${req.params.id}`,
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        }
    };
    axios.request(options)
    .then(response => {
        console.log(`[${Date()}] : Get encounters of encounters n°${req.params.id};`);
        client.addManyDocumentInCollection(Category.Encounters, response.data);
        res.status(response.status).send(response.data)
    })
    .catch(error => {
        console.log(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
        res.send(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
    });
});

export default router;
