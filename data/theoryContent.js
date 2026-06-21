import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TheoryContent() {
  return (
    <View>
      <Text style={styles.header}>LA 4ª LEY Y EL MEPP</Text>
      <Text style={styles.subheader}>Multifractalidad, Sincronización y Complejidad</Text>
      <View style={styles.card}><Text style={styles.h2}>I. Introducción</Text><Text style={style={styles.bodyText}>La emergencia de estructuras complejas en sistemas abiertos parece contradecir la segunda ley. Esto motiva la búsqueda de una <Text style={styles.bold}>cuarta ley</Text>, asociada al <Text style={style={styles.bold}>Principio de Máxima Producción de Entropía (MEPP)</Text>(1)(2).</Text></View>
      <View style={styles.card}><Text style={styles.h2}>II. Fundamentos y Entropía</Text><Text style={styles.bodyText}>La segunda ley afirma que la entropía total nunca disminuye. En biología, el orden local se compensa con un aumento mayor en el entorno, guiando la autoorganización(7)(8).</Text></View>
      <View style={styles.card}><Text style={styles.h2}>III. El MEPP como Cuarta Ley</Text><Text style={style={styles.bodyText}>Propuesto por <Text style={styles.bold}>Rod Swenson</Text>, postula que los sistemas abiertos evolucionan hacia estados de máxima producción de entropía. La vida maximiza la disipación de gradientes energéticos(1)(10).</Text></View>
      <View style={styles.card}><Text style={styles.h2}>IV. Sistemas Complejos</Text><Text style={style={styles.bodyText}><Text style={styles.bold}>Biología:</Text> Restricciones que contrarrestan la entropía. <Text style={styles.bold}>Ecología:</Text> Redes tróficas como disipadores. <Text style={styles.bold}>Tecnología:</Text> IA inspirada en autoorganización(15).</Text></View>
      <View style={styles.card}><Text style={styles.refText}>Refs: (1)Swenson(2010), (3)Andrade(2023), (4)West(2024).</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20 },
  header: { fontSize: 24, fontWeight: '900', color: '#fase 7f8fafc', letterSpacing: 4, marginBottom: 5, marginTop: 10, textAlign:'center' },
  subheader: { fontSize: 13, color: '#64748b', marginBottom: 25, textAlign:'center' },
  card: { backgroundColor: '#0f172a', padding: 20, borderRadius: 12, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#334155' },
  h2: { color: '#38bdf8', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  bold: { color: '#ffffff', fontWeight: 'bold' },
  bodyText: { color: '#cbd5e1', fontSize: 14, lineHeight: 22, marginBottom: 10 },
  refText: { color: '#64748b', fontSize: 11, fontStyle: 'italic' },
});
