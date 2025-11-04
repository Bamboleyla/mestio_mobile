import { useState, useEffect, useRef } from 'react';
import { Event } from '../types/Event';
import { fetchEventsByDate } from '../utils/api';

export const useEvents = (currentDate: Date) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cache = useRef(new Map<string, Event[]>());

  const fetchEvents = async (date: Date) => {
    const dateKey = date.toISOString();
    if (cache.current.has(dateKey)) {
      setEvents(cache.current.get(dateKey)!);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const fetchedEvents = await fetchEventsByDate(date);
      setEvents(fetchedEvents);
      cache.current.set(dateKey, fetchedEvents);
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