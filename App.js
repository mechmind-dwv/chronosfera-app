import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

// ... (Mantenemos los cerebros matemáticos idénticos) ...
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
  const [history, setHistory] = useState([]);
  
  // FASE 3: Estado para la Ciencia Ciudadana
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchSolarPulse = async () => {
      try {
        const res = await fetch('https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json');
        const data = await res.json();
        const newKp = data[1]?.kp?.[0] || 2;
        setSolarData(newKp);
        return newKp;
      } catch { const s = 2.5; setSolarData(s); return s; }
    };
    const initAndInterval = async () => {
      const initialKp = await fetchSolarPulse();
      setIsLoading(false);
      setHistory([{ time: new Date().toLocaleTimeString(), kp: initialKp, local: 0 }]);
      const interval = setInterval(async () => {
        const currentKp = await fetchSolarPulse();
        setHistory(prev => [{ time: new Date().toLocaleTimeString(), kp: currentKp, local: localData.val }, ...prev].slice(0, 6));
      }, 30000);
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

  // FASE 3: Función para registrar síntomas
  const logSymptom = (symptom) => {
    const newReport = {
      time: new Date().toLocaleTimeString(),
      symptom: symptom,
      kp: solarData,
      sigma: localData.val
    };
    setReports(prev => [newReport, ...prev]);
    Alert.alert("Registro Guardado", `Síntoma: ${symptom}\nCon Kp: ${solarData.toFixed(1)} y σ: ${localData.val.toFixed(1)}`);
  };

  if (isLoading) return <View style={styles.centered}><ActivityIndicator size="large" color="#38bdf8" /></View>;
  const cosmicState = translateKpToBiology(solarData);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {activeTab === 1 && (
          <View>
            <Text style={styles.header}>CHRONOSFERA</Text>
            <Text style={styles.subheader}>Fase 3: Ciencia Ciudadana Activa</Text>
            
            <View style={[styles.card, { borderLeftColor: cosmicState.color }]}>
              <Text style={styles.cardTitle}>El Pulso de Chizhevsky (NOAA)</Text>
              <Text style={styles.bigData}>Kp: {solarData.toFixed(1)}</Text>
              <Text style={[styles.stateText, { color: cosmicState.color }]}>{cosmicState.state}</Text>
            </View>

            <View style={[styles.card, { borderLeftColor: localData.color }]}>
              <Text style={styles.cardTitle}>Carga Disipativa Local (σ)</Text>
              <View style={styles.row}><Text style={styles.bigData}>{localData.val.toFixed(1)}</Text><Text style={[styles.badge, { backgroundColor: localData.color + '20', color: localData.color }]}>{localData.text}</Text></View>
            </View>

            {/* FASE 3: BOTONES DE REGISTRO CIUDADANO */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Reportar Estado Biológico (Chizhevsky)</Text>
              <Text style={styles.bodyText}>¿Cómo siente la respuesta de su estructura disipativa al entorno actual?</Text>
              <View style={styles.grid}>
                <TouchableOpacity style={[styles.reportBtn, {backgroundColor:'#22c55e'}]} onPress={() => logSymptom("Óptimo")}><Text style={styles.btnText}>Óptimo</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.reportBtn, {backgroundColor:'#eab308'}]} onPress={() => logSymptom("Inquietud")}><Text style={styles.btnText}>Inquietud</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.reportBtn, {backgroundColor:'#f97316'}]} onPress={() => logSymptom("Fatiga")}><Text style={styles.btnText}>Fatiga</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.reportBtn, {backgroundColor:'#ef4444'}]} onPress={() => logSymptom("Cefalea/Estres")}><Text style={styles.btnText}>Cefalea</Text></TouchableOpacity>
              </View>
            </View>

            {/* FASE 3: TABLA DE CORRELACIÓN ESTADÍSTICA */}
            {reports.length > 0 && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Base de Datos Local (Correlaciones)</Text>
                {reports.map((r, i) => (
                  <View key={i} style={styles.historyRow}>
                    <Text style={styles.historyTime}>{r.time}</Text>
                    <Text style={{color: '#f8fafc', fontSize: 11, flex: 1}}>{r.symptom}</Text>
                    <Text style={styles.historyData}>Kp:{r.kp.toFixed(1)}</Text>
                  </View>
                ))}
              </View>
            )}

            <View style={[styles.card, { borderLeftColor: '#334155' }]}>
              <Text style={styles.cardTitle}>Historial Ambiental (Kp vs σ)</Text>
              {history.map((h, i) => (
                <View key={i} style={styles.historyRow}>
                  <Text style={styles.historyTime}>{h.time}</Text>
                  <Text style={styles.historyData}>Kp: {h.kp?.toFixed(1)}</Text>
                  <Text style={styles.historyData}>σ: {h.local.toFixed(1)}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {activeTab === 2 && (<View><Text style={styles.header}>GUÍA</Text><View style={styles.card}><Text style={styles.bodyText}>Use la pestaña Monitor para registrar cómo se siente. Cruce esos datos con el Kp y el σ para validar la Heliobiología de Chizhevsky.</Text></View></View>)}
        {activeTab === 3 && (<View><Text style={styles.header}>4ª LEY</Text><View style={styles.card}><Text style={styles.h2}>El MEPP</Text><Text style={styles.bodyText}>Los sistemas abiertos evolucionan hacia estados de máxima producción de entropía. La vida maximiza la disipación de gradientes energéticos.</Text></View></View>)}
        {activeTab === 4 && (<View><Text style={styles.header}>HELIBIOLOGÍA</Text><View style={styles.card}><Text style={styles.h2}>Chizhevsky</Text><Text style={styles.bodyText}>Demostró que tormentas geomagnéticas coinciden con cambios masivos en la psique humana.</Text></View></View>)}
        {activeTab === 5 && (<View><Text style={styles.header}>MANIFIESTO</Text><View style={styles.synthesisCard}><Text style={styles.h2} style={{color:'#38bdf8'}}>Dirección Científica</Text><Text style={styles.bodyText} style={{fontWeight:'bold', color:'#ffffff', fontSize:16}}>Benjamin Cabeza Duran</Text><Text style={styles.bodyText} style={{fontStyle:'italic', marginTop:10}}>"En la acción de organizar, el universo no solo se disipa; se enriquece."</Text></View></View>)}
        
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
  // FASE 3: Estilos de la Ciencia Ciudadana
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
  reportBtn: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 8, flex: 1, minWidth: '45%', alignItems: 'center' },
  btnText: { color: '#0f172a', fontWeight: 'bold', fontSize: 12 },
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
