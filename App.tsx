import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useRef, useCallback } from 'react';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import EventHeader from './components/EventHeader';

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
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
          <Text>Mestio!</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});