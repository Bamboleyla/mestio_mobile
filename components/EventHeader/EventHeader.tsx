import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import { EventHeaderProps } from '../../types/EventHeader';
import { eventHeaderStyles as styles } from '../../styles/EventHeader';

const EventHeader: React.FC<EventHeaderProps> = ({
  currentDate,
  onDateChange,
  onSearchClick,
  onSettingsClick,
}) => {
  const handlePreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };

  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.iconButton} onPress={onSearchClick}>
          <Ionicons name="search" size={20} color="#000" />
        </TouchableOpacity>
        <View style={styles.dateRow}>
          <TouchableOpacity style={styles.arrowButton} onPress={handlePreviousDay}>
            <Ionicons name="chevron-back" size={16} color="#666" />
          </TouchableOpacity>

          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {format(currentDate, "d MMMM", { locale: ru })}
            </Text>
            <Text style={styles.weekday}>
              {format(currentDate, "EEEE", { locale: ru })}
            </Text>
          </View>

          <TouchableOpacity style={styles.arrowButton} onPress={handleNextDay}>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.iconButton} onPress={onSettingsClick}>
          <Ionicons name="settings-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventHeader;