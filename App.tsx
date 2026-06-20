import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import { Zap, Sun, Activity, Info } from 'lucide-react-native';

// --- LÓGICA DEL ALGORITMO CHRONOSFERA ---
const calculateDissipativeIndex = (magnetometerData: any) => {
  const { x, y, z } = magnetometerData;
  // Magnitud del vector campo magnético local (µT)
  const magnitude = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  
  // Normalización simple para el ejemplo (ajustar según calibración)
  // Basado en la fórmula del manifiesto: (Mag * 0.5) + (RF * 0.3) + (Time * 0.2)
  const magContribution = Math.min(magnitude / 2, 50); // Cap en 50
  const rfSimulated = 15; // Placeholder para expo-network en Fase 2
  const timeSimulated = 10; 
  
  return Math.round(magContribution + rfSimulated + timeSimulated);
};

export default function App() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [kpIndex, setKpIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Suscripción al Magnetómetro
  useEffect(() => {
    const subscribe = Magnetometer.addListener(result => {
      setData(result);
    });
    Magnetometer.setUpdateInterval(100);
    return () => subscribe.remove();
  }, []);

  // Fetch de Clima Espacial (NOAA)
  useEffect(() => {
    fetch('https://services.swpc.noaa.gov/products/noaa-scales.json')
      .then(res => res.json())
      .then(json => {
        const currentKp = parseInt(json['0'].MagStorm.kp);
        setKpIndex(currentKp);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const dissipativeIndex = calculateDissipativeIndex(data);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header - Identidad Visual */}
        <View style={styles.header}>
          <Text style={styles.title}>CHRONOSFERA</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>EL PULSO DE LA NOÓSFERA</Text>
          </View>
        </View>

        {/* Monitor Principal */}
        <View style={styles.mainGauge}>
          <Activity size={32} color="#38bdf8" />
          <Text style={styles.gaugeValue}>{dissipativeIndex}</Text>
          <Text style={styles.gaugeLabel}>Índice de Carga Disipativa (σ)</Text>
          <Text style={styles.statusText}>
            {dissipativeIndex < 25 ? "EQUILIBRIO ENTRÓPICO" : 
             dissipativeIndex < 50 ? "FLUJO ACTIVO" : "RUIDO TERMODINÁMICO"}
          </Text>
        </View>

        {/* Datos en Tiempo Real */}
        <View style={styles.grid}>
          <View style={styles.card}>
            <Zap size={20} color="#f59e0b" />
            <Text style={styles.cardTitle}>Magnetómetro</Text>
            <Text style={styles.cardValue}>{Math.round(Math.sqrt(data.x**2 + data.y**2 + data.z**2))} µT</Text>
          </View>

          <View style={styles.card}>
            <Sun size={20} color="#22c55e" />
            <Text style={styles.cardTitle}>Índice Kp (NOAA)</Text>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.cardValue}>Kp {kpIndex || '0'}</Text>
            )}
          </View>
        </View>

        {/* Manifiesto Rápido */}
        <View style={styles.manifestoCard}>
          <Info size={16} color="#94a3b8" />
          <Text style={styles.manifestoText}>
            "La vida no es una anomalía, es un imperativo termodinámico para degradar gradientes de energía."
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#38bdf8',
    letterSpacing: 4,
  },
  badge: {
    backgroundColor: '#38bdf820',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#38bdf8',
  },
  badgeText: {
    color: '#38bdf8',
    fontSize: 10,
    fontWeight: 'bold',
  },
  mainGauge: {
    width: '100%',
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 20,
  },
  gaugeValue: {
    fontSize: 84,
    fontWeight: '100',
    color: '#fff',
  },
  gaugeLabel: {
    color: '#94a3b8',
    fontSize: 14,
    letterSpacing: 1,
  },
  statusText: {
    color: '#22c55e',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    backgroundColor: '#1e293b',
    width: '48%',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitle: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 8,
  },
  cardValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  manifestoCard: {
    marginTop: 30,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
  },
  manifestoText: {
    color: '#64748b',
    fontSize: 12,
    fontStyle: 'italic',
    marginLeft: 10,
    flexShrink: 1,
  },
});
