import { Event } from '../types/Event';

const BASE_URL = 'http://192.168.0.131:8000'; // Replace with your API base URL

export const fetchEventsByDate = async (date: Date): Promise<Event[]> => {
  const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
  try {
    const response = await fetch(`${BASE_URL}/api/v1/events/by-date?search_date=${formattedDate}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
  }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Placeholder for additional API functions
export const fetchEventsByCategory = async (category: string): Promise<Event[]> => {
  // Future implementation
  return [];
};

export const fetchEventDetails = async (eventId: string): Promise<Event | null> => {
  // Future implementation
  return null;
};