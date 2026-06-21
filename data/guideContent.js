import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GuideContent() {
  return (
    <View>
      <Text style={styles.header}>GUÍA PARA EL PÚBLICO</Text>
      <Text style={styles.subheader}>¿Qué significan estos números?</Text>
      <View style={styles.card}><Text style={styles.h2}>1. El Indice Kp (Pulso Solar)</Text><Text style={styles.bodyText}>Mide la actividad de las tormentas geomagnéticas en una escala de 0 a 9. No es magia; es física. Cuando el Sol emite viento solar, golpea la magnetosfera terrestre. Chizhevsky demostró estadísticamente que estos golpes alteran la conducta humana y biológica.</Text></View>
      <View style={styles.card}><Text style={styles.h2}>2. Los Micro-Teslas (µT) Locales</Text><Text style={styles.bodyText}>El campo magnético de la Tierra mide unos 25 a 65 µT. Si el número sube drásticamente, significa que hay "electropolución". Para la Cuarta Ley, esto es "ruido termodinámico" que obliga a su cuerpo a gastar energía extra.</Text></View>
      <View style={styles.card}><Text style={styles.h2}>3. El Índice de Carga (0-100)</Text><Text style={styles.bodyText}>Es nuestra métrica basada en la Cuarta Ley. Representa cuánto "trabajo termodinámico" debe hacer su entorno inmediato. Si está en verde (0-40), el acoplamiento es eficiente. Si pasa a rojo (>70), el entorno está perturbado.</Text></View>
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
