/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** index
*/

import 'dotenv/config';
import express, {Express, Request, Response} from "express";
const app: Express = express();
const cors = require('cors');
import bodyParser from 'body-parser';

const HOST: string = `${process.env.NODE_HOST}`;
const PORT: number = parseInt(`${process.env.NODE_PORT}`);

// Features
import { DbClient } from './config/dbClass';
import employees from './routes/employees';

export const client: DbClient = new DbClient();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', employees);

// Routes
app.get('/', (req: Request, res: Response) => {
    console.log(`[${Date()}] : User connected;`);
    res.send("");
});

// Listener
console.log("\n------------------  API IS READY !  ------------------\n");
app.listen(PORT, () => {
    console.log (`listening at http://${HOST}:${PORT}`);
});