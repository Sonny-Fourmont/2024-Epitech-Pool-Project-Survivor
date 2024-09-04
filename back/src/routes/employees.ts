/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle [WSL: Ubuntu]
** File description:
** employees
*/

import express, { Request, Response, Router } from "express";
const router: Router = express.Router();
import axios from "axios";

export var jwToken: string = "";

router.post('/employees/login', (req: Request, res: Response) => {
    const options = {
        method: 'POST',
        url: 'https://soul-connection.fr/api/employees/login/',
        headers: {
            'X-Group-Authorization': process.env.API_KEY
        },
        data: req.body

    }
    try {
        axios
        .request(options)
        .then(response => {
            console.log(`[${Date()}] : Logged in user;`);
            jwToken = response.data;
            res.send(response.data).redirect(301, "/employees/me")
        })
        .catch(error => {
            console.log(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
            res.send(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
        });
    } catch (error) {
        console.log(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
        res.send(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
}
});

router.get('/employees/me', (req: Request, res: Response) => {

});


export default router;
