import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TheoryContent() {
  return (
    <View>
      <Text style={styles.header}>LA 4ª LEY Y EL MEPP</Text>
      <Text style={styles.subheader}>Multifractalidad, Sincronización y Complejidad</Text>
      <View style={styles.card}><Text style={styles.h2}>I. Introducción</Text><Text style={styles.bodyText}>La termodinámica, desde su formulación en el siglo XIX, ha sido el fundamento para comprender la transformación de la energía. Sin embargo, la emergencia de estructuras complejas en sistemas abiertos parece contradecir la segunda ley. Esto motiva la búsqueda de una <Text style={styles.bold}>cuarta ley</Text>, asociada al <Text style={styles.bold}>Principio de Máxima Producción de Entropía (MEPP)</Text>(1)(2).</Text></View>
      <View style={styles.card}><Text style={styles.h2}>II. Fundamentos y Entropía</Text><Text style={styles.bodyText}>La segunda ley afirma que la entropía total nunca disminuye. En los sistemas biológicos, la disminución local de entropía (orden) se compensa con un aumento mayor en el entorno, gracias al flujo constante de energía. Así, la entropía guía la autoorganización(7)(8).</Text></View>
      <View style={styles.card}><Text style={styles.h2}>III. El MEPP como Cuarta Ley</Text><Text style={styles.bodyText}>Propuesto por <Text style={styles.bold}>Rod Swenson</Text>, postula que los sistemas abiertos evolucionan hacia estados de máxima producción de entropía. La vida maximiza la disipación de gradientes energéticos, generando organizaciones complejas(1)(10).</Text></View>
      <View style={styles.card}><Text style={styles.h2}>IV. Sistemas Complejos</Text><Text style={styles.bodyText}><Text style={styles.bold}>Biología:</Text> Los organismos usan energía para generar restricciones. <Text style={styles.bold}>Ecología:</Text> Los ecosistemas maximizan la disipación solar. <Text style={styles.bold}>Tecnología:</Text> Redes e IA se inspiran en la autoorganización(15).</Text></View>
      <View style={styles.card}><Text style={styles.h2}>V. Multifractalidad y Sincronización</Text><Text style={styles.bodyText}>La <Text style={styles.bold}>multifractalidad</Text> describe múltiples escalas de organización (ej. vasos sanguíneos). La <Text style={styles.bold}>sincronización multifractal</Text> es la alineación de la complejidad entre subsistemas (cerebro, corazón). Disrupciones causan patologías(4)(5).</Text></View>
      <View style={styles.card}><Text style={styles.refText}>Refs: (1)Swenson(2010), (3)Andrade(2023), (4)West(2024), (5)West(2023), (11)Martyushev(2010).</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20 },
  header: { fontSize: 24, fontWeight: '900', color: '#f8fafc', letterSpacing: 4, marginBottom: 5, marginTop: 10, textAlign:'center' },
  subheader: { fontSize: 13, color: '#64748b', marginBottom: 25, textAlign:'center' },
  card: { backgroundColor: '#0f172a', padding: 20, borderRadius: 12, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#334155' },
  h2: { color: '#38bdf8', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  bold: { color: '#ffffff', fontWeight: 'bold' },
  bodyText: { color: '#cbd5e1', fontSize: 14, lineHeight: 22, marginBottom: 10 },
  refText: { color: '#64748b', fontSize: 11, fontStyle: 'italic' },
});
