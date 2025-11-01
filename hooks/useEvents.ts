import { useState, useEffect } from 'react';
import { Event } from '../types/Event';
import { fetchEventsByDate } from '../utils/api';

export const useEvents = (currentDate: Date) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async (date: Date) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedEvents = await fetchEventsByDate(date);
      setEvents(fetchedEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(currentDate);
  }, [currentDate]);

  return { events, loading, error, refetch: fetchEvents };
};