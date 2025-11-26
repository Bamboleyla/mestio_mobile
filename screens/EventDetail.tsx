import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, FlatList, Dimensions, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { fetchEventDetails } from '../utils/api';
import { EventDetails } from '../types/Event';

type EventDetailRouteProp = RouteProp<{ EventDetail: { eventId: string; date: string } }, 'EventDetail'>;

const EventDetail: React.FC = () => {
  const route = useRoute<EventDetailRouteProp>();
  const { eventId, date } = route.params;
  const formattedDate = date ? date.split('T')[0] : '2025-11-25';
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showImageView, setShowImageView] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

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

  // Function to handle tap on image
  const handleImageTap = (index: number) => {
    setImageIndex(index);
    setShowImageView(true);
  };

  // Handle scroll event to update active image index
  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffset / (Dimensions.get('window').width - 32));
    setImageIndex(currentIndex);
  };

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

  // Render item for FlatList
  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      key={index}
      onPress={() => handleImageTap(index)}
      activeOpacity={0.8}
      style={index === eventDetails.images.length - 1 ? styles.imageItemContainerLast : styles.imageItemContainer}
    >
      <Image
        source={{ uri: `http://127.0.0.1:8000/static/images/${item}` }}
        style={styles.eventImage}
        resizeMode="cover"
        onError={(error) => console.log('Image error:', error)}
        onLoad={() => console.log('Image loaded successfully')}
      />
    </TouchableOpacity>
  );

  // Render dot indicators
  const renderDotIndicators = () => {
    if (!eventDetails.images || eventDetails.images.length <= 1) return null;

    return (
      <View style={styles.indicatorContainer}>
        {eventDetails.images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === imageIndex ? styles.activeDot : styles.inactiveDot
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Event Images */}
      {eventDetails.images && eventDetails.images.length > 0 && (
        <View style={styles.imageContainer}>
          {eventDetails.images.length === 1 ? (
            // Single image - display as before but with tap functionality
            <TouchableOpacity
              onPress={() => handleImageTap(0)}
              activeOpacity={0.8}
              style={styles.imageItemContainerLast}
            >
              <Image
                source={{ uri: `http://127.0.0.1:8000/static/images/${eventDetails.images[0]}` }}
                style={styles.eventImage}
                resizeMode="cover"
                onError={(error) => console.log('Image error:', error)}
                onLoad={() => console.log('Image loaded successfully')}
              />
            </TouchableOpacity>
          ) : (
            // Multiple images - use FlatList for swipe functionality
            <>
              <FlatList
                ref={flatListRef}
                data={eventDetails.images}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToAlignment="center"
                snapToInterval={Dimensions.get('window').width - 32}
                decelerationRate="fast"
                onMomentumScrollEnd={handleScroll}
                onScroll={(event) => {
                  const contentOffset = event.nativeEvent.contentOffset.x;
                  const currentIndex = Math.round(contentOffset / (Dimensions.get('window').width - 32));
                  setImageIndex(currentIndex);
                }}
              />
              {renderDotIndicators()}
            </>
          )}
        </View>
      )}

      {/* Full screen image viewer */}
      <Modal
        visible={showImageView}
        transparent={false}
        animationType="fade"
        onRequestClose={() => setShowImageView(false)}
      >
        <View style={styles.fullScreenContainer}>
          <FlatList
            data={eventDetails.images}
            renderItem={({ item, index }) => (
              <TouchableWithoutFeedback key={index} onPress={() => setShowImageView(false)}>
                <View style={styles.fullScreenImageContainer}>
                  <Image
                    source={{ uri: `http://127.0.0.1:8000/static/images/${item}` }}
                    style={styles.fullScreenImage}
                    resizeMode="contain"
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={Dimensions.get('window').width}
            initialScrollIndex={imageIndex}
            onMomentumScrollEnd={(event) => {
              const contentOffset = event.nativeEvent.contentOffset.x;
              const currentIndex = Math.round(contentOffset / Dimensions.get('window').width);
              setImageIndex(currentIndex);
            }}
          />
        </View>
      </Modal>

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
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    height: 290, // Increased height to accommodate dots
  },
  imageItemContainer: {
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  imageItemContainerLast: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  eventImage: {
    width: Dimensions.get('window').width - 32,
    height: 250,
    borderRadius: 8,
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
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  fullScreenImageContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  // Dot indicator styles
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#3B82F6', // Blue color for active dot
  },
  inactiveDot: {
    backgroundColor: '#D1D5DB', // Gray color for inactive dots
  },
});

export default EventDetail;