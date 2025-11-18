import React, { useState } from 'react';
import { SafeAreaView, Alert } from 'react-native';

// Komponen
import SplashScreen from './src/components/SplashScreen';
import HomeScreen from './src/components/HomeScreen';
import NotesScreen from './src/components/NotesScreen';
import AddNoteScreen from './src/components/AddNoteScreen';
import NoteDetailScreen from './src/components/NoteDetailScreen';
import ProfileScreen from './src/components/ProfileScreen';
import BottomNav from './src/components/BottomNav';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');

  // Tanpa data dummy
  const [healthData, setHealthData] = useState([]);

  const [editingNote, setEditingNote] = useState(null);
  const [viewingNote, setViewingNote] = useState(null);

  // Navigation
  const handleNavigation = (screen) => {
    setCurrentScreen(screen);
    setEditingNote(null);
    setViewingNote(null);
  };

  // CREATE & UPDATE
  const handleSaveNote = (noteData) => {
    if (editingNote) {
      // UPDATE existing note
      setHealthData((prev) =>
        prev.map((n) =>
          n.id === editingNote.id
            ? { ...n, ...noteData, id: editingNote.id }
            : n
        )
      );
      setEditingNote(null);
      Alert.alert('Sukses', 'Catatan berhasil diupdate!');
    } else {
      // CREATE new note
      const newNote = {
        ...noteData,
        id: Date.now(),
        date: noteData.date || new Date().toLocaleDateString('id-ID'),
      };
      setHealthData((prev) => [newNote, ...prev]);
      Alert.alert('Sukses', 'Catatan berhasil ditambahkan!');
    }
    setCurrentScreen('notes');
  };

  // READ - View detail
  const handleViewNote = (note) => {
    setViewingNote(note);
    setCurrentScreen('view');
  };

  // UPDATE - Edit note
  const handleEditNote = (note) => {
    setEditingNote(note);
    setCurrentScreen('add');
  };

  // DELETE
  const handleDeleteNote = (id) => {
    console.log('[App] handleDeleteNote called with id =', id);

    if (!id && id !== 0) {
      console.warn('[App] invalid id, aborting delete:', id);
      return;
    }

    setHealthData((current) => {
      console.log('[App] current length =', current.length);
      const next = current.filter(item => String(item.id) !== String(id));
      console.log('[App] next length =', next.length);
      return next;
    });

    if (viewingNote && String(viewingNote.id) === String(id)) {
      setViewingNote(null);
      setCurrentScreen('notes');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#dbeafe' }}>
      {currentScreen === 'splash' && (
        <SplashScreen onContinue={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'home' && (
        <HomeScreen
          onNavigate={handleNavigation}
          healthData={healthData}
        />
      )}

      {currentScreen === 'notes' && (
        <NotesScreen
          healthData={healthData}
          onNavigate={handleNavigation}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
          onView={handleViewNote}
        />
      )}

      {currentScreen === 'add' && (
        <AddNoteScreen
          onNavigate={handleNavigation}
          onSave={handleSaveNote}
          editNote={editingNote}
        />
      )}

      {currentScreen === 'view' && viewingNote && (
        <NoteDetailScreen
          note={viewingNote}
          onBack={() => setCurrentScreen('notes')}
          onEdit={() => handleEditNote(viewingNote)}
          onDelete={() => handleDeleteNote(viewingNote.id)}
        />
      )}

      {currentScreen === 'profile' && (
        <ProfileScreen
          healthData={healthData}
          onClear={() => {
            setHealthData([]);
            Alert.alert('Sukses', 'Semua catatan telah dihapus!');
          }}
        />
      )}

      {currentScreen !== 'splash' && (
        <BottomNav
          currentScreen={currentScreen}
          onNavigation={handleNavigation}
        />
      )}
    </SafeAreaView>
  );
}
