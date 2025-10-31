import { StyleSheet } from 'react-native';

export const eventHeaderStyles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingTop: 40, 
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  dateContainer: {
    alignItems: 'center',
    minWidth: 150,
  },
  date: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  weekday: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});