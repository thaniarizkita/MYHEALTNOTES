import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import ButtonCustom from './ButtonCustom';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 360;

const HomeScreen = ({ onNavigate, healthData }) => {

  const summaryCards = [
    { title: 'Blood Pressure', value: '120/80', iconName: 'pulse', color: ['#f87171', '#ec4899'], navigate: 'blood' },
    { title: "Today's Mood", value: 'Happy', iconName: 'happy', color: ['#fbbf24', '#f97316'], navigate: 'mood' },
    { title: 'Sleep Hours', value: '7.5h', iconName: 'moon', color: ['#6366f1', '#a855f7'], navigate: 'sleep' },
    { title: 'Water Intake', value: '6/8 cups', iconName: 'water', color: ['#60a5fa', '#06b6d4'], navigate: 'water' },
  ];

  return (
    <LinearGradient colors={['#dbeafe', '#fef3c7', '#dbeafe']} style={styles.container}>
      
      <ScrollView contentContainerStyle={styles.content}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, isSmallScreen && { fontSize: 26 }]}>
            Welcome Back!
          </Text>
          <Text style={[styles.headerSubtitle, isSmallScreen && { fontSize: 14 }]}>
            Here's your health summary for today
          </Text>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryGrid}>
          {summaryCards.map((card, index) => (
            
            <TouchableOpacity 
              key={index} 
              style={[styles.summaryCard, isSmallScreen && { width: '100%' }]}
              onPress={() => onNavigate(card.navigate)}   // 👈 Navigasi
            >
              <Card>
                <View style={styles.summaryCardContent}>

                  {/* Gradient Icon */}
                  <LinearGradient
                    colors={card.color}
                    style={[styles.summaryIcon, isSmallScreen && { width: 52, height: 52 }]}
                  >
                    <Ionicons
                      name={card.iconName}
                      size={isSmallScreen ? 24 : 32}
                      color="white"
                    />
                  </LinearGradient>

                  <View>
                    <Text style={[styles.summaryTitle, isSmallScreen && { fontSize: 12 }]}>
                      {card.title}
                    </Text>
                    <Text style={[styles.summaryValue, isSmallScreen && { fontSize: 20 }]}>
                      {card.value}
                    </Text>
                  </View>

                </View>
              </Card>
            </TouchableOpacity>

          ))}
        </View>

        {/* Recent Notes */}
        <Card style={styles.recentNotesCard}>
          <Text style={[styles.sectionTitle, isSmallScreen && { fontSize: 20 }]}>
            Recent Notes
          </Text>

          <View style={styles.recentNotesList}>
            {healthData?.slice(0, 3).map((note) => (
              <View key={note.id} style={styles.recentNote}>
                <Text style={[styles.recentNoteTitle, isSmallScreen && { fontSize: 14 }]}>
                  {note.title}
                </Text>
                <Text style={[styles.recentNoteDate, isSmallScreen && { fontSize: 12 }]}>
                  {note.date}
                </Text>
              </View>
            ))}
          </View>

          {/* Add Note Button */}
          <ButtonCustom onPress={() => onNavigate('add')} iconName="add">
            Add New Note
          </ButtonCustom>
        </Card>

      </ScrollView>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 100 },

  header: { marginBottom: 24 },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#1f2937' },
  headerSubtitle: { fontSize: 16, color: '#6b7280' },

  summaryGrid: { 
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  summaryCard: {
    width: '48%',
    marginBottom: 16,
    minWidth: 150,
  },

  summaryCardContent: { flexDirection: 'row', alignItems: 'center' },

  summaryIcon: { 
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },

  summaryTitle: { fontSize: 14, color: '#6b7280', fontWeight: '500' },
  summaryValue: { fontSize: 24, fontWeight: 'bold', color: '#1f2937' },

  recentNotesCard: { marginBottom: 24 },

  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#1f2937', marginBottom: 16 },

  recentNotesList: { marginBottom: 16 },

  recentNote: { 
    backgroundColor: 'rgba(219,234,254,0.5)',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderColor: '#bfdbfe',
    borderWidth: 1,
  },

  recentNoteTitle: { fontSize: 16, fontWeight: '600', color: '#1f2937' },
  recentNoteDate: { fontSize: 14, color: '#6b7280' },
});

export default HomeScreen;
