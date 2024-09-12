/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** EncounterInterface
 */

export interface EncounterData {
  id: number;
  customer_id: number;
  date: string;
  rating: number;
  comment: string;
  source: string;
}
