/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** PaymentCustomerInterface
 */

export interface PaymentCustomerData {
  body: {
    date: string;
    payment_method: string;
    amount: number;
    comment: string;
  };
  id: number;
}
