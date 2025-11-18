import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const NoteItem = ({ id, title, date, type, iconName = 'document-text', status, priority, onEdit, onDelete, onView }) => {

  const handleView = () => {
    console.log('[NoteItem] handleView id=', id);
    if (typeof onView === 'function') onView(id);
  };

  const handleEdit = () => {
    console.log('[NoteItem] handleEdit id=', id);
    if (typeof onEdit === 'function') onEdit(id);
  };

  const handleDelete = () => {
    console.log('[NoteItem] handleDelete pressed, local id =', id);

    if (typeof onDelete !== 'function') {
      console.warn('[NoteItem] onDelete handler missing for id=', id);
      Alert.alert('Error', 'Fungsi hapus belum tersedia.');
      return;
    }

    Alert.alert(
      'Hapus Catatan',
      `Yakin ingin menghapus "${title}"?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            try {
              console.log('[NoteItem] calling onDelete with id=', id);
              onDelete(id);
            } catch (err) {
              console.error('[NoteItem] onDelete threw:', err);
              Alert.alert('Error', 'Gagal memanggil fungsi hapus.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.noteItem}>
      <View style={styles.noteItemContent}>
        <LinearGradient colors={['#3b82f6', '#1d4ed8']} style={styles.noteIcon}>
          <Ionicons name={iconName} size={24} color="white" />
        </LinearGradient>

        <View style={styles.noteText}>
          <Text style={styles.noteTitle} numberOfLines={1}>{title}</Text>
          <Text style={styles.noteDate}>{date}</Text>

          <View style={styles.noteMeta}>
            <View style={styles.noteType}><Text style={styles.noteTypeText}>{type}</Text></View>
            {status ? <View style={styles.statusBadge}><Text style={styles.statusText}>{status}</Text></View> : null}
            {priority ? <View style={styles.priorityBadge}><Text style={styles.priorityText}>{priority}</Text></View> : null}
          </View>
        </View>
      </View>

      <View style={styles.noteActions}>
        <TouchableOpacity onPress={handleView} style={styles.actionButton}><Ionicons name="eye" size={20} color="#10b981" /></TouchableOpacity>
        <TouchableOpacity onPress={handleEdit} style={styles.actionButton}><Ionicons name="pencil" size={20} color="#2563eb" /></TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.actionButton}><Ionicons name="trash" size={20} color="#dc2626" /></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noteItem: { backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  noteItemContent: { flexDirection: 'row', alignItems: 'flex-start' },
  noteIcon: { width: 48, height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  noteText: { flex: 1 },
  noteTitle: { fontSize: 16, fontWeight: '700', color: '#1f2937', marginBottom: 4 },
  noteDate: { fontSize: 12, color: '#6b7280', marginBottom: 8 },
  noteMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  noteType: { backgroundColor: '#dbeafe', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  noteTypeText: { fontSize: 11, color: '#2563eb' },
  statusBadge: { backgroundColor: '#f3f4f6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginLeft: 6 },
  statusText: { fontSize: 11, color: '#6b7280' },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginLeft: 6 },
  priorityText: { fontSize: 11, fontWeight: '600' },
  noteActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12, gap: 12 },
  actionButton: { padding: 10, borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.03)' },
});

export default NoteItem;
