import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import NoteItem from './NoteItem';
import ButtonCustom from './ButtonCustom';

const { width } = Dimensions.get('window');
const isSmall = width < 360;

const NotesScreen = ({ healthData = [], onNavigate, onEdit, onDelete, onView }) => {
  const renderItem = ({ item, index }) => {
    console.log('[NotesScreen] renderItem index=', index, 'id=', item.id);
    return (
      <NoteItem
        id={item.id}
        title={item.title}
        date={item.date}
        type={item.type}
        iconName={item.iconName}
        status={item.status}
        priority={item.priority}
        onView={() => onView && onView(item)}
        onEdit={() => onEdit && onEdit(item)}
        onDelete={() => {
          console.log('[NotesScreen] onDelete called for id=', item.id);
          onDelete && onDelete(item.id);
        }}
      />
    );
  };

  return (
    <LinearGradient colors={['#dbeafe', '#fef3c7', '#dbeafe']} style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, isSmall && { fontSize: 22 }]}>Notes</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.searchBtn} onPress={() => {}} activeOpacity={0.8}>
            <Ionicons name="search" size={18} color="#2563eb" />
          </TouchableOpacity>

          <View style={{ marginLeft: 8 }}>
            <ButtonCustom onPress={() => onNavigate && onNavigate('add')} iconName="add">Add</ButtonCustom>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Card style={styles.cardList}>
          {healthData.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No notes yet</Text>
              <Text style={styles.emptySubtitle}>Tap the + button to add your first note.</Text>
              <View style={{ marginTop: 12 }}>
                <ButtonCustom onPress={() => onNavigate && onNavigate('add')} iconName="add">Add Note</ButtonCustom>
              </View>
            </View>
          ) : (
            <FlatList
              data={healthData}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderItem}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          )}
        </Card>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 18,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#1f2937' },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  searchBtn: {
    width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center', justifyContent: 'center', marginRight: 8, borderWidth: 1, borderColor: 'rgba(37,99,235,0.08)',
  },
  content: { flex: 1, paddingHorizontal: 16, paddingBottom: 24 },
  cardList: { padding: 12 },
  listContent: { paddingVertical: 8 },
  emptyContainer: { alignItems: 'center', paddingVertical: 28 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 6 },
  emptySubtitle: { fontSize: 14, color: '#6b7280', marginBottom: 12, textAlign: 'center', paddingHorizontal: 8 },
});

export default NotesScreen;