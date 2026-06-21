import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GuideContent() {
  return (
    <View>
      <Text style={styles.header}>GUÍA PARA EL PÚBLICO</Text>
      <Text style={styles.subheader}>¿Qué significan estos números?</Text>
      <View style={styles.card}><Text style={styles.h2}>1. El Indice Kp (Pulso Solar)</Text><Text style={style={styles.bodyText}>Mide la actividad de las tormentas geomagnéticas (0 a 9). Cuando el Sol emite viento solar, golpea la magnetosfera. Chizhevsky demostró estadísticamente que estos golpes alteran la conducta humana y biológica.</Text></View>
      <View style={styles.card}><Text style={styles.h2}>2. Los Micro-Teslas (µT) Locales</Text><Text style={style={style={styles.bodyText}}>El campo de la Tierra mide unos 25 a 65 µT. Si sube drásticamente, es "electropolución" (antenas, 5G). Para la Cuarta Ley, esto es "ruido termodinámico" que obliga al cuerpo a gastar energía extra.</Text></View>
      <View style={styles.card}><Text style={styles.h2}>3. El Índice de Carga (0-100)</Text><Text style={style={styles.bodyText}>Mide cuánto "trabajo termodinámico" hace su entorno. Verde (0-40) es acoplamiento eficiente. Rojo (>70) es entorno perturbado.</Text></View>
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
