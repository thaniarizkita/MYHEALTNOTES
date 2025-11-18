import React, { useState, useCallback } from 'react';
import { View, FlatList, Alert, StyleSheet, Text } from 'react-native';
import NoteItem from './NoteItem';
import { useFocusEffect } from '@react-navigation/native';

const NotesListScreen = ({ navigation }) => {
  const [notes, setNotes] = useState(initialNotes);

  useFocusEffect(
    useCallback(() => {
      // di aplikasi nyata, fetch/pull ulang dari server atau storage di sini
    }, [])
  );

  const handleViewDetail = (note) => {
    navigation.navigate('NoteDetail', { note });
  };

  const handleEdit = (note) => {
    navigation.navigate('NoteEdit', {
      note,
      onSave: (updated) => {
        setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
      },
    });
  };

  const handleDelete = (note) => {
    Alert.alert(
      'Hapus catatan',
      `Yakin ingin menghapus "${note.title}"?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            setNotes((prev) => prev.filter((n) => n.id !== note.id));
            Alert.alert('Terhapus', 'Catatan telah dihapus.');
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <NoteItem
      title={item.title}
      date={item.date}
      type={item.type}
      iconName={item.iconName}
      status={item.status}
      priority={item.priority}
      onViewDetail={() => handleViewDetail(item)}
      onEdit={() => handleEdit(item)}
      onDelete={() => handleDelete(item)}
    />
  );

  return (
    <View style={styles.container}>
      {notes.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Belum ada catatan.</Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: '#6b7280', fontSize: 16 },
});

export default NotesListScreen;