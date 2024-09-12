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
import { getJwtoken, fetchTips, fetchEvents, fetchEmployees, fetchCustomers, fetchEncounters } from './routes/syncAPI';
export const bcrypt = require('bcrypt')
export var token: string;

const HOST: string = `${process.env.NODE_HOST}`;
const PORT: number = parseInt(`${process.env.NODE_PORT}`);

async function startInterval() {
    
    const oneHour: number = 1000 * 60 * 60
    try {
        token = await getJwtoken();

        await fetchEncounters(token);
        setInterval(async () => {
            console.log("Start data");
            try {
                await fetchEncounters(token);
                console.log("syncing data OK");
            } catch (error) {
                console.log("syncing data error", error);
            }
        }, 10000);
    } catch (error) {
        console.log("Failed to start interval due to token retrieval error:", error);
        token = "";
    }
}

// Features
import { DbClient } from './config/dbClass';
import employees from './routes/employees';
import events from './routes/events';
import encounters from './routes/encounters'
import customers from './routes/customers';
import tips from './routes/tips';
import clothes from './routes/clothes';
import { on } from 'events';

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