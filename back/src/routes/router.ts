/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** router
*/

import express, {Request, Response, Router} from "express";
const router: Router = express.Router();

router.get('/test', (req: Request, res: Response) => {
    res.send(`[${Date()}] : User connected;`);
});

export default router;
