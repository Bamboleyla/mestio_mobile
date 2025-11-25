import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { EventItemProps } from '../../types/EventItem';

const EventItem: React.FC<EventItemProps> = ({
  avatar,
  title,
  startTime,
  location,
  price,
  eventType,
  onPress,
  imgPath,
}) => {
   // Функция для получения иконки по типу события
  const getEventIcon = (type: string): (() => React.JSX.Element) => {
    switch (type) {
      case 'кино':
        return () => <MaterialIcons name="local-movies" size={24} color="#6366F1" />;
      case 'мультфильм':
        return () => <FontAwesome5 name="theater-masks" size={24} color="#6366F1" />;
      case 'выставка':
      case 'интерактивная выставка':
        return () => <MaterialIcons name="collections" size={24} color="#6366F1" />;
      default:
        return () => <MaterialIcons name="event" size={24} color="#6366F1" />;
    }
  };

  const EventIcon = getEventIcon(avatar);

  // Функция для форматирования цены
  const renderPrice = () => {
    if (price === 0 || price === 'free' || price === 'Free') {
      return (
        <View style={styles.freeContainer}>
          <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
          <Text style={styles.freeText}>Free</Text>
        </View>
      );
    }
    return (
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>₽{price}</Text>
      </View>
    );
  };

  // Функция для форматирования времени
  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } catch {
      return startTime;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        {/* Аватар события */}
        <View style={styles.avatarContainer}>
          {imgPath ? (
            <Image
              source={{ uri: `http://127.0.0.1:8000/static/images/${imgPath}` }}
              style={styles.avatarImage}
              resizeMode="cover"
              onError={(error) => console.log('Image error:', error)}
              onLoad={() => console.log('Image loaded successfully')}
            />
          ) : (
            <EventIcon />
          )}
        </View>

        {/* Основная информация */}
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <View style={styles.detailsRow}>
            <View style={styles.locationItem}>
              <View style={styles.locationIcon}>
                <MaterialIcons name="location-on" size={16} color="#666" />
              </View>
              <Text style={styles.locationText} numberOfLines={2}>
                {location}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* Нижняя строка с типом события и ценой */}
      <View style={styles.footer}>
        <View style={styles.detailItem}>
          <MaterialIcons name="access-time" size={16} color="#666" />
          <Text style={styles.detailText}>{formatTime(startTime)}</Text>
        </View>
        <View style={styles.eventTypeContainer}>
          <Text style={styles.eventTypeText}>{eventType}</Text>
        </View>
        {renderPrice()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 8,
    marginVertical: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flexDirection: 'row',
    minWidth: Dimensions.get('window').width - 32,
    padding: 5,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    flexShrink: 0,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    minWidth: 0,
  },
  locationIcon: {
    alignSelf: 'center',
    marginTop: 2,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
    flex: 1,
    flexWrap: 'wrap',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingBottom:5
  },
  eventTypeContainer: {
    flex: 1,
  },
  eventTypeText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  freeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  freeText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 4,
  },
  priceContainer: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priceText: {
    fontSize: 12,
    color: '#6366F1',
    fontWeight: '600',
  },
});

export default EventItem;