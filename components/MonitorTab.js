import React, { useState } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import * as Sensor from 'expo-sensors';
import { getNetworkStrength } from '../../utils/networkMonitor';

export default function MonitorTab({ solarData, localData, vfcData, reports, history, logSymptom }) {
  const [isRealDevice, setIsRealDevice] = useState(false);

  React.useEffect(() => {
    const checkDevice = async () => {
      const isAvailable = await Sensor.Magnetometer.isAvailableAsync();
      setIsRealDevice(isAvailable);
    };
    checkDevice();
  }, []);

  const cosmicState = () => {
    if (!solarData) return { state: "Cargando...", color: "#64748b" };
    if (solarData <= 3) return { state: "Calma Solar", color: "#22c55e" };
    if (solarData <= 4) return { state: "Inquietud Magnética", color: "#eab308" };
    if (solarData <= 5) return { state: "Tormenta G1 (Chizhevsky)", color: "#f97316" };
    return { state: "Tormenta Severa G2+", color: "#ef4444" };
  };
  const cosmicState = cosmicState();
  const vfcColor = vfcData.status === "Sincronizado" ? "#22c55e" : vfcData.status === "VVA Alerta" ? "#eab308" : "#ef4444";

  return (
    <View>
      <Text style={styles.header}>CHRONOSFERA</Text>
      <Text style={styles.subheader}>{isRealDevice ? 'Dispositivo Físico Conectado' : 'Modo Simulación Nube'}</Text>
      <View style={[styles.card, { borderLeftColor: cosmicState.color }]}><Text style={styles.cardTitle}>El Pulso de Chizhevsky (NOAA)</Text><Text style={styles.bigData}>Kp: {solarData?.toFixed(1)}</Text><Text style={[styles.stateText, { color: cosmicState.color }]}>{cosmicState.state}</Text></View>
      
      <View style={[styles.card, { borderLeftColor: vfcColor }]}><Text style={styles.cardTitle}>Variabilidad Frecuencia Cardíaca (VFC)</Text><Text style={styles.bodyText}>RMSSD: medida de la sincronización del Sistema Nervioso Autónomo propuesta por Halberg. Aparecerá "Lectura Real" si su móvil tiene sensores de salud.</Text><View style={styles.row}><Text style={styles.bigData}>{vfcData.rmssd.toFixed(1)}<Text style={{fontSize:16}}> ms</Text></Text><Text style={[styles.badge, { backgroundColor: vfcColor + '20', color: vfcColor }]}>{vfcData.status}</Text></View><Text style={styles.mono}>{isRealDevice ? `Leyendo campo magnético real...` : `Simulando micro-perturbaciones...`}</Text></View>

      <View style={[styles.card, { borderLeftColor: localData.color }]}><Text style={styles.cardTitle}>Carga Disipativa Local (σ)</Text><View style={styles.row}><Text style={styles.bigData}>{localData.val.toFixed(1)}</Text><Text style={[styles.badge, { backgroundColor: localData.color + '20', color: localData.color }]}>{localData.text}</Text></View></View>
      
      {isRealDevice && (localData.val > 0) && <View style={styles.card}><Text style={styles.cardTitle}>Intensidad de Red (WiFi/4G/5G)</Text><Text style={styles.bodyText}>Lectura en tiempo real de la Electropolución artificial. Un entorno altamente contaminado obliga a la biología a gastar energía adicional para mantener su estructura interna.</Text><Text style={styles.mono}>{localData.text} de Carga local.</Text></View>}

      <View style={styles.card}><Text style={styles.cardTitle}>Reportar Estado Biológico (Chizhevsky)</Text><Text style={styles.bodyText}>¿Cómo siente la respuesta de su estructura disipativa al entorno actual?</Text><View style={styles.grid}><TouchableOpacity style={[styles.reportBtn, {backgroundColor:'#22c55e'}]} onPress={() => logSymptom("Óptimo")}><Text style={styles.btnText}>Óptimo</Text></TouchableOpacity><TouchableOpacity style={[styles.reportBtn, {backgroundColor:'#eab308'}]} onPress={() => logSymptom("Inquietud")}><Text style={styles.btnText}>Inquietud</Text></TouchableOpacity><TouchableOpacity style={[styles.reportBtn, {backgroundColor:'#f97316'}]} onPress={() => logSymptom("Fatiga")}><Text style={styles.btnText}>Fatiga</Text></TouchableOpacity><TouchableOpacity style={[styles.reportBtn, {backgroundColor:'#ef4444'} onPress={() => logSymptom("VVD Cardíaco")}><Text style={styles.btnText}>VVD Cardíaco</Text></TouchableOpacity></TouchableOpacity></View></View>

      {reports.length > 0 && (<View style={styles.card}><Text style={styles.cardTitle}>Base de Datos Local (Incluye VFC)</Text>{reports.map((r, i) => (<View key={i} style={styles.historyRow}><Text style={styles.historyTime}>{r.time}</Text><Text style={{color: '#f8fafc', fontSize: 11, flex: 1}}>{r.symptom}</Text><Text style={styles.historyData}>VFC:{r.vfc.toFixed(0)}</Text></View>))}</View>)}

      <View style={[styles.card, { borderLeftColor: '#334155' }]}><Text style={styles.cardTitle}>Historial Ambiental (Kp vs σ) - Persistente</Text>
      <Text style={styles.bodyText}>Este historial se guarda permanentemente en su dispositivo, permitiendo ver cómo el Sol y su entorno interactúan a lo largo de los días, tal como postuló Halberg en su Cronosfera.</Text>
      {history.map((h, i) => (<View key={i} style={styles.historyRow}><Text style={styles.historyTime}>{h.time}</Text><Text style={styles.historyData}>Kp: {h.kp?.toFixed(1)}</Text><Text style={styles.historyData}>σ: {h.local.toFixed(1)}</Text></View>))}</View>

      <View style={styles.synthesisCard}><Text style={styles.cardTitle}>Diagnóstico de Persistencia</Text><Text style={styles.synthesisText}>{vfcData.status !== "Sincronizado" ? "⚠️ La VFC cae (VVAs/VVDs de Halberg). El Sistema Nervioso Simpático está activo por estrés geomagnético." : "✅ VFC estable. Cronosfera biológica alineada con el entorno."}</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  header: { fontSize: 24, fontWeight: '900', color: '#f8fafc', letterSpacing: 4, marginBottom: 5, marginTop: 10, textAlign:'center' },
  subheader: { fontSize: 13, color: '#6478b', marginBottom: 25, textAlign:'center' },
  card: { backgroundColor: '#0f172a', padding: 20, borderRadius: 12, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#334155' },
  cardTitle: { color: '#94a3b8', fontSize: 11, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  h2: { color: '#38bdf8', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  bodyText: { color: '#cbd5e1', fontSize: 14, lineHeight: 22, marginBottom: 10 },
  bigData: { fontSize: 32, fontWeight: 'bold', color: '#ffffff', marginBottom: 5 },
  stateText: { fontSize: 18, fontWeight: '800', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, fontWeight: 'bold', fontSize: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
  reportBtn: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 8, flex: 1, minWidth: '45%', alignItems: 'center' },
  btnText: { color: '#0f172a', fontWeight: 'bold', fontSize: 12 },
  historyRow: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#1e293b', paddingBottom: 8, marginBottom: 8 },
  historyTime: { color: '#64748b', fontSize: 12, width: 80 },
  historyData: { color: '#e2e8f0', fontSize: 12, fontWeight: 'bold' },
  mono: { color: '#64748b', fontFamily: 'monospace', fontSize: 12, marginTop: 10 },
  synthesisCard: { backgroundColor: '#1e293b', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '334155', marginBottom: 20 },
  synthesisText: { color: '#e2e8f0', fontSize: 14, lineHeight: 24 },
});
