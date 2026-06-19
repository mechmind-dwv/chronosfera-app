import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function TheoryScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>La Cuarta Ley y la Noósfera</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>El Imperativo Entrópico</Text>
        <Text style={styles.text}>
          La Segunda Ley dicta que el universo tiende al desorden. La Cuarta Ley explica el cómo: un sistema abierto, lejos del equilibrio, evoluciona hacia la complejidad estructural (vida) para acelerar esa degradación de energía. El orden local es el motor del caos global.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Heliobiología (Chizhevsky)</Text>
        <Text style={styles.text}>
          Alexander Chizhevsky demostró que las tormentas solares no son fenómenos aislados. Son pulsos de energía (gradientes Xi) que modifican la excitabilidad nerviosa terrestre (flujos Ji). Las epidemias y revoluciones son respuestas biológicas al "Eco Terrenal de las Tormentas Solares".
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>La Cronosfera (Halberg)</Text>
        <Text style={styles.text}>
          Franz Halberg cartografió cómo los ritmos biológicos (multiseptanos, trans-anuales) están sincronizados con los ciclos geomagnéticos. La biología no tiene relojes internos aislados; resuena con la frecuencia del planeta y el cosmos.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Electropolución y Aeroionización</Text>
        <Text style={styles.text}>
          Si la vida requiere acoplarse a los ritmos naturales para disipar energía eficientemente, la contaminación electromagnética artificial (electropolución) actúa como "ruido termodinámico". Rompe la señal de la Cronosfera, obligando al organismo a gastar energía en mantener su estructura, en lugar de disiparla fluidamente.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#f8fafc', marginBottom: 20, marginTop: 10 },
  card: { backgroundColor: '#0f172a', padding: 20, borderRadius: 12, marginBottom: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#38bdf8', marginBottom: 10 },
  text: { fontSize: 14, color: '#94a3b8', lineHeight: 22 }
});
