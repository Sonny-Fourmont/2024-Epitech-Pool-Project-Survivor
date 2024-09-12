/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle [WSL: Ubuntu]
** File description:
** customers
*/

import express, { Request, Response, Router } from "express";
import { Category } from "../config/dbClass";
const router: Router = express.Router();
import { jwToken } from "./employees";
import { client } from "..";
import axios from "axios";
import * as fs from 'fs';

router.use(express.json());


//--------------------------------------------------------------------------//
//-------------------------  FETCH FROM DATABASE  --------------------------//
//--------------------------------------------------------------------------//
router.post('/customers/register', (req: Request, res: Response) => {
    (async () => {
        var id: number = 0;
        const data: any = await client.getData(Category.Customers, {});
        for (var element of data) {
            if (id < element.id)
                id = element.id;
            if (req.body.email == element.email) {
                console.log(`[${Date()}] : Customer already exists!;`)
                return res.send('Customer already exists!;')
            }
        }

        const customerDoc: any = {
            id: (id + 1),
            email: req.body.email,
            name: req.body.name,
            surname: req.body.surname,
            birth_date: req.body.birth_date,
            gender: req.body.gender,
            description: req.body.description,
            astrological_sign: req.body.astrological_sign,
            phone_number: req.body.phone_number,
            address: req.body.address
        };

        client.addDocumentInCollection(Category.Customers, customerDoc)
        console.log(`[${Date()}] : Customer has been created!;`)
        res.sendStatus(200);
    })();
});

router.get('/customers', (req: Request, res: Response) => {
    try {
        (async () => {
            const data: any = await client.getData(Category.Customers, {})
            console.log(`[${Date()}] : Got all customer from the database;`);
            res.status(res.statusCode).send(data);
        })()
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error)
        res.status(404).send(error);
    }
});

router.get('/customers/:id', (req: Request, res: Response) => {
    try {
        (async () => {
            const data: any = await client.getData(Category.Customers, {id: parseInt(req.params.id)});
            console.log(`[${Date()}] : Got customer n°${req.params.id} from database;`);
            res.status(200).send(data[0]);
        })();
    } catch(error: any) {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error)
        res.status(404).send(error);
    }
});

router.get('/customers/:id/payments_history', (req: Request, res: Response) => {
    try {
        (async () => {
            const data: any = await client.getData(
                Category.CustomersPayments,
                {customerId: parseInt(req.params.id)})
                console.log(`[${Date()}] : Got customer's n°${req.params.id} payments history from Database;`);
                res.status(res.statusCode).send(data);
        })();
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error)
        res.status(404).send(error);
    }
});

router.get('/customers/:id/clothes', (req: Request, res: Response) => {
    try {
        (async () => {
            const data: any = await client.getData(
                Category.CustomersClothes,
                {customerId: parseInt(req.params.id)})
                console.log(`[${Date()}] : Got customer's n°${req.params.id} clothes from Database;`);
                res.status(res.statusCode).send(data);
        })();
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error)
        res.status(404).send(error);
    }
});

router.delete('/customers/delete/:id', (req: Request, res: Response) => {
    try {
        (async () => {
            const data: any = await client.getData(
                Category.Customers,
                {id: parseInt(req.params.id)})
                console.log(data)
                client.deleteDocumentInCollection(Category.Customers, data[0])
                res.send(data);
        })();
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        res.send(`[${Date()}] : An error occurred, please try again with correct information or ;\n${error}`);
    }
});


//--------------------------------------------------------------------------//
//-----------------------  FETCH FROM EXTERNAL API  ------------------------//
//--------------------------------------------------------------------------//
router.get('/api/customers', (req: Request, res: Response) => {
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
            // console.log(errorDb)
            res.status(error.response.status).send(errorDb);
        }
    });
});

router.get('/api/customers/:id/image', (req: Request, res: Response) => {
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
                console.log(`[${Date()}] : Got customer's n°${req.params.id} profil picture;`);
                res.status(response.status).send(response.data);
        })();
    })
    .catch(error => {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error.response.data)
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/api/customers/:id/payments_history', (req: Request, res: Response) => {
    axios.request({
        method: 'GET',
        url: `https://soul-connection.fr/api/customers/${req.params.id}/payments_history`,
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        }
    })
    .then(response => {
        console.log(`[${Date()}] : Got customer's n°${req.params.id} payments history from external API;`);
        for (var body of response.data) {
            const result: any = {body, customerId: parseInt(req.params.id)};
            client.addDocumentInCollection(Category.CustomersPayments, result);
        };
        (async () => {
            const data: any = await client.getData(
                Category.CustomersPayments,
                {customerId: parseInt(req.params.id)})
                console.log(`[${Date()}] : Got customer's n°${req.params.id} payments history from Database;`);
                res.status(response.status).send(data);
        })();
    })
    .catch(error => {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error.response.data)
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/api/customers/:id/clothes', (req: Request, res: Response) => {
    axios.request({
        method: 'GET',
        url: `https://soul-connection.fr/api/customers/${req.params.id}/clothes`,
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        }
    })
    .then(response => {
        console.log(`[${Date()}] : Got customer's n°${req.params.id} clothes from external API;`);
        for (var body of response.data) {
            const result: any = {body, customerId: parseInt(req.params.id)};
            client.addDocumentInCollection(Category.CustomersClothes, result);
        };
        (async () => {
            const data: any = await client.getData(
                Category.CustomersClothes,
                {customerId: parseInt(req.params.id)})
                console.log(`[${Date()}] : Got customer's n°${req.params.id} clothes from Database;`);
                res.status(response.status).send(data);
        })();
    })
    .catch(error => {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error.response.data)
        res.status(error.response.status).send(error.response.data);
    });
});

export default router;