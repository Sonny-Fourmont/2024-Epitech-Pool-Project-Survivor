/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** auth
*/

export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('sessionToken');
};

export const setAuthenticated = (value: boolean): void => {
    if (value) {
        localStorage.setItem('isAuthenticated', 'true');
    } else {
        localStorage.removeItem('isAuthenticated');
    }
};
