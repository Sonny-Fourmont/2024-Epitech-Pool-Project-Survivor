/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** getDaysOfMont
 */

export type StatDate = {
  month: string;
  year: number;
};

export function getDaysOfMonth(statDate: StatDate): string[] {
  const { month, year } = statDate;

  const objectDayList: string[] = [];

  let daysInMonth = 0;
  if (month === '02') {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      daysInMonth = 29;
    } else {
      daysInMonth = 28;
    }
  } else {
    if (
      month === '01' ||
      month === '03' ||
      month === '05' ||
      month === '07' ||
      month === '08' ||
      month === '10' ||
      month === '12'
    ) {
      daysInMonth = 31;
    } else {
      daysInMonth = 30;
    }
  }

  for (let day = 1; day <= daysInMonth; day++) {
    let numDay: string = day.toString();
    if (day < 10) {
      numDay = '0' + day;
    }
    const dayString = numDay + '/' + month + '/' + year;
    objectDayList.push(dayString);
  }

  return objectDayList;
}
