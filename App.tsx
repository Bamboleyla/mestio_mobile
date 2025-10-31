import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import EventHeader from './components/EventHeader';

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSearchClick = () => {
    console.log('Search clicked');
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
  };

  return (
    <View style={styles.container}>
      <EventHeader
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        onSearchClick={handleSearchClick}
        onSettingsClick={handleSettingsClick}
      />
      <View style={styles.content}>
        <Text>Mestio</Text>
        <StatusBar style="auto" />
      </View>
    </View>
  );
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