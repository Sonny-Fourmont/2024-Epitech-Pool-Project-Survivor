/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle [WSL: Ubuntu]
** File description:
** dbClass
*/

import { MongoClient, Db } from "mongodb";

export enum Category {
    Employee = "Employee",
    Customers = "Customers",
    Encounters = "Encounters",
    Tips = "Tips",
    Events = "Events",
    Clothes = "Clothes"
}

export class DbClient {
    private client: MongoClient = new MongoClient(`${process.env.DB_LINK}`);
    private db: Db = this.client.db(process.env.DB_NAME);

    private async initDb() : Promise<void> {
        try {
            await this.client.connect();
            console.log(`[${Date()}] : Database connected!;`);
        } catch (error) {
            console.log(`[${Date()}] : A error occured in database connection!;\n${error}`);
        }
    };

    async addDocumentInCollection(collection: Category, document: any) : Promise<boolean> {
        const myDoc = await this.db.collection(collection).findOne(document);
        if (myDoc) {
            console.log(`[${Date()}] : Document has already been created!;`);
            return false;
        }

        try {
            await this.db.collection(collection).insertOne(document);
            console.log(`[${Date()}] : Document has been created!;`);
            return true;
        } catch (error) {
            console.log(`[${Date()}] : A error occured in the Document creation!;\n${error}`);
            return false;
        }
    };

    async addManyDocumentInCollection(collection: Category, document: any) : Promise<boolean> {
        const myDoc: any = await this.db.collection(collection).find().toArray();

        if (myDoc[0] == undefined) {
            try {
                await this.db.collection(collection).insertMany(document);
                console.log(`[${Date()}] : Document has been created!;`);
                return true;
            } catch (error) {
                console.log(`[${Date()}] : A error occured in the Document creation!;\n${error}`);
                return false;
            }
        }
        for (var element of myDoc) {
            var myElem: any = this.db.collection(collection).findOne(element);
            if (myElem) {
                console.log(`[${Date()}] : Document has already been created!;`);
            } else {
                try {
                    await this.db.collection(collection).insertOne(document);
                    console.log(`[${Date()}] : Document has been created!;`);
                } catch (error) {
                    console.log(`[${Date()}] : A error occured in the Document creation!;\n${error}`);
                }
            }
        }
        return true;
    };

    async deleteDocumentInCollection(collection: Category, document: any) : Promise<boolean> {
        const myDoc = await this.db.collection(collection).findOne(document);
        if (myDoc) {
            await this.db.collection(collection).deleteOne(document);
            console.log(`[${Date()}] : Document has been deleted!;`);
            return true;
        } else {
            console.log(`[${Date()}] : This document doesn't exist!;`);
            return false;
        }
    };

    async replaceDocumentInCollection(collection: Category, documentToChange: any, newDocument: any) : Promise<boolean> {
        const myDoc = await this.db.collection(collection).findOne(documentToChange);
        if (myDoc) {
            await this.db.collection(collection).replaceOne(documentToChange, newDocument);
            console.log(`[${Date()}] : Document has been replaced!;`);
            return true;
        } else {
            console.log(`[${Date()}] : This document doesn't exist!;`);
            return false;
        }
    };

    async updateDocumentInCollection(collection: Category, documentToChange: any, newDocument: any) : Promise<boolean> {
        const myDoc = await this.db.collection(collection).findOne(documentToChange);
        if (myDoc) {
            await this.db.collection(collection).updateOne(documentToChange, newDocument);
            console.log(`[${Date()}] : Document has been updated!;`);
            return true;
        } else {
            console.log(`[${Date()}] : This document doesn't exist!;`);
            return false;
        }
    };

    async getData(collection: Category, document: any) : Promise<any> {
        const myDoc = await this.db.collection(collection).find(document).toArray();
        if (myDoc) {
            console.log(`[${Date()}] : Document found!;`);
            return myDoc;
        } else {
            console.log(`[${Date()}] : Document not found!;`);
            return undefined;
        }
    };

    constructor() {
        this.initDb();
    };
}
