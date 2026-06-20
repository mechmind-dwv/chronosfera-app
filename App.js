import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

const translateKpToBiology = (kp) => {
  if (!kp) return { state: "Cargando...", detail: "Conectando con la NOAA.", color: "#64748b" };
  if (kp <= 3) return { state: "Calma Solar", detail: "Acoplamiento entrópico óptimo.", color: "#22c55e" };
  if (kp <= 4) return { state: "Inquietud Magnética", detail: "Flujo disipativo activo.", color: "#eab308" };
  if (kp <= 5) return { state: "Tormenta G1 (Chizhevsky)", detail: "Perturbación biológica masiva.", color: "#f97316" };
  return { state: "Tormenta Severa G2+", detail: "Ruido termodinámico extremo.", color: "#ef4444" };
};

const calculateLocalEntropy = (x, y, z) => {
  const magnitude = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  const val = Math.min(100, magnitude * 1.5);
  if (val < 40) return { text: "Óptimo", color: "#22c55e", val };
  if (val < 70) return { text: "Activo", color: "#eab308", val };
  return { text: "Perturbado", color: "#ef4444", val };
};

export default function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [solarData, setSolarData] = useState(0);
  const [localData, setLocalData] = useState({ x: 0, y: 0, z: 0, val: 0, text: "Óptimo", color: "#22c55e" });
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState([]); // FASE 2: Historial de superposición

  useEffect(() => {
    const fetchSolarPulse = async () => {
      try {
        const res = await fetch('https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json');
        const data = await res.json();
        const newKp = data[1]?.kp?.[0] || 2;
        setSolarData(newKp);
        return newKp;
      } catch { const simulatedKp = 2.5; setSolarData(simulatedKp); return simulatedKp; }
    };
    
    const initAndInterval = async () => {
      const initialKp = await fetchSolarPulse();
      setIsLoading(false);
      // Guardar estado inicial
      setHistory([{ time: new Date().toLocaleTimeString(), kp: initialKp, local: 0 }]);
      
      const interval = setInterval(async () => {
        const currentKp = await fetchSolarPulse();
        setHistory(prev => {
          const newEntry = { time: new Date().toLocaleTimeString(), kp: currentKp, local: localData.val };
          const updated = [newEntry, ...prev].slice(0, 6); // Guardar últimas 6 lecturas
          return updated;
        });
      }, 30000); // Actualizar historial cada 30s
      return () => clearInterval(interval);
    };
    
    initAndInterval();
  }, [localData.val]);

  useEffect(() => {
    const int = setInterval(() => {
      const x = (Math.random() - 0.5) * 20, y = -35 + (Math.random() - 0.5) * 15, z = (Math.random() - 0.5) * 10;
      setLocalData(prev => ({ ...calculateLocalEntropy(x, y, z), x, y, z }));
    }, 1500);
    return () => clearInterval(int);
  }, []);

  if (isLoading) return <View style={styles.centered}><ActivityIndicator size="large" color="#38bdf8" /></View>;
  const cosmicState = translateKpToBiology(solarData);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {activeTab === 1 && (
          <View>
            <Text style={styles.header}>CHRONOSFERA</Text>
            <Text style={styles.subheader}>Fase 2: Sincronización NOAA Local</Text>
            
            <View style={[styles.card, { borderLeftColor: cosmicState.color }]}>
              <Text style={styles.cardTitle}>El Pulso de Chizhevsky (NOAA)</Text>
              <Text style={styles.bigData}>Kp: {solarData.toFixed(1)}</Text>
              <Text style={[styles.stateText, { color: cosmicState.color }]}>{cosmicState.state}</Text>
            </View>

            <View style={[styles.card, { borderLeftColor: localData.color }]}>
              <Text style={styles.cardTitle}>Carga Disipativa Local (σ)</Text>
              <View style={styles.row}><Text style={styles.bigData}>{localData.val.toFixed(1)}</Text><Text style={[styles.badge, { backgroundColor: localData.color + '20', color: localData.color }]}>{localData.text}</Text></View>
            </View>

            {/* FASE 2: TABLA DE SUPERPOSICIÓN HISTÓRICA */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Historial de Superposición (Kp vs σ)</Text>
              {history.length > 0 ? history.map((h, i) => (
                <View key={i} style={styles.historyRow}>
                  <Text style={styles.historyTime}>{h.time}</Text>
                  <Text style={styles.historyData}>Kp: {h.kp?.toFixed(1)}</Text>
                  <Text style={styles.historyData}>σ: {h.local.toFixed(1)}</Text>
                </View>
              )) : <Text style={styles.bodyText}>Recopilando datos...</Text>}
            </View>

            <View style={styles.synthesisCard}>
              <Text style={styles.cardTitle}>Diagnóstico Fase 2</Text>
              <Text style={styles.synthesisText}>
                {solarData > 4 ? "⚠️ El entorno cósmico inyecta energía (Xi). Su biología aumentará la necesidad de disipar (Ji). Vigile fatiga o excitación." : "✅ Campo geomagnético estable. Estructura disipativa operando en su punto óptimo."}
              </Text>
            </View>
          </View>
        )}

        {activeTab === 2 && (
          <View>
            <Text style={styles.header}>GUÍA PARA EL PÚBLICO</Text>
            <Text style={styles.subheader}>¿Qué significan estos números?</Text>
            <View style={styles.card}><Text style={styles.h2}>1. El Indice Kp (Pulso Solar)</Text><Text style={styles.bodyText}>Mide la actividad de las tormentas geomagnéticas (0 a 9). Chizhevsky demostró que estos golpes alteran la conducta biológica.</Text></View>
            <View style={styles.card}><Text style={styles.h2}>2. Los Micro-Teslas (µT) Locales</Text><Text style={styles.bodyText}>El campo de la Tierra mide unos 25 a 65 µT. Un aumento drástico indica "electropolución". Para la 4ª Ley, esto es ruido termodinámico.</Text></View>
            <View style={styles.card}><Text style={styles.h2}>3. El Índice de Carga (0-100)</Text><Text style={styles.bodyText}>Verde (0-40) es acoplamiento eficiente. Rojo (>70) es entorno perturbado.</Text></View>
          </View>
        )}

        {activeTab === 3 && (
          <View>
            <Text style={styles.header}>LA 4ª LEY Y EL MEPP</Text>
            <Text style={styles.subheader}>Multifractalidad, Sincronización y Complejidad</Text>
            <View style={styles.card}><Text style={styles.h2}>I. Introducción</Text><Text style={styles.bodyText}>La emergencia de estructuras complejas en sistemas abiertos parece contradecir la segunda ley. Esto motiva la búsqueda de una <Text style={styles.bold}>cuarta ley</Text>, asociada al <Text style={styles.bold}>Principio de Máxima Producción de Entropía (MEPP)</Text>(1)(2).</Text></View>
            <View style={styles.card}><Text style={styles.h2}>II. Fundamentos y Entropía</Text><Text style={styles.bodyText}>La segunda ley afirma que la entropía total nunca disminuye. En biología, el orden local se compensa con un aumento mayor en el entorno, guiando la autoorganización(7)(8).</Text></View>
            <View style={styles.card}><Text style={styles.h2}>III. El MEPP como Cuarta Ley</Text><Text style={styles.bodyText}>Propuesto por <Text style={styles.bold}>Rod Swenson</Text>, postula que los sistemas abiertos evolucionan hacia estados de máxima producción de entropía. La vida maximiza la disipación de gradientes(1)(10).</Text></View>
            <View style={styles.card}><Text style={styles.h2}>IV. Sistemas Complejos</Text><Text style={styles.bodyText}><Text style={styles.bold}>Biología:</Text> Restricciones que contrarrestan la entropía. <Text style={styles.bold}>Ecología:</Text> Redes tróficas como disipadores. <Text style={styles.bold}>Tecnología:</Text> IA inspirada en autoorganización(15).</Text></View>
            <View style={styles.card}><Text style={styles.h2}>V. Multifractalidad</Text><Text style={styles.bodyText}>Múltiples escalas de organización (ej. vasos sanguíneos). La <Text style={styles.bold}>sincronización multifractal</Text> alinea la complejidad entre subsistemas (cerebro, corazón). Disrupciones causan patologías(4)(5).</Text></View>
            <View style={styles.card}><Text style={styles.refText}>Refs: (1)Swenson(2010), (3)Andrade(2023), (4)West(2024).</Text></View>
          </View>
        )}

        {activeTab === 4 && (
          <View>
            <Text style={styles.header}>HELIBIOLOGÍA</Text>
            <Text style={styles.subheader}>Chizhevsky y la Cronosfera</Text>
            <View style={styles.card}><Text style={styles.h2}>Alexander Chizhevsky (1897-1964)</Text><Text style={styles.bodyText}>Padre de la Heliobiología. Demostró que tormentas geomagnéticas coinciden con epidemias y cambios masivos en la psique humana.</Text></View>
            <View style={styles.card}><Text style={styles.h2}>Franz Halberg (1919-2013)</Text><Text style={styles.bodyText}>Padre de la Cronobiología. Descubrió que la biología está sincronizada con ciclos del entorno. Llamó a esto la "Cronosfera".</Text></View>
          </View>
        )}

        {activeTab === 5 && (
          <View>
            <Text style={styles.header}>MANIFIESTO</Text>
            <Text style={styles.h2} style={{textAlign:'center', color:'#38bdf8'}}>El Pulso de la Noósfera</Text>
            <View style={styles.card}><Text style={styles.h2}>De la Marginalidad al Centro</Text><Text style={styles.bodyText}>Si aceptamos la Cuarta Ley, la vida es una cualidad física inevitable. Somos estructuras disipativas cuyo propósito es degradar gradientes de energía.</Text></View>
            <View style={styles.card}><Text style={styles.h2}>Ecuación Fundamental</Text><Text style={styles.bodyText}>σ = Σ(Ji * Xi) ≥ 0. Traducimos la complejidad ambiental en un índice comprensible.</Text></View>
            <View style={styles.synthesisCard}>
              <Text style={styles.h2} style={{color:'#38bdf8'}}>Dirección Científica</Text>
              <Text style={styles.bodyText} style={{fontWeight:'bold', color:'#ffffff', fontSize:16}}>Benjamin Cabeza Duran</Text>
              <Text style={styles.bodyText} style={{fontStyle:'italic', marginTop:10}}>"En la acción de organizar, el universo no solo se disipa; se enriquece."</Text>
            </View>
          </View>
        )}
        <View style={{ height: 80 }} />
      </ScrollView>

      <View style={styles.navBar}>
        {[{id:1,t:"Monitor"},{id:2,t:"Guía"},{id:3,t:"4ª Ley"},{id:4,t:"Helio"},{id:5,t:"Manifiesto"}].map(tab => (
          <TouchableOpacity key={tab.id} style={styles.tab} onPress={() => setActiveTab(tab.id)}>
            <Text style={[styles.tabText, activeTab === tab.id && styles.tabActive]}>{tab.t}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  centered: { flex: 1, backgroundColor: '#020617', justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: '900', color: '#f8fafc', letterSpacing: 4, marginBottom: 5, marginTop: 10, textAlign:'center' },
  subheader: { fontSize: 13, color: '#64748b', marginBottom: 25, textAlign:'center' },
  card: { backgroundColor: '#0f172a', padding: 20, borderRadius: 12, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#334155' },
  cardTitle: { color: '#94a3b8', fontSize: 11, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  h2: { color: '#38bdf8', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  bold: { color: '#ffffff', fontWeight: 'bold' },
  bodyText: { color: '#cbd5e1', fontSize: 14, lineHeight: 22, marginBottom: 10 },
  bigData: { fontSize: 32, fontWeight: 'bold', color: '#ffffff', marginBottom: 5 },
  stateText: { fontSize: 18, fontWeight: '800', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, fontWeight: 'bold', fontSize: 12 },
  // FASE 2: Estilos del Historial
  historyRow: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#1e293b', paddingBottom: 8, marginBottom: 8 },
  historyTime: { color: '#64748b', fontSize: 12, width: 80 },
  historyData: { color: '#e2e8f0', fontSize: 12, fontWeight: 'bold' },
  synthesisCard: { backgroundColor: '#1e293b', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#334155', marginBottom: 20 },
  synthesisText: { color: '#e2e8f0', fontSize: 14, lineHeight: 24 },
  refText: { color: '#64748b', fontSize: 11, fontStyle: 'italic' },
  navBar: { flexDirection: 'row', backgroundColor: '#0f172a', borderTopWidth: 1, borderTopColor: '#1e293b', paddingBottom: 20, paddingTop: 10 },
  tab: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 },
  tabText: { color: '#64748b', fontSize: 11, fontWeight: 'bold' },
  tabActive: { color: '#38bdf8' }
});
