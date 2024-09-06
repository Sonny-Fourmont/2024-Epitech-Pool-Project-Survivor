/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** customersInterface
*/

export interface CustomerData {
    _id: number;
    id: number;
    email: string;
    name: string;
    surname: string;
    birth_date: string;
    gender: string;
    description: string;
    astrological_sign: string;
    phone_number: string;
    address: string;
}
