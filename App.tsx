import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useState, useRef, useCallback } from 'react';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import EventHeader from './components/EventHeader';
import EventItem from './components/EventItem';
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
            <ActivityIndicator size="large" color="#007bff" />
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : events.length > 0 ? (
            <FlatList
              data={events}
              keyExtractor={(item, index) => `${item.event_title}-${index}`}
              contentContainerStyle={{ paddingTop: 100, paddingBottom: 40 }}
              renderItem={({ item }) => (
                <EventItem
                  avatar={item.category_name}
                  title={item.event_title}
                  startTime={item.event_start_date}
                  location={item.location_name}
                  price={item.event_price}
                  eventType={item.category_name}
                  onPress={() => console.log('Event pressed:', item.event_title)}
                />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});