import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { calculateMagnitude, calculateEntropyIndex, getStatus } from './utils/entropyCalculator';

export default function App() {
  const [index, setIndex] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newX = (Math.random() - 0.5) * 20;
      const newY = -35 + (Math.random() - 0.5) * 15;
      const newZ = (Math.random() - 0.5) * 10;
      
      setX(newX);
      setY(newY);
      setZ(newZ);
      
      // Ahora usamos el módulo científico externo
      const magnitude = calculateMagnitude(newX, newY, newZ);
      setIndex(calculateEntropyIndex(magnitude));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const status = getStatus(index);

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
        <Text style={styles.data}>Campo X: {x.toFixed(2)} µT</Text>
        <Text style={styles.data}>Campo Y: {y.toFixed(2)} µT</Text>
        <Text style={styles.data}>Campo Z: {z.toFixed(2)} µT</Text>
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
  footer: { color: '#475569', fontSize: 11, textAlign: 'center', fontStyle: 'italic' }
});
