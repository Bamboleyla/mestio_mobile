import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventDetail: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Event Details Coming Soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EventDetail;