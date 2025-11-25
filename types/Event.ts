export interface Event {
  event_id: number;
  date: string;
  price: number;
  title: string;
  category_name: string;
  location_name: string;
  img_path: string | null;
}