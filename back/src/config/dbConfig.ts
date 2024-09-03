/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** dbConfig
*/

import { MongoClient } from "mongodb";

export const client: MongoClient = new MongoClient(`${process.env.DB_LINK}`);
export async function initDb() : Promise<void> {
    try {
        await client.connect();
        console.log(`[${Date()}] : Database connected!;`);
    } catch (error) {
        console.log(`[${Date()}] : A error occured in database connection!;`);
    }
};
