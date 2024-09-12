/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** syncAPI
*/

import { Category } from "../config/dbClass";
import { client } from "..";
import axios from "axios";

export async function getJwtoken(): Promise<string> {
    const options = {
        method: 'POST',
        url: 'https://soul-connection.fr/api/employees/login/',
        headers: {
            'X-Group-Authorization': process.env.API_KEY
        },
        data: {
            "email": process.env.LOGIN,
            "password": process.env.PASSWORD
        }
    };

    try {
        const response = await axios.request(options);
        console.log(`[${Date()}] : Logged in user;`);
        const jwToken = response.data.access_token;
        return jwToken;
    } catch (error) {
        console.log(`[${Date()}] : Failed to retrieve JWT token;\n${error}`);
        throw new Error("Failed to retrieve JWT token"); 
    }
}


export async function fetchTips(jwToken: string): Promise<void> {
    const options = {
        method: 'GET',
        url: 'https://soul-connection.fr/api/tips',
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        }
    };

    axios.request(options)
    .then(response => {
        console.log(`[${Date()}] : Got the tips list!`);

        client.addManyDocumentInCollection(Category.Tips, response.data);
        console.log(`[${Date()}] : Tips successfully saved to the database!`);
    })
    .catch(error => {
        console.log(`[${Date()}] : An error occurred while fetching tips;\n${error}`, error.status);
    });
}

export async function fetchEvents(jwToken: string): Promise<void> {
    axios.request({
        method: 'GET',
        url: `https://soul-connection.fr/api/events`,
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        },
    })
    .then(response => {

        response.data.forEach((element: any) => {
            axios.request({
                method: 'GET',
                url: `https://soul-connection.fr/api/events/${element.id}`,
                headers: {
                    'X-Group-Authorization': process.env.API_KEY,
                    'Authorization': `Bearer ${jwToken}`
                }
            })
            .then(response => {
                console.log(`[${Date()}] : Got events n°${element.id} from external API;`);
                client.addDocumentInCollection(Category.Events, response.data)
            })
            .catch(error => {
                console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred on events ${element.id};`, error.status);
            });
        });
        (async () => {
            const data: any = await client.getData(
                Category.Events,
                {})
        })()
    })
    .catch(error => {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
    });
}

export async function fetchEmployees(jwToken: string): Promise<void> {
    axios.request({
        method: 'GET',
        url: 'https://soul-connection.fr/api/employees',
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        },
    })
    .then(response => {
        response.data.forEach((element: any) => {
            axios.request({
                method: 'GET',
                url: `https://soul-connection.fr/api/employees/${element.id}`,
                headers: {
                    'X-Group-Authorization': process.env.API_KEY,
                    'Authorization': `Bearer ${jwToken}`
                }
            })
            .then(response => {
                console.log(`[${Date()}] : Got employee n°${element.id} from external API;`);
                client.addDocumentInCollection(Category.Employee, response.data);
            })
            .catch(error => {
                console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred on employee ${element.id};`, error.status);
            });
        });
        (async () => {
            const data: any = await client.getData(
                Category.Employee,
                {})
        })()
    })
    .catch(error => {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
    });
}

export async function fetchCustomers(jwToken: string): Promise<void> {
    axios.request({
        method: 'GET',
        url: 'https://soul-connection.fr/api/customers',
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        },
    })
    .then(response => {

        response.data.forEach((element: any) => {
            axios.request({
                method: 'GET',
                url: `https://soul-connection.fr/api/customers/${element.id}`,
                headers: {
                    'X-Group-Authorization': process.env.API_KEY,
                    'Authorization': `Bearer ${jwToken}`
                }
            })
            .then(response => {
                console.log(`[${Date()}] : Got customer n°${element.id} from external API;`);
                client.addDocumentInCollection(Category.Customers, response.data);
            })
            .catch(error => {
                console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred on customer ${element.id};`, error.status);
                // console.log(error.response.data)
            });
        });
        (async () => {
            const data: any = await client.getData(
                Category.Customers,
                {})
                console.log(`[${Date()}] : Got all customer from the Database;`);
        })()
    })
    .catch(error => {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
    });
};

export async function fetchEncounters(jwToken: string): Promise<void> {
    axios.request({
        method: 'GET',
        url: 'https://soul-connection.fr/api/encounters',
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        },
    })
    .then(response => {

        response.data.forEach((element: any) => {
            axios.request({
                method: 'GET',
                url: `https://soul-connection.fr/api/encounters/${element.id}`,
                headers: {
                    'X-Group-Authorization': process.env.API_KEY,
                    'Authorization': `Bearer ${jwToken}`
                }
            })
            .then(response => {
                console.log(`[${Date()}] : Got encounter n°${element.id} from external API;`);
                client.addDocumentInCollection(Category.Encounters, response.data);
            })
            .catch(error => {
                console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred on encounter ${element.id};`, error.status);
            });
        });
        (async () => {
            const data: any = await client.getData(
                Category.Encounters,
                {})
        })()
    })
    .catch(error => {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
    });
};

export async function sycnAllAPI(jwToken: string) {
    fetchTips(jwToken);
    fetchEvents(jwToken);
    fetchCustomers(jwToken);
    fetchEmployees(jwToken);
    fetchEncounters(jwToken);
}