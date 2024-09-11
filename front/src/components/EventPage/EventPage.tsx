/*
 ** EPITECH PROJECT, 2024
 ** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
 ** File description:
 ** EventPage
 */
import React, { useState, useEffect } from 'react';
import NavBar from '../navbar/Navbar';
import { getEvents } from '../GetBackendData/GetBackendData';
import { EventsData } from '../GetBackendData/interfaces/EventsInterface';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  getDay,
  startOfWeek: () => startOfWeek(new Date(), { locale: enUS }),
  parse,
  locales,
});

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
}

const EventPage: React.FC = () => {
  const [data, setData] = useState<EventsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getEvents();
        setData(result || []);
        setLoading(false);
        if (data.length > 0) {
          const calendarEvents: CalendarEvent[] = data.map((eventList) => ({
            title: eventList.name,
            start: new Date(eventList.date),
            end: new Date(
              new Date(eventList.date).getTime() + eventList.duration,
            ),
          }));
          setEvents(calendarEvents);
        }
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    loadData();
  }, [data]);

  if (loading) {
    return <h1 className="centerTEXT">Loading...</h1>;
  }
  if (error) {
    return <h1 className="centerTEXT">Error: {error}</h1>;
  }

  return (
    <>
      <NavBar />
      <div className="marginTopPage">
        <div className="text-Flex flexBack">
          <div className="interSpace">
            <h2 className="titleTopPage">Events</h2>
          </div>
          <div>
            <button className="prefabButton">+ Add Event</button>
          </div>
        </div>

        <div className="container">
          <table className="clientList space">
            <tbody>
              <Calendar
                localizer={localizer}
                events={events}
                style={{ height: '50vh', width: '95vw', margin: '1vw' }}
                defaultView="month"
                views={['month', 'week', 'day']}
              />
            </tbody>
          </table>
        </div>

        <div className="container">
          <table className="clientList space">
            <tbody>
              <div className="mapContainer mapEvent">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19218.677970060115!2d-0.042011151672455484!3d52.978380869810266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d7c2c53856f733%3A0x8406d541f1a0910c!2sBoston%2C%20Royaume-Uni!5e0!3m2!1sfr!2sfr!4v1725895451721!5m2!1sfr!2sfr"
                  loading="lazy"
                  width={1790}
                  height={800}
                  className="mapEvent"
                  allowFullScreen
                ></iframe>
              </div>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EventPage;
