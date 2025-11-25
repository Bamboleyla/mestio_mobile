export interface EventItemProps {
  avatar: string; // Тип события для иконки
  title: string; // Название события
  startTime: string; // Время начала
  location: string; // Место проведения
  price: number | string; // Цена
  eventType: string; // Категория события
  onPress?: () => void; // Обработчик нажатия
  imgPath: string | null; // Путь к изображению события
}