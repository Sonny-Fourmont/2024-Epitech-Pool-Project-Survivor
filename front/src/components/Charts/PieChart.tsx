/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** PieChart
 */

import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { getDataList } from '../GetBackendData/GetBackendData';
import { EncounterData } from '../GetBackendData/interfaces/EncounterInterface';

type MeetingData = {
  id: number;
  label: string;
  value: number;
};

export default function BasicPie() {
  const [sourceMeetingData, setSourceMeetingData] = useState<
    EncounterData[] | undefined
  >([]);
  const [meetingsData, setMeetingsData] = useState<MeetingData[]>([]);

  useEffect(() => {
    const loadMeetingData = async () => {
      try {
        const result = await getDataList<EncounterData>(
          'http://localhost:3001/encounters',
        );
        if (result) {
          setSourceMeetingData(result);
        } else {
          console.error('Meetings data is undefined');
        }
      } catch (error) {
        console.error('Failed to fetch encounters data: ', error);
      }
    };

    const calculateMeetingsStat = () => {
      const updatedMeetingsData: MeetingData[] = [];

      sourceMeetingData?.forEach((encounter) => {
        const existingMeeting = updatedMeetingsData.find(
          (meeting) => meeting.label === encounter.source,
        );

        if (existingMeeting) {
          existingMeeting.value++;
        } else {
          updatedMeetingsData.push({
            id: updatedMeetingsData.length,
            label: encounter.source,
            value: 1,
          });
        }
      });

      setMeetingsData(updatedMeetingsData);
    };

    if (sourceMeetingData && sourceMeetingData.length > 0) {
      calculateMeetingsStat();
    } else {
      loadMeetingData();
    }
  }, [sourceMeetingData]);

  return (
    <PieChart
      series={[
        {
          data: meetingsData,
          innerRadius: 50,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      width={1000}
      height={400}
      slotProps={{
        legend: { hidden: true },
      }}
    />
  );
}
