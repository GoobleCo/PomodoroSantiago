import { View, Text, StyleSheet } from 'react-native';

export default function Timer({ time }) {
  // Convertimos los segundos a formato MM:SS
  const formattedTime = `${Math.floor(time / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formattedTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  timeText: { fontSize: 80, fontWeight: 'bold' },
});