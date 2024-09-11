/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle [WSL: Ubuntu]
** File description:
** deleteData
*/

import express, { Request, response, Response, Router } from "express";
import { Category } from "../config/dbClass";
const router: Router = express.Router();
import { client } from "..";

router.use(express.json());

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

export default router;