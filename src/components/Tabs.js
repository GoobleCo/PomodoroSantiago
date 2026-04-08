import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Tabs({ currentMode, setMode }) {
  const options = [
    { id: 'PM', label: 'Pomodoro' },
    { id: 'DC', label: 'Corto' },
    { id: 'DL', label: 'Largo' },
  ];

  return (
    <View style={styles.container}>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt.id}
          style={[styles.tab, currentMode === opt.id && styles.activeTab]}
          onPress={() => setMode(opt.id)}
        >
          <Text style={[styles.text, currentMode === opt.id && styles.activeText]}>
            {opt.id}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
  tab: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, width: '30%', alignItems: 'center' },
  activeTab: { backgroundColor: '#333', borderColor: '#333' },
  text: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  activeText: { color: '#fff' },
});