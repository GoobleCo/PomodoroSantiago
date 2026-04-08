
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ControlButton({ isActive, onPress }) {
  return (
    <TouchableOpacity 
      style={[styles.button, isActive ? styles.stopButton : styles.startButton]} 
      onPress={onPress}
    >
      <Text style={styles.text}>{isActive ? 'PARAR' : 'INICIAR'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { padding: 20, borderRadius: 15, alignItems: 'center', marginVertical: 30, width: '60%', alignSelf: 'center' },
  startButton: { backgroundColor: '#4CAF50' },
  stopButton: { backgroundColor: '#F44336' },
  text: { color: 'white', fontSize: 20, fontWeight: 'bold' },
});