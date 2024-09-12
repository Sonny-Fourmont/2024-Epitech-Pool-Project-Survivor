/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle [WSL: Ubuntu]
** File description:
** employees
*/

import express, { Request, Response, Router } from "express";
const router: Router = express.Router();
import axios from "axios";
import { client, bcrypt, token } from "..";
import { Category } from "../config/dbClass";
import * as fs from 'fs';

export var jwToken: string = token;

router.use(express.json());

router.post('/employees/login', (req: Request, res: Response) => {
    const options = {
        method: 'POST',
        url: 'https://soul-connection.fr/api/employees/login/',
        headers: {
            'X-Group-Authorization': process.env.API_KEY
        },
        data: req.body
    }
    axios.request(options)
    .then(response => {
        console.log(`[${Date()}] : Logged in user;`);
        jwToken = response.data.access_token;
        res.sendStatus(200);
    })
    .catch(error => {
        if (error.status == 401) {
            (async () => {
                const data: any = await client.getData(Category.Employee, {
                    "email": `${req.body.email}`
                });
                return bcrypt.compare(req.body.password, data[0].password, (err: Error, result: string) => {
                    if (err) {
                        console.log(`[${Date()}] : Error comparing passwords;`);
                        console.log(err);
                        return res.status(401).send(err);
                    }
                    if (result) {
                        console.log(`[${Date()}] : Passwords match! User authenticated;`);
                        return res.sendStatus(200);
                    } else {
                        console.log(`[${Date()}] : Passwords do not match! Authentication failed;`);
                        return res.sendStatus(401);
                    }
                });
            })();
        } else {
            console.log(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
            res.send(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
        }
    });
});


//--------------------------------------------------------------------------//
//-------------------------  FETCH FROM DATABASE  --------------------------//
//--------------------------------------------------------------------------//
router.post('/employees/register', (req: Request, res: Response) => {
    bcrypt.hash(req.body.password, process.env.HASH_KEY, (err: Error, hash: string) => {
        if (err) {
            console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
            console.log(err);
            res.status(400).send(err);
        }
        console.log(`[${Date()}] : Password has been hashed!;`);

        (async () => {
            var id: number = 0;
            const data: any = await client.getData(Category.Employee, {});
            for (var element of data) {
                if (id < element.id)
                    id = element.id;
                if (req.body.email == element.email) {
                    console.log(`[${Date()}] : Employee already exists!;`)
                    return res.send('Employee already exists!;')
                }
            }

            const employeeDoc: any = {
                id: (id + 1),
                email: req.body.email,
                password: hash,
                name: req.body.name,
                surname: req.body.surname,
                birth_date: req.body.birth_date,
                gender: req.body.gender,
                work: req.body.work
            };

            client.addDocumentInCollection(Category.Employee, employeeDoc)
            res.sendStatus(200);
        })();
    })
});

router.get('/employees', (req: Request, res: Response) => {
    try {
        (async () => {
            const data: any = await client.getData(Category.Employee, {})
            console.log(`[${Date()}] : Got all employees from the database;`);
            res.status(res.statusCode).send(data);
        })()
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error)
        res.status(404).send(error);
    }
});

router.get('/employees/:id', (req: Request, res: Response) => {
    try {
        (async () => {
            const data: any = await client.getData(Category.Employee, {id: parseInt(req.params.id)});
            console.log(`[${Date()}] : Got employee n°${req.params.id} from Database;`);
            res.status(200).send(data[0]);
        })();
    } catch(error) {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error)
        res.status(404).send(error);
    }
});


//--------------------------------------------------------------------------//
//-----------------------  FETCH FROM EXTERNAL API  ------------------------//
//--------------------------------------------------------------------------//
router.get('/api/employees', (req: Request, res: Response) => {
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
                console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred on employee ${element.id};`);
                // console.log(error.response.data)
            });
        });
        (async () => {
            const data: any = await client.getData(
                Category.Employee,
                {})
                res.status(response.status).send(data);
        })()
    })
    .catch(error => {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        // console.log(error.response.data)
        res.send(error.response);
    });
});

router.get('/api/employees/:id/image', (req: Request, res: Response) => {
    axios.request({
        method: 'GET',
        url: `https://soul-connection.fr/api/employees/${req.params.id}/image`,
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        },
        responseType: 'arraybuffer'
    })
    .then(response => {
        (async () => {
            const data: any = await client.getData(
                Category.Employee,
                {id: parseInt(req.params.id)})
                fs.writeFileSync(__dirname + `/../../../front/public/assets/${data[0].name}_${data[0].surname}.png`, response.data);
                console.log(`[${Date()}] : User connected as employee n°${req.params.id} with his image;`);
                res.status(response.status).send(response.data);
        })();
    })
    .catch(error => {
        console.log('\x1b[31m%s\x1b[0m', `[${Date()}] : An error occurred;`);
        console.log(error.response.data)
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/api/employees/me', (req: Request, res: Response) => {
    const options = {
        method: 'GET',
        url: 'https://soul-connection.fr/api/employees/me',
        headers: {
            'X-Group-Authorization': process.env.API_KEY,
            'Authorization': `Bearer ${jwToken}`
        }
    };
    axios.request(options)
    .then(response => {
        console.log(`[${Date()}] : Get employee n°${req.params.id};`);
        client.addDocumentInCollection(Category.Employee, response.data);
        res.status(response.status).send(response.data)
    })
    .catch(error => {
        console.log(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
        res.send(`[${Date()}] : An error occurred, please try again with correct information;\n${error}`);
    });
});

export default router;
