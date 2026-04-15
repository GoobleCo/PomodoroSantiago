import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, useWindowDimensions, Switch, Text } from 'react-native';
import { Audio } from 'expo-av';

import Header from './src/components/Header';
import Tabs from './src/components/Tabs';
import Timer from './src/components/Timer';
import ControlButton from './src/components/ControlButton';

const TIMES = {
  PM: 25 * 60,
  DC: 5 * 60,
  DL: 15 * 60,
};

const COLORS = {
  PM: '#ba4949',
  DC: '#38858a',
  DL: '#397097',
};

export default function App() {
  const [mode, setMode] = useState('PM'); 
  const [timeLeft, setTimeLeft] = useState(TIMES.PM);
  const [isActive, setIsActive] = useState(false);
  
  // 2. Estado para el Modo Oscuro
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 3. Detectar Orientación
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const playClickSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(require('./assets/click.mp3'));
      await sound.playAsync();
    } catch (error) { console.log("Error click", error); }
  };

  const playAlarmSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(require('./assets/alarm.mp3'));
      await sound.playAsync();
    } catch (error) { console.log("Error alarma", error); }
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => { setTimeLeft((time) => time - 1); }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      playAlarmSound();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setTimeLeft(TIMES[newMode]);
    setIsActive(false);
  };

  const handleToggleTimer = () => {
    playClickSound();
    setIsActive(!isActive);
  };

  // Definir color de fondo dinámico
  const backgroundColor = isDarkMode ? '#1a1a1a' : COLORS[mode];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* 2. Switch de Modo Oscuro */}
      <View style={styles.themeContainer}>
        <Text style={{ color: 'white', marginRight: 8 }}>{isDarkMode ? "🌙" : "☀️"}</Text>
        <Switch
          value={isDarkMode}
          onValueChange={(value) => setIsDarkMode(value)}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>

      <View style={[
        styles.content, 
        isLandscape && styles.contentLandscape // 3. Cambio de layout si es horizontal
      ]}>
        
        {/* 1. El Header ahora tiene un estilo que podemos bajar */}
        <View style={isLandscape ? { flex: 1 } : { marginTop: 30 }}> 
          <Header />
        </View>
        
        <View style={isLandscape ? { flex: 2 } : { width: '100%' }}>
          <Tabs currentMode={mode} setMode={handleModeChange} />
          <Timer time={timeLeft} />
          <ControlButton isActive={isActive} onPress={handleToggleTimer} />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    transition: 'background-color 0.5s', // Nota: transition funciona mejor en web, en móvil es instantáneo
  },
  content: { 
    flex: 1, 
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentLandscape: {
    flexDirection: 'row', // En horizontal, pone los elementos uno al lado del otro
    justifyContent: 'space-around',
  },
  themeContainer: {
    position: 'absolute',
    top: 50, // Ajusta esto según tu barra de estado
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
});