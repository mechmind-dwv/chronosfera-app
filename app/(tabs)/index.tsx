import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import * as Network from 'expo-network';

export default function HeliobiologiaScreen() {
  const [mag, setMag] = useState({ x: 0, y: 0, z: 0 });
  const [network, setNetwork] = useState(0);
  const [entropyIndex, setEntropyIndex] = useState(0);

  useEffect(() => {
    const subMag = Magnetometer.addListener(setMag);
    Network.getNetworkStateAsync().then(state => setNetwork(state.isInternetReachable ? 1 : 0));
    Magnetometer.setUpdateInterval(1000);
    return () => subMag.remove();
  }, []);

  useEffect(() => {
    const magnitude = Math.sqrt(mag.x**2 + mag.y**2 + mag.z**2);
    // La vida maximiza la disipación. Este índice mide la "carga" del entorno.
    const index = Math.min(100, (magnitude * 1.5) + (network * 20));
    setEntropyIndex(index);
  }, [mag, network]);

  const getStatus = () => {
    if (entropyIndex < 40) return { text: "Acoplamiento Entrópico Óptimo (Chizhevsky)", color: "#22c55e" };
    if (entropyIndex < 70) return { text: "Flujo Disipativo Activo", color: "#eab308" };
    return { text: "Perturbación - Ruido Termodinámico", color: "#ef4444" };
  };

  const status = getStatus();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CHRONOSFERA</Text>
      <Text style={styles.subheader}>Monitor de Estructuras Disipativas</Text>

      <View style={[styles.gaugeBox, { borderColor: status.color }]}>
        <Text style={styles.value}>{entropyIndex.toFixed(1)}</Text>
        <Text style={[styles.statusText, { color: status.color }]}>{status.text}</Text>
      </View>

      <View style={styles.dataBox}>
        <Text style={styles.title}>Fuerzas Termodinámicas (Xi) del Entorno:</Text>
        <Text style={styles.data}>Campo Magnético X: {mag.x.toFixed(2)} µT</Text>
        <Text style={styles.data}>Campo Magnético Y: {mag.y.toFixed(2)} µT</Text>
        <Text style={styles.data}>Campo Magnético Z: {mag.z.toFixed(2)} µT</Text>
        <Text style={styles.data}>Electropolución (RF): {network ? "Presente" : "Nula"}</Text>
      </View>
      
      <Text style={styles.footer}>
        "La vida no es una casualidad, es la cualidad física inevitable del universo para maximizar la entropía."
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20, alignItems: 'center' },
  header: { fontSize: 28, fontWeight: '900', color: '#f8fafc', letterSpacing: 4, marginTop: 20 },
  subheader: { fontSize: 14, color: '#64748b', marginBottom: 40 },
  gaugeBox: { width: 260, height: 260, borderRadius: 130, borderWidth: 4, justifyContent: 'center', alignItems: 'center', marginBottom: 40, backgroundColor: '#0f172a' },
  value: { fontSize: 60, fontWeight: 'bold', color: '#ffffff' },
  statusText: { fontSize: 16, fontWeight: '700', marginTop: 10, textAlign: 'center', paddingHorizontal: 10 },
  dataBox: { backgroundColor: '#0f172a', padding: 20, borderRadius: 12, width: '100%', marginBottom: 30 },
  title: { color: '#38bdf8', fontWeight: 'bold', marginBottom: 10, fontSize: 14 },
  data: { color: '#cbd5e1', fontSize: 13, marginBottom: 5, fontFamily: 'monospace' },
  footer: { color: '#475569', fontSize: 11, textAlign: 'center', fontStyle: 'italic' }
});
