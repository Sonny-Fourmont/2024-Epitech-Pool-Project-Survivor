/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** dbConfig
*/

import { Collection, Db, MongoClient } from "mongodb";

export async function initDb() {
    const client: MongoClient = new MongoClient(`${process.env.DB_LINK}`);
    try {
        await client.connect();
        const db: Db = client.db(process.env.DB_NAME);
        console.log(`[${Date()}] : Database connected!;`);
        if (!await createInitCollection(db))
            console.log(`[${Date()}] : Database init already completed!;`);
        else
            console.log(`[${Date()}] : Database init completed!;`);
    } catch (error) {
        console.log(`[${Date()}] : A error occured in database connection!;`);
    } finally {
        await client.close();
    };
};

async function doesAlreadyInit(collection: Collection) : Promise<boolean> {
    try {
      const document = await collection.findOne({init: "init"});
      return !!document;
    } catch (error) {
      console.error(error);
      return false;
    }
}
export async function createInitCollection(db: Db) : Promise<boolean> {
    const initCollection: Collection = db.collection("Init");
    const initExist = await doesAlreadyInit(initCollection);
    if (initExist) {
        console.log(`[${Date()}] : Database init collection already completed!;`);
        return false;
    } else {
        await initCollection.insertOne({
            init: "init",
        });
        console.log(`[${Date()}] : Database init collection completed!;`);
    }
    return true;
};
