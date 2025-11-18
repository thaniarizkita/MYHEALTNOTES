import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Dimensions, Share } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import ButtonCustom from './ButtonCustom';

const { width } = Dimensions.get('window');
const isSmall = width < 360;

const ProfileScreen = ({ healthData = [], onNavigate, onClear }) => {
  const notesCount = healthData.length;
  const lastNote = notesCount > 0 ? healthData[0] : null; // assuming newest at index 0

  const handleExport = async () => {
    try {
      const payload = JSON.stringify(healthData, null, 2);
      await Share.share({
        title: 'Export MyHealthNotes',
        message: `MyHealthNotes export (${notesCount} notes)\n\n` + payload,
      });
    } catch (err) {
      console.warn('[ProfileScreen] export error', err);
      Alert.alert('Error', 'Gagal mengekspor catatan.');
    }
  };

  const handleClear = () => {
    if (typeof onClear !== 'function') {
      Alert.alert('Tidak tersedia', 'Fungsi hapus semua belum diaktifkan.');
      return;
    }
    Alert.alert(
      'Hapus semua catatan',
      'Yakin ingin menghapus semua catatan? Tindakan ini tidak dapat dibatalkan.',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: () => onClear() },
      ],
      { cancelable: true }
    );
  };

  const renderRecent = ({ item }) => (
    <View style={styles.recentItem}>
      <View style={styles.recentLeft}>
        <LinearGradient colors={['#3b82f6', '#1d4ed8']} style={styles.recentIcon}>
          <Ionicons name={item.iconName ?? 'document-text'} size={18} color="#fff" />
        </LinearGradient>
      </View>

      <View style={styles.recentBody}>
        <Text style={styles.recentTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.recentDate}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#dbeafe', '#fef3c7', '#dbeafe']} style={styles.screen}>
      <View style={styles.wrapper}>
        <Card style={styles.profileCard}>
          <View style={styles.topRow}>
            <LinearGradient colors={['#7dd3fc', '#7c3aed']} style={styles.avatar}>
              <Ionicons name="person" size={34} color="#fff" />
            </LinearGradient>

            <View style={styles.profileInfo}>
              <Text style={[styles.name, isSmall && { fontSize: 20 }]}>Nama Pengguna</Text>
              <Text style={styles.email}>youremail@example.com</Text>

              <View style={styles.badges}>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{notesCount}</Text>
                  <Text style={styles.statLabel}>Notes</Text>
                </View>

                <View style={styles.stat}>
                  <Text style={styles.statValue}>{lastNote ? lastNote.date : '-'}</Text>
                  <Text style={styles.statLabel}>Last</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 12 }}>
            <Text style={styles.sectionTitle}>Recent Notes</Text>

            {notesCount === 0 ? (
              <View style={styles.emptyRecent}>
                <Text style={styles.emptyText}>Belum ada catatan.</Text>
              </View>
            ) : (
              <FlatList
                data={healthData.slice(0, 4)}
                keyExtractor={(it) => String(it.id)}
                renderItem={renderRecent}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                contentContainerStyle={{ paddingTop: 8 }}
              />
            )}
          </View>

          <View style={styles.actionsRow}>
            <ButtonCustom onPress={handleExport} iconName="edit" variant="secondary" style={{ width: '100%' }}>
              Edit Profile
            </ButtonCustom>
          </View>

          <View style={styles.dangerRow}>
            <ButtonCustom onPress={handleClear} variant="danger" iconName="trash" style={{ width: '100%' }}>
              Hapus Semua
            </ButtonCustom>
          </View>
        </Card>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  wrapper: { flex: 1, padding: 16, paddingBottom: 40 },
  profileCard: { padding: 16 },

  topRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  profileInfo: { flex: 1 },
  name: { fontSize: 22, fontWeight: '800', color: '#0f172a' },
  email: { color: '#6b7280', marginTop: 4 },

  badges: { flexDirection: 'row', marginTop: 10 },
  stat: { marginRight: 18 },
  statValue: { fontSize: 16, fontWeight: '800', color: '#1f2937' },
  statLabel: { fontSize: 12, color: '#6b7280' },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },

  emptyRecent: { paddingVertical: 12, alignItems: 'center' },
  emptyText: { color: '#6b7280' },

  recentItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, backgroundColor: 'rgba(219,234,254,0.4)', borderRadius: 12, padding: 10 },
  recentLeft: { marginRight: 10 },
  recentIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  recentBody: { flex: 1 },
  recentTitle: { fontWeight: '700', color: '#0f172a' },
  recentDate: { marginTop: 4, color: '#6b7280', fontSize: 12 },

  actionsRow: { flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' },
  actionBtn: { flex: 1, marginHorizontal: 6 },

  dangerRow: { marginTop: 12 },
});

export default ProfileScreen;