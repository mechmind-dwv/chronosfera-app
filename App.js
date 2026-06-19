import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import * as Sensors from 'expo-sensors';

export default function App() {
  const [magData, setMagData] = useState({ x: 0, y: 0, z: 0 });
  const [index, setIndex] = useState(0);
  const [useRealSensor, setUseRealSensor] = useState(false);

  useEffect(() => {
    let subscription;

    const startSensor = async () => {
      try {
        // Verificamos si estamos en un dispositivo real
        const isAvailable = await Sensors.Magnetometer.isAvailableAsync();
        if (isAvailable) {
          setUseRealSensor(true);
          subscription = Sensors.Magnetometer.addListener(setMagData);
          Sensors.Magnetometer.setUpdateInterval(1000);
        } else {
          // Si estamos en la web/Snack, simulamos el pulso terrestre para que se vea la UI
          setUseRealSensor(false);
          simulateEarthPulse();
        }
      } catch (error) {
        setUseRealSensor(false);
        simulateEarthPulse();
      }
    };

    // Simulador para que la app no se congele en PC/Web/Snack
    let intervalId;
    const simulateEarthPulse = () => {
      intervalId = setInterval(() => {
        const simulated = {
          x: (Math.random() - 0.5) * 20,
          y: -30 + (Math.random() - 0.5) * 15,
          z: (Math.random() - 0.5) * 10
        };
        setMagData(simulated);
      }, 1500);
    };

    startSensor();

    return () => {
      if (subscription) subscription.remove();
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    // Cálculo del Índice de Carga Disipativa (4ª Ley)
    const magnitude = Math.sqrt(magData.x ** 2 + magData.y ** 2 + magData.z ** 2);
    setIndex(Math.min(100, magnitude * 1.5));
  }, [magData]);

  const getStatus = () => {
    if (index < 40) return { text: "Acoplamiento Entrópico Óptimo", color: "#22c55e" };
    if (index < 70) return { text: "Flujo Disipativo Activo", color: "#eab308" };
    return { text: "Perturbación - Ruido Termodinámico", color: "#ef4444" };
  };

  const status = getStatus();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CHRONOSFERA</Text>
      <Text style={styles.subheader}>Monitor de Estructuras Disipativas</Text>

      <View style={[styles.gaugeBox, { borderColor: status.color }]}>
        <Text style={styles.value}>{index.toFixed(1)}</Text>
        <Text style={[styles.statusText, { color: status.color }]}>{status.text}</Text>
      </View>

      <View style={styles.dataBox}>
        <Text style={styles.title}>Fuerzas Termodinámicas (Xi):</Text>
        <Text style={styles.data}>Campo X: {magData.x.toFixed(2)} µT</Text>
        <Text style={styles.data}>Campo Y: {magData.y.toFixed(2)} µT</Text>
        <Text style={styles.data}>Campo Z: {magData.z.toFixed(2)} µT</Text>
        <Text style={styles.source}>
          {useRealSensor ? "📡 Sensor Físico Activo" : "☁️ Modo Simulación (Snack/Web)"}
        </Text>
      </View>
      
      <Text style={styles.footer}>
        "La vida es la cualidad física inevitable para maximizar σ."
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20, alignItems: 'center', justifyContent: 'center' },
  header: { fontSize: 28, fontWeight: '900', color: '#f8fafc', letterSpacing: 4, marginBottom: 5 },
  subheader: { fontSize: 14, color: '#64748b', marginBottom: 40 },
  gaugeBox: { width: 260, height: 260, borderRadius: 130, borderWidth: 4, justifyContent: 'center', alignItems: 'center', marginBottom: 40, backgroundColor: '#0f172a' },
  value: { fontSize: 60, fontWeight: 'bold', color: '#ffffff' },
  statusText: { fontSize: 16, fontWeight: '700', marginTop: 10, textAlign: 'center', paddingHorizontal: 10 },
  dataBox: { backgroundColor: '#0f172a', padding: 20, borderRadius: 12, width: '100%', marginBottom: 30 },
  title: { color: '#38bdf8', fontWeight: 'bold', marginBottom: 10, fontSize: 14 },
  data: { color: '#cbd5e1', fontSize: 13, marginBottom: 5, fontFamily: 'monospace' },
  source: { color: '#475569', fontSize: 11, marginTop: 15, textAlign: 'center', fontStyle: 'italic' },
  footer: { color: '#475569', fontSize: 11, textAlign: 'center', fontStyle: 'italic' }
});
