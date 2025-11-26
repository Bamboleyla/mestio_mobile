export interface Event {
  event_id: number;
  date: string;
  price: number;
 title: string;
  category_name: string;
  location_name: string;
  img_path: string | null;
}

export interface Location {
  name: string;
  category: string;
  city: string;
  street: string;
 house_number: string;
  building_number: string | null;
  apartment_number: string | null;
}

export interface OpeningHours {
  open_time: string;
  close_time: string;
  break_start: string | null;
  break_end: string | null;
}

export interface EventDetails {
  title: string;
  description: string;
  duration: string | null;
  event_category: string;
  location: Location;
  opening_hours: OpeningHours;
  images: string[];
}