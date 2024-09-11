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
import { getJwtoken, fetchTips } from './routes/syncAPI';
export const bcrypt = require('bcrypt')

const HOST: string = `${process.env.NODE_HOST}`;
const PORT: number = parseInt(`${process.env.NODE_PORT}`);

async function startInterval() {
    const oneHour = 1000 * 60 * 60
    const token = (await getJwtoken())

    setInterval(() => {
        console.log("Start data");
        fetchTips(token)
        .then(() => console.log("Database OK"))
        .catch((error: Error) => console.log("Database error", error))
    }, oneHour)
}

// Features
import { DbClient } from './config/dbClass';
import employees from './routes/employees';
import events from './routes/events';
import encounters from './routes/encounters'
import customers from './routes/customers';
import tips from './routes/tips';
import clothes from './routes/clothes';

export const client: DbClient = new DbClient();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', employees, events, encounters, customers, tips, clothes);

// Routes
app.get('/', (req: Request, res: Response) => {
    console.log(`[${Date()}] : User connected;`);
    res.sendStatus(200);
});

// Listener
console.log("\n------------------  API IS READY !  ------------------\n");
app.listen(PORT, () => {
    console.log (`listening at http://${HOST}:${PORT}`);
    startInterval();
});