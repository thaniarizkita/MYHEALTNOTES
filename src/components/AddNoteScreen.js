import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import Card from './Card';
import ButtonCustom from './ButtonCustom';

const { width } = Dimensions.get('window');
const isSmall = width < 360;

const AddNoteScreen = ({ onNavigate, onSave, editNote }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'General',
    notes: '',
    date: new Date().toLocaleDateString('id-ID'),
    priority: '',
    status: '',
    iconName: 'document-text',
  });

  useEffect(() => {
    if (editNote) {
      setFormData({
        title: editNote.title || '',
        type: editNote.type || 'General',
        notes: editNote.notes || editNote.content || '',
        date: editNote.date || new Date().toLocaleDateString('id-ID'),
        priority: editNote.priority || editNote.prioritas || '',
        status: editNote.status || '',
        iconName: editNote.iconName || editNote.icon || 'document-text',
      });
    } else {
      setFormData({
        title: '',
        type: 'General',
        notes: '',
        date: new Date().toLocaleDateString('id-ID'),
        priority: '',
        status: '',
        iconName: 'document-text',
      });
    }
  }, [editNote]);

  const handleSubmit = () => {
    if (!formData.title || !formData.title.trim()) {
      Alert.alert('Error', 'Harap masukkan judul catatan');
      return;
    }

    const payload = {
      ...formData,
      title: formData.title.trim(),
      date: formData.date || new Date().toLocaleDateString('id-ID'),
    };

    if (typeof onSave !== 'function') {
      Alert.alert('Error', 'Fungsi penyimpanan tidak tersedia');
      return;
    }

    onSave(payload);
  };

  const types = ['Blood Pressure', 'Mood', 'Sleep', 'Medication', 'General', 'Meeting', 'Task', 'Ide'];
  const priorities = ['Tinggi', 'Sedang', 'Rendah'];
  const statuses = ['Draft', 'Berjalan', 'Selesai'];
  const icons = [
    { label: 'Document', value: 'document-text' },
    { label: 'Chat', value: 'chatbox-ellipses' },
    { label: 'Idea', value: 'bulb' },
    { label: 'Pulse', value: 'pulse' },
    { label: 'Heart', value: 'heart' },
    { label: 'Calendar', value: 'calendar' },
    { label: 'Flag', value: 'flag' },
  ];

  return (
    <LinearGradient colors={['#dbeafe', '#fef3c7', '#dbeafe']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => onNavigate && onNavigate('notes')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#2563eb" />
          <Text style={styles.backText}>Kembali ke Catatan</Text>
        </TouchableOpacity>

        <Card>
          <Text style={styles.formTitle}>
            {editNote ? 'Edit Catatan' : 'Tambah Catatan Baru'}
          </Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Judul</Text>
            <TextInput
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
              style={styles.input}
              placeholder="Masukkan judul catatan..."
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Kategori</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.type}
                  onValueChange={(itemValue) => setFormData({ ...formData, type: itemValue })}
                  style={styles.picker}
                >
                  {types.map((t) => (
                    <Picker.Item key={t} label={t} value={t} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={[styles.formGroup, { width: 140 }]}>
              <Text style={styles.label}>Tanggal</Text>
              <View style={styles.dateBox}>
                <Text style={styles.dateText}>{formData.date}</Text>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Prioritas</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.priority}
                  onValueChange={(itemValue) => setFormData({ ...formData, priority: itemValue })}
                  style={styles.picker}
                >
                  <Picker.Item label="Pilih prioritas" value="" />
                  {priorities.map((p) => (
                    <Picker.Item key={p} label={p} value={p.toLowerCase()} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>Status</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.status}
                  onValueChange={(itemValue) => setFormData({ ...formData, status: itemValue })}
                  style={styles.picker}
                >
                  <Picker.Item label="Pilih status" value="" />
                  {statuses.map((s) => (
                    <Picker.Item key={s} label={s} value={s} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Icon</Text>
            <View style={styles.iconRow}>
              {icons.map((ic) => (
                <TouchableOpacity
                  key={ic.value}
                  style={[
                    styles.iconButton,
                    formData.iconName === ic.value && styles.iconButtonActive,
                  ]}
                  onPress={() => setFormData({ ...formData, iconName: ic.value })}
                >
                  <Ionicons 
                    name={ic.value} 
                    size={20} 
                    color={formData.iconName === ic.value ? '#fff' : '#2563eb'} 
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Isi Catatan</Text>
            <TextInput
              value={formData.notes}
              onChangeText={(text) => setFormData({ ...formData, notes: text })}
              style={[styles.input, styles.textarea]}
              placeholder="Tulis isi catatan Anda di sini..."
              placeholderTextColor="#9ca3af"
              multiline
              textAlignVertical="top"
            />
          </View>

          <View style={styles.formActions}>
            <View style={[styles.buttonWrapper, { marginRight: 10 }]}>
              <ButtonCustom
                onPress={handleSubmit}
                iconName="checkmark"
                style={styles.primaryButton}
                textStyle={styles.primaryText}
              >
                {editNote ? 'Update Catatan' : 'Simpan Catatan'}
              </ButtonCustom>
            </View>

            <View style={styles.buttonWrapper}>
              <ButtonCustom
                onPress={() => onNavigate && onNavigate('notes')}
                variant="secondary"
                style={styles.cancelButton}
                textStyle={styles.cancelText}
              >
                Batal
              </ButtonCustom>
            </View>
          </View>
        </Card>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 100 },
  backButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 24 
  },
  backText: { 
    fontSize: 16, 
    color: '#2563eb', 
    marginLeft: 8 
  },
  formTitle: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#1f2937', 
    marginBottom: 32 
  },
  formGroup: { 
    marginBottom: 20 
  },
  label: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#374151', 
    marginBottom: 8 
  },
  input: { 
    borderWidth: 1, 
    borderColor: 'rgba(0,0,0,0.1)', 
    borderRadius: 12, 
    padding: 12, 
    backgroundColor: 'rgba(255,255,255,0.95)', 
    fontSize: 16 
  },
  textarea: { 
    height: 120, 
    textAlignVertical: 'top' 
  },
  pickerContainer: { 
    borderWidth: 1, 
    borderColor: 'rgba(0,0,0,0.1)', 
    borderRadius: 12, 
    backgroundColor: 'rgba(255,255,255,0.95)', 
    overflow: 'hidden' 
  },
  picker: { 
    height: 44 
  },
  formActions: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 24 
  },
  row: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    marginBottom: 8 
  },
  dateBox: { 
    borderWidth: 1, 
    borderColor: 'rgba(0,0,0,0.1)', 
    borderRadius: 12, 
    padding: 12, 
    backgroundColor: 'rgba(255,255,255,0.95)', 
    alignItems: 'center' 
  },
  dateText: { 
    color: '#111827' 
  },
  iconRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    flexWrap: 'wrap' 
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dbeafe',
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  iconButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  buttonWrapper: { 
    flex: 1 
  },
  primaryButton: { 
    width: '100%' 
  },
  cancelButton: {
    width: '100%',
    backgroundColor: '#eef2ff',
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  primaryText: { 
    color: '#0f172a' 
  },
  cancelText: { 
    color: '#2563eb' 
  },
});

export default AddNoteScreen;