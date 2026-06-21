import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HelioContent() {
  return (
    <View>
      <Text style={styles.header}>HELIBIOLOGÍA</Text>
      <Text style={styles.subheader}>Chizhevsky y la Cronosfera</Text>
      <View style={styles.card}><Text style={styles.h2}>Alexander Chizhevsky (1897-1964)</Text><Text style={style={styles.bodyText}>Padre de la Heliobiología. En 1915, usando telescopios y estadísticas históricas, demostró que las manchas solares y las tormentas geomagnéticas coinciden exactamente con epidemias y cambios masivos en la psique humana. Fue encerrado en el Gulag por sus descubrimientos.</Text></View>
      <View style={styles.card}><Text style={styles.h2}>Franz Halberg (1919-2013)</Text><Text style={style={styles.bodyText}>Padre de la Cronobiología. Descubrió que la biología está sincronizada con ciclos del entorno (ritmos multiseptanos, trans-anuales). Llamó a esto la "Cronosfera". Sus estudios ligaron arritmias cardíacas y muertes súbitas con ciclos de 1.3 años del magnetismo solar.</Text></View>
      <View style={styles.card}><Text style={styles.h2}>De Marginales a Centrales</Text><Text style={style={styles.bodyText}>Bajo la Cuarta Ley, estas ciencias son el númeno de la física: demuestran que el ser humano es un nodo acoplado a los ritmos del cosmos, actuando como una estructura disipativa.</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20 },
  header: { fontSize: 24, fontWeight: '900', color: '#f8fafc', letterSpacing: 4, marginBottom: 5, marginTop: 10, textAlign:'center' },
  subheader: { fontSize: 13, color: '#64748b', marginBottom: 25, textAlign:'center' },
  card: { backgroundColor: '#0f172a', padding: 20, borderRadius: 12, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#334155' },
  h2: { color: '#38bdf8', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  bodyText: { color: '#cbd5e1', fontSize: 14, lineHeight: 22, marginBottom: 10 },
});
