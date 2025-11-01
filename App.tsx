import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useState, useRef, useCallback } from 'react';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import EventHeader from './components/EventHeader';
import { useEvents } from './hooks/useEvents';

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { events, loading, error } = useEvents(currentDate);
  const panRef = useRef(null);

  const onGestureEvent = useCallback(() => {
    // No action needed here
  }, []);

  const onHandlerStateChange = useCallback((event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      if (translationX > 50) {
        // Swipe left: previous day
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 1);
        setCurrentDate(newDate);
      } else if (translationX < -50) {
        // Swipe right: next day
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 1);
        setCurrentDate(newDate);
      }
    }
  }, [currentDate]);

  const handleSearchClick = () => {
    console.log('Search clicked');
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
  };

  return <GestureHandlerRootView style={{ flex: 1 }}>
    <PanGestureHandler
      ref={panRef}
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
      activeOffsetX={[-10, 10]}
      failOffsetY={[-20, 20]}
    >
      <View style={styles.container}>
        <EventHeader
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          onSearchClick={handleSearchClick}
          onSettingsClick={handleSettingsClick}
        />
        <View style={styles.content}>
          {loading ? (
            <Text>Loading events...</Text>
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : events.length > 0 ? (
            <FlatList
              data={events}
              keyExtractor={(item, index) => `${item.event_title}-${index}`}
              renderItem={({ item }) => (
                <View style={styles.eventItem}>
                  <Text style={styles.eventTitle}>{item.event_title}</Text>
                  <Text style={styles.eventLocation}>{item.location_name}</Text>
                  <Text style={styles.eventCategory}>{item.category_name}</Text>
                  <Text style={styles.eventPrice}>
                    Price: {item.event_price === 0 ? 'Free' : `${item.event_price} RUB`}
                  </Text>
                </View>
              )}
            />
          ) : (
            <Text>No events for this date.</Text>
          )}
          <StatusBar style="auto" />
        </View>
      </View>
    </PanGestureHandler>
  </GestureHandlerRootView>

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  eventItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  eventCategory: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  eventPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
  },
});