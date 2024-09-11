/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle [WSL: Ubuntu]
** File description:
** delete
*/

import express, { Request, Response, Router } from "express";
import { Category } from "../config/dbClass";
const router: Router = express.Router();
import { jwToken } from "./employees";
import { client } from "..";
import axios from "axios";

router.use(express.json());

router.delete('/customers/delete/:id', (req: Request, res: Response) => {
    try {
        try {
            console.log(`[${Date()}] : Got customer n°${element.id} from external API;`);
            client.addDocumentInCollection(Category.Customers, response.data);
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred on customer ${element.id};`);
            // console.log(error.response.data)
        }
        (async () => {
            const data: any = await client.getData(
                Category.Customers,
                {})
                res.status(response.status).send(data);
        })()
        
    } catch (error) {
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
    }
});

export default router;