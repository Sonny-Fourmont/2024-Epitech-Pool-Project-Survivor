/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle [WSL: Ubuntu]
** File description:
** employees
*/

import express, { Request, Response, Router } from "express";
const router: Router = express.Router();
import axios from "axios";
import { client } from "..";
import { Category } from "../config/dbClass";
import * as fs from 'fs';

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

router.get('/employees', (req: Request, res: Response) => {
    axios.request({
        method: 'GET',
        url: 'https://soul-connection.fr/api/employees',
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        },
    })
    .then(response => {

        response.data.forEach((element: any) => {
            axios.request({
                method: 'GET',
                url: `https://soul-connection.fr/api/employees/${element.id}`,
                headers: {
                    'X-Group-Authorization': process.env.API_KEY,
                    'Authorization': `Bearer ${jwToken}`
                }
            })
            .then(response => {
                console.log(`[${Date()}] : Got employee n°${element.id} from external API;`);
                client.addDocumentInCollection(Category.Employee, response.data);
            })
            .catch(error => {
                console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred on employee ${element.id};`);
                // console.log(error.response.data)
            });
        });
        (async () => {
            const data: any = await client.getData(
                Category.Employee,
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

router.get('/employees/:id', (req: Request, res: Response) => {
    try {
        console.log(`[${Date()}] : Got employee n°${req.params.id} from Database;`);
        (async () => {
            const data: any = await client.getData(
                Category.Employee,
                {id: parseInt(req.params.id)})
                res.status(200).send(data[0]);
        })();
    } catch(error) {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error)
        res.status(404).send(error);
    }
});

router.get('/employees/:id/image', (req: Request, res: Response) => {
    axios.request({
        method: 'GET',
        url: `https://soul-connection.fr/api/employees/${req.params.id}/image`,
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        },
        responseType: 'arraybuffer'
    })
    .then(response => {
        (async () => {
            const data: any = await client.getData(
                Category.Employee,
                {id: parseInt(req.params.id)})
                fs.writeFileSync(__dirname + `/../../../front/public/assets/${data[0].name}_${data[0].surname}.png`, response.data);
                console.log(`[${Date()}] : User connected as employee n°${req.params.id} with his image;`);
                res.status(response.status).send(response.data);
        })();
    })
    .catch(error => {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error.response.data)
        res.status(error.response.status).send(error.response.data);
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
        console.log(`[${Date()}] : Get employee n°${req.params.id};`);
        client.addDocumentInCollection(Category.Employee, response.data);
        res.status(response.status).send(response.data)
    })
    .catch(error => {
        console.log(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
        res.send(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
    });
});

export default router;
