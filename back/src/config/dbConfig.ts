/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** dbConfig
*/

import { Collection, Db, MongoClient, ObjectId } from "mongodb";

export async function initDb() {
    const client: MongoClient = new MongoClient(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`);
    try {
        await client.connect();
        const db: Db = client.db(process.env.DB_NAME);
    } finally {
        await client.close();
    };
};
