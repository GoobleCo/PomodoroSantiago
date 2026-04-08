import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Audio } from 'expo-av';

// Tus componentes
import Header from './src/components/Header';
import Tabs from './src/components/Tabs';
import Timer from './src/components/Timer';
import ControlButton from './src/components/ControlButton';

// Tiempos en segundos
const TIMES = {
  PM: 25 * 60,
  DC: 5 * 60,
  DL: 15 * 60,
};

// Colores de fondo para cada modo
const COLORS = {
  PM: '#ba4949', // Rojo para Pomodoro
  DC: '#38858a', // Verde para Descanso Corto
  DL: '#397097', // Azul para Descanso Largo
};

export default function App() {
  // --- ESTADOS ---
  const [mode, setMode] = useState('PM'); 
  const [timeLeft, setTimeLeft] = useState(TIMES.PM);
  const [isActive, setIsActive] = useState(false);

  // --- FUNCIONES DE AUDIO ---
  const playClickSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/click.mp3')
      );
      await sound.playAsync();
    } catch (error) {
      console.log("Error al reproducir el click", error);
    }
  };

  const playAlarmSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/alarm.mp3')
      );
      await sound.playAsync();
    } catch (error) {
      console.log("Error al reproducir la alarma", error);
    }
  };

  // --- LÓGICA DEL TEMPORIZADOR ---
  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      playAlarmSound(); // Suena la alarma al llegar a cero
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // --- FUNCIONES DE LOS BOTONES ---
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setTimeLeft(TIMES[newMode]);
    setIsActive(false);
  };

  // AQUÍ ESTÁ LA FUNCIÓN QUE PREGUNTABAS:
  const handleToggleTimer = () => {
    playClickSound(); // Suena el click
    setIsActive(!isActive); // Inicia o detiene el reloj
  };

  // --- LA INTERFAZ (RENDER) ---
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS[mode] }]}>
      <View style={styles.content}>
        <Header />
        
        <Tabs currentMode={mode} setMode={handleModeChange} />
        
        <Timer time={timeLeft} />
        
        {/* AQUÍ LE PASAMOS LA FUNCIÓN AL BOTÓN */}
        <ControlButton 
          isActive={isActive} 
          onPress={handleToggleTimer} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  content: { 
    flex: 1, 
    paddingHorizontal: 20,
    justifyContent: 'center', // Para que todo quede centrado verticalmente
  },
});