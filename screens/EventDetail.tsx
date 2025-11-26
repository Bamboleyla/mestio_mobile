import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { fetchEventDetails } from '../utils/api';
import { EventDetails } from '../types/Event';

type EventDetailRouteProp = RouteProp<{ EventDetail: { eventId: string; date: string } }, 'EventDetail'>;

const EventDetail: React.FC = () => {
  const route = useRoute<EventDetailRouteProp>();
  const { eventId, date } = route.params;
  const formattedDate = date ? date.split('T')[0] : '2025-11-25';   // Ensure date is in YYYY-MM-DD format
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEventDetails = async () => {
      try {
        const details = await fetchEventDetails(eventId, formattedDate);
        setEventDetails(details);
        setLoading(false);
      } catch (err) {
        setError('Failed to load event details');
        setLoading(false);
      }
    };

    loadEventDetails();
  }, [eventId, date]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!eventDetails) {
    return (
      <View style={styles.container}>
        <Text>No event details available</Text>
      </View>
    );
  }

  // Format address from location properties
  const formatAddress = (location: any) => {
    const { city, street, house_number, building_number, apartment_number } = location;
    let address = `${city}, ${street} ${house_number}`;
    if (building_number) {
      address += ` корп. ${building_number}`;
    }
    if (apartment_number) {
      address += ` кв. ${apartment_number}`;
    }
    return address;
  };

  // Format opening hours with break if available
 const formatOpeningHours = (openingHours: any) => {
    const { open_time, close_time, break_start, break_end } = openingHours;
    let hours = `${open_time} - ${close_time}`;
    if (break_start && break_end) {
      hours += ` (перерыв: ${break_start} - ${break_end})`;
    }
    return hours;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Event Images */}
      {eventDetails.images && eventDetails.images.length > 0 && (
        <View style={styles.imageContainer}>
          {eventDetails.images.map((imgPath, index) => (
            <Image
              key={index}
              source={{ uri: `http://127.0.0.1:8000/static/images/${imgPath}` }}
              style={styles.eventImage}
              resizeMode="cover"
              onError={(error) => console.log('Image error:', error)}
              onLoad={() => console.log('Image loaded successfully')}
            />
          ))}
        </View>
      )}

      {/* Event Title */}
      <View style={styles.section}>
        <Text style={styles.title}>{eventDetails.title}</Text>
      </View>

      {/* Event Description */}
      <View style={styles.section}>
        <Text style={styles.description}>{eventDetails.description}</Text>
      </View>

      {/* Event Category and Location */}
      <View style={styles.section}>
        <Text style={styles.label}>Место проведения:</Text>
        <Text style={styles.value}>{eventDetails.location.category} {eventDetails.location.name}</Text>
      </View>

      {/* Address */}
      <View style={styles.section}>
        <Text style={styles.label}>Адрес:</Text>
        <Text style={styles.value}>{formatAddress(eventDetails.location)}</Text>
      </View>

      {/* Opening Hours */}
      <View style={styles.section}>
        <Text style={styles.label}>Время работы:</Text>
        <Text style={styles.value}>{formatOpeningHours(eventDetails.opening_hours)}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  eventImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
 },
  description: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#1F2937',
  },
  errorText: {
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default EventDetail;