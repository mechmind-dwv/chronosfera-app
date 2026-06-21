import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ManifestoContent() {
  return (
    <View>
      <Text style={styles.header}>MANIFIESTO</Text>
      <Text style={{textAlign:'center', color:'#38bdf8', fontSize:16, fontWeight:'bold', marginBottom:20}}>CHRONOSFERA: El Pulso de la Noósfera</Text>
      <Text style={{textAlign:'center', fontStyle:'italic', color:'#94a3b8', marginBottom:20}}>Monitor de Acoplamiento Solar y Carga Disipativa para la Validación Ciudadana de la Vida como Imperativo Entrópico.</Text>
      <View style={styles.card}><Text style={styles.h2}>De la Marginalidad al Centro</Text><Text style={styles.bodyText}>Durante décadas, la Heliobiología, la Cronobiología de la Noósfera (Vernadsky/Halberg) y la Magnetobiología han sido relegadas a los márgenes. Si aceptamos la Cuarta Ley de la Termodinámica, la vida no es una anomalía estadística: es una cualidad física inevitable. Somos estructuras disipativas cuyo propósito es degradar gradientes de energía(3).</Text></View>
      <View style={styles.card}><Text style={styles.h2}>Ecuación Fundamental</Text><Text style={styles.bodyText}>La app cuantifica la producción de entropía local (σ) basándose en la ecuación: σ = Σ(Ji * Xi) ≥ 0. Traducimos la complejidad ambiental en un índice comprensible que cruza datos cósmicos (Kp), locales (σ) y fisiológicos (VFC).</Text></View>
      <View style={styles.card}><Text style={styles.h2}>Linaje Científico y Agradecimientos</Text><Text style={styles.bodyText}>Este software no sería posible sin la mente de los pioneros: Alexander L. Chizhevsky, Franz Halberg, Vladimir Vernadsky, Ilya Prigogine y Mikhail N. Zhadin.</Text></View>
      <View style={styles.synthesisCard}>
        <Text style={{color:'#38bdf8', fontSize:12, fontWeight:'bold', marginBottom:10}}>Dirección Científica del Proyecto</Text>
        <Text style={{fontWeight:'bold', color:'#ffffff', fontSize:16}}>Benjamin Cabeza Duran</Text>
        <Text style={{fontStyle:'italic', color:'#cbd5e1', marginTop:15}}>"En la acción de organizar, el universo no solo se disipa; se enriquece."</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20 },
  header: { fontSize: 24, fontWeight: '900', color: '#f8fafc', letterSpacing: 4, marginBottom: 5, marginTop: 10, textAlign:'center' },
  card: { backgroundColor: '#0f172a', padding: 20, borderRadius: 12, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#334155' },
  h2: { color: '#38bdf8', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  bodyText: { color: '#cbd5e1', fontSize: 14, lineHeight: 22, marginBottom: 10 },
  synthesisCard: { backgroundColor: '#1e293b', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#334155', marginBottom: 20 },
});
