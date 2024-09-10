/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** PieChart
*/

import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { EventsData } from '../GetBackendData/interfaces/EventsInterface';
import { getEncouters, getEncoutersById } from '../GetBackendData/GetBackendData';
import { EncounterData } from '../GetBackendData/interfaces/EncounterInterface';

type MeetingData = {
  id: number,
  value: number,
  label: string
}

const meetingsData = [
  { id: 0, value: 1, label: 'Dating App' },
  { id: 1, value: 102, label: 'Social Media' },
  { id: 2, value: 20, label: 'Others' },
  { id: 3 , value: 2, label: 'Dating App' },
]

export default function BasicPie() {
  const sourceMeetingData: MeetingData[] = [];

  useEffect(() => {
    const loadMeetingData = async () => {
      try {
        const result = await getEncouters();
        if (result) {
          for (let id = 0; id < result.length; id++) {
            calculateMeetingsStat(id);
          }
        } else {
          console.error("Meetings data is undefined");
        }
      } catch (error) {
        console.error("Failled to fetch encounters data: ", error);
      }
    }

    const calculateMeetingsStat = async (meetingId: number) => {
      const result = await getEncoutersById(meetingId);
      if (result) {
        const parsedResult: MeetingData = {
          id: result?.id,
          label: result.source,
          value: 1
        };
        sourceMeetingData.forEach((meeting) => {
          if (meeting.label == result.source) {
            meeting.value++;
          }
          console.log("Adding meeting of label: ", meeting.label);
          return;
        })
        console.log("Creating new meeting label: ", parsedResult.label);
        sourceMeetingData.push(parsedResult);
      } else {
        console.error("Cannot find encounter id: ", meetingId);
      }
    }

    // loadMeetingData();
  });


  return (
    <PieChart
      series={[
        {
          data: meetingsData,
          innerRadius: 50
        },
      ]}
      width={850}
      height={200}
    />
  );
}
