import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomNav = ({ currentScreen, onNavigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={() => onNavigation && onNavigation('home')}>
        <Ionicons name="home" size={22} color={currentScreen === 'home' ? '#2563eb' : '#6b7280'} />
        <Text style={[styles.label, currentScreen === 'home' && styles.active]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => onNavigation && onNavigation('notes')}>
        <Ionicons name="document-text" size={22} color={currentScreen === 'notes' ? '#2563eb' : '#6b7280'} />
        <Text style={[styles.label, currentScreen === 'notes' && styles.active]}>Notes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => onNavigation && onNavigation('profile')}>
        <Ionicons name="person" size={22} color={currentScreen === 'profile' ? '#2563eb' : '#6b7280'} />
        <Text style={[styles.label, currentScreen === 'profile' && styles.active]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-around', padding: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e7eb' },
  item: { alignItems: 'center' },
  label: { fontSize: 12, color: '#6b7280', marginTop: 4 },
  active: { color: '#2563eb', fontWeight: '700' },
});

export default BottomNav;