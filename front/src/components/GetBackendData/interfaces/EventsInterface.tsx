/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** EventsInterface
 */

export interface EventsData {
  id: number;
  name: string;
  date: string;
  duration: number;
  max_participants: number;
  location_x: string;
  location_y: string;
  type: string;
  employee_id: number;
  location_name: string;
}
