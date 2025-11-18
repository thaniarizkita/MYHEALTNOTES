import React from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import ButtonCustom from './ButtonCustom';

const { width } = Dimensions.get('window');
const isSmall = width < 360;

const NoteDetailScreen = ({ note, onBack, onEdit, onDelete, navigation }) => {
  const handleBack = () => {
    if (typeof onBack === 'function') return onBack();
    if (navigation && typeof navigation.goBack === 'function') return navigation.goBack();
  };

  if (!note) {
    return (
      <View style={styles.center}>
        <Text>Data catatan tidak ditemukan.</Text>
        <ButtonCustom onPress={handleBack} variant="secondary">Kembali</ButtonCustom>
      </View>
    );
  }

  // Local confirm -> then call parent with confirmed flag
  const confirmDelete = () => {
    Alert.alert(
      'Hapus Catatan',
      'Yakin ingin menghapus catatan ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            if (typeof onDelete === 'function') {
              onDelete(note.id, { confirmed: true });
            }
            handleBack();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <LinearGradient colors={['#dbeafe', '#fef3c7', '#dbeafe']} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton} activeOpacity={0.8}>
              <Ionicons name="arrow-back" size={20} color="#2563eb" />
            </TouchableOpacity>

            <View style={{ flex: 1 }} />

            <TouchableOpacity onPress={confirmDelete} style={styles.headerActionIcon} activeOpacity={0.8}>
              <Ionicons name="trash" size={18} color="#dc2626" />
            </TouchableOpacity>
          </View>

          <View style={styles.header}>
            <LinearGradient colors={['#3b82f6', '#1d4ed8']} style={styles.iconWrap}>
              <Ionicons name={note.iconName ?? 'document-text'} size={isSmall ? 22 : 28} color="#fff" />
            </LinearGradient>

            <View style={styles.headerText}>
              <Text style={[styles.title, isSmall && { fontSize: 20 }]} numberOfLines={2}>{note.title}</Text>
              <Text style={styles.meta}>{note.type} • {note.date}</Text>
              <View style={styles.typeBadge}><Text style={styles.typeText}>{note.type}</Text></View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Status</Text>
            <Text style={styles.text}>{note.status || '-'}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Prioritas</Text>
            <Text style={[styles.text, getPriorityStyle(note.priority)]}>{note.priority || '-'}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Detail / Isi</Text>
            <Text style={styles.text}>{note.content ?? note.notes ?? '(Tidak ada isi)'}</Text>
          </View>

          <View style={styles.actions}>
            <ButtonCustom onPress={() => onEdit && onEdit(note)} iconName="pencil">Edit</ButtonCustom>

            <ButtonCustom onPress={confirmDelete} variant="danger">Hapus</ButtonCustom>

            <ButtonCustom onPress={handleBack} variant="secondary">Kembali</ButtonCustom>
          </View>
        </Card>
      </ScrollView>
    </LinearGradient>
  );
};

const getPriorityStyle = (priority) => {
  if (!priority) return { color: '#6b7280' };
  switch (String(priority).toLowerCase()) {
    case 'tinggi': return { color: '#dc2626' };
    case 'sedang': return { color: '#f59e0b' };
    case 'rendah': return { color: '#10b981' };
    default: return { color: '#6b7280' };
  }
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(37,99,235,0.08)',
  },
  headerActionIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(220,38,38,0.08)',
  },

  header: { flexDirection: 'row', alignItems: 'center', marginTop: 6, marginBottom: 6 },
  iconWrap: { width: 64, height: 64, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  headerText: { flex: 1 },
  title: { fontSize: 20, fontWeight: '700', color: '#111827' },
  meta: { color: '#6b7280', marginTop: 6 },
  typeBadge: { marginTop: 8, alignSelf: 'flex-start', backgroundColor: '#dbeafe', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 16 },
  typeText: { color: '#2563eb', fontWeight: '600', fontSize: 12 },

  section: { marginTop: 12 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#374151' },
  text: { marginTop: 6, color: '#111827', lineHeight: 20 },

  actions: { marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  deleteBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#dc2626', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 },
  deleteText: { color: '#fff', fontWeight: '700', marginLeft: 8 },
});

export default NoteDetailScreen;