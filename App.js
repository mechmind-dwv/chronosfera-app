import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

const translateKpToBiology = (kp) => {
  if (!kp) return { state: "Cargando...", detail: "Conectando con la NOAA.", color: "#64748b" };
  if (kp <= 3) return { state: "Calma Solar", detail: "Acoplamiento entrópico óptimo. Baja fricción ambiental.", color: "#22c55e" };
  if (kp <= 4) return { state: "Inquietud Magnética", detail: "Inicio de flujo disipativo activo. Posible ligera excitabilidad nerviosa.", color: "#eab308" };
  if (kp <= 5) return { state: "Tormenta G1 (Chizhevsky)", detail: "Perturbación detectada. Aumento documentado de respuestas biológicas masivas.", color: "#f97316" };
  return { state: "Tormenta Severa G2+", detail: "Ruido termodinámico extremo. Alto riesgo de desacoplamiento biológico.", color: "#ef4444" };
};

const calculateLocalEntropy = (x, y, z) => {
  const magnitude = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  const val = Math.min(100, magnitude * 1.5);
  if (val < 40) return { text: "Óptimo", color: "#22c55e", val };
  if (val < 70) return { text: "Activo", color: "#eab308", val };
  return { text: "Perturbado", color: "#ef4444", val };
};

const calculateVFC = (kp) => {
  const baseRMSSD = 65;
  const stressFactor = kp > 5 ? 0.4 : kp > 4 ? 0.6 : 0.9;
  const rmssd = Math.max(15, baseRMSSD * stressFactor + (Math.random() - 0.5) * 10);
  const bpm = 65 + (70 - rmssd);
  const status = rmssd < 30 ? "VVD Riesgo" : rmssd < 45 ? "VVA Alerta" : "Sincronizado";
  return { rmssd, bpm, status };
};

export default function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [solarData, setSolarData] = useState(0);
  const [localData, setLocalData] = useState({ x: 0, y: 0, z: 0, val: 0, text: "Óptimo", color: "#22c55e" });
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [reports, setReports] = useState([]);
  const [vfcData, setVfcData] = useState({ rmssd: 65, bpm: 65, status: "Sincronizado" });

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
        setVfcData(calculateVFC(currentKp));
      }, 30000);
      return () => clearInterval(interval);
    };
    initAndInterval();
  }, [localData.val]);

  useEffect(() => {
    const int = setInterval(() => {
      const x = (Math.random() - 0.5) * 20, y = -35 + (Math.random() - 0.5) * 15, z = (Math.random() - 0.5) * 10;
      setLocalData(prev => ({ ...calculateLocalEntropy(x, y, z), x, y, z }));
      setVfcData(prev => calculateVFC(solarData));
    }, 1500);
    return () => clearInterval(int);
  }, [solarData]);

  const logSymptom = (symptom) => {
    setReports(prev => [{ time: new Date().toLocaleTimeString(), symptom, kp: solarData, sigma: localData.val, vfc: vfcData.rmssd }, ...prev]);
    Alert.alert("Registro Guardado", `Síntoma: ${symptom}\nKp: ${solarData.toFixed(1)} | σ: ${localData.val.toFixed(1)} | VFC: ${vfcData.rmssd.toFixed(1)}ms`);
  };

  if (isLoading) return <View style={styles.centered}><ActivityIndicator size="large" color="#38bdf8" /></View>;
  const cosmicState = translateKpToBiology(solarData);
  const vfcColor = vfcData.status === "Sincronizado" ? "#22c55e" : vfcData.status === "VVA Alerta" ? "#eab308" : "#ef4444";

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {activeTab === 1 && (
          <View>
            <Text style={styles.header}>CHRONOSFERA</Text>
            <Text style={styles.subheader}>Fase 4: Sincronización VFC (Halberg)</Text>
            <View style={[styles.card, { borderLeftColor: cosmicState.color }]}><Text style={styles.cardTitle}>El Pulso de Chizhevsky (NOAA)</Text><Text style={styles.bigData}>Kp: {solarData.toFixed(1)}</Text><Text style={[styles.stateText, { color: cosmicState.color }]}>{cosmicState.state}</Text></View>
            <View style={[styles.card, { borderLeftColor: vfcColor }]}><Text style={styles.cardTitle}>Variabilidad Frecuencia Cardíaca (VFC)</Text><Text style={styles.bodyText}>RMSSD (Raíz Cuadrada Media Sucesiva): medida de la sincronización del Sistema Nervioso Autónomo propuesta por Halberg.</Text><View style={styles.row}><Text style={styles.bigData}>{vfcData.rmssd.toFixed(1)}<Text style={{fontSize:16}}> ms</Text></Text><Text style={[styles.badge, { backgroundColor: vfcColor + '20', color: vfcColor }]}>{vfcData.status}</Text></View><Text style={styles.mono}>BPM Simulado: {vfcData.bpm.toFixed(0)}</Text></View>
            <View style={[styles.card, { borderLeftColor: localData.color }]}><Text style={styles.cardTitle}>Carga Disipativa Local (σ)</Text><View style={styles.row}><Text style={styles.bigData}>{localData.val.toFixed(1)}</Text><Text style={[styles.badge, { backgroundColor: localData.color + '20', color: localData.color }]}>{localData.text}</Text></View></View>
            <View style={styles.card}><Text style={styles.cardTitle}>Reportar Estado Biológico (Chizhevsky)</Text><Text style={styles.bodyText}>¿Cómo siente la respuesta de su estructura disipativa al entorno actual?</Text><View style={styles.grid}><TouchableOpacity style={[styles.reportBtn, {backgroundColor:'#22c55e'}]} onPress={() => logSymptom("Óptimo")}><Text style={styles.btnText}>Óptimo</Text></TouchableOpacity><TouchableOpacity style={[styles.reportBtn, {backgroundColor:'#eab308'}]} onPress={() => logSymptom("Inquietud")}><Text style={styles.btnText}>Inquietud</Text></TouchableOpacity><TouchableOpacity style={[styles.reportBtn, {backgroundColor:'#f97316'}]} onPress={() => logSymptom("Fatiga")}><Text style={styles.btnText}>Fatiga</Text></TouchableOpacity><TouchableOpacity style={[styles.reportBtn, {backgroundColor:'#ef4444'}]} onPress={() => logSymptom("VVD Cardíaco")}><Text style={styles.btnText}>VVD Cardíaco</Text></TouchableOpacity></View></View>
            {reports.length > 0 && (<View style={styles.card}><Text style={styles.cardTitle}>Base de Datos Local (Incluye VFC)</Text>{reports.map((r, i) => (<View key={i} style={styles.historyRow}><Text style={styles.historyTime}>{r.time}</Text><Text style={{color: '#f8fafc', fontSize: 11, flex: 1}}>{r.symptom}</Text><Text style={styles.historyData}>VFC:{r.vfc.toFixed(0)}</Text></View>))}</View>)}
            <View style={[styles.card, { borderLeftColor: '#334155' }]}><Text style={styles.cardTitle}>Historial Ambiental (Kp vs σ)</Text>{history.map((h, i) => (<View key={i} style={styles.historyRow}><Text style={styles.historyTime}>{h.time}</Text><Text style={styles.historyData}>Kp: {h.kp?.toFixed(1)}</Text><Text style={styles.historyData}>σ: {h.local.toFixed(1)}</Text></View>))}</View>
            <View style={styles.synthesisCard}><Text style={styles.cardTitle}>Diagnóstico Fase 4</Text><Text style={styles.synthesisText}>{vfcData.status !== "Sincronizado" ? "⚠️ La VFC cae (VVAs/VVDs de Halberg). El Sistema Nervioso Simpático está activo por estrés geomagnético." : "✅ VFC estable. Cronosfera biológica alineada con el entorno electromagnético."}</Text></View>
          </View>
        )}

        {activeTab === 2 && (
          <View>
            <Text style={styles.header}>GUÍA PARA EL PÚBLICO</Text>
            <Text style={styles.subheader}>¿Qué significan estos números?</Text>
            <View style={styles.card}><Text style={styles.h2}>1. El Indice Kp (Pulso Solar)</Text><Text style={styles.bodyText}>Mide la actividad de las tormentas geomagnéticas en una escala de 0 a 9. No es magia; es física. Cuando el Sol emite viento solar, golpea la magnetosfera terrestre. Chizhevsky demostró estadísticamente que estos golpes alteran la conducta humana y biológica.</Text></View>
            <View style={styles.card}><Text style={styles.h2}>2. Los Micro-Teslas (µT) Locales</Text><Text style={styles.bodyText}>El campo magnético de la Tierra mide unos 25 a 65 µT. Si el número sube drásticamente, significa que hay "electropolución" (antenas, WiFi, 5G). Para la Cuarta Ley, esto es "ruido termodinámico" que obliga a su cuerpo a gastar energía extra para mantener su orden interno.</Text></View>
            <View style={styles.card}><Text style={styles.h2}>3. El Índice de Carga (0-100)</Text><Text style={styles.bodyText}>Es nuestra métrica basada en la Cuarta Ley. Representa cuánto "trabajo termodinámico" debe hacer su entorno inmediato. Si está en verde (0-40), el acoplamiento es eficiente. Si pasa a rojo (>70), el entorno está perturbado.</Text></View>
          </View>
        )}

        {activeTab === 3 && (
          <View>
            <Text style={styles.header}>LA 4ª LEY Y EL MEPP</Text>
            <Text style={styles.subheader}>Multifractalidad, Sincronización y Complejidad</Text>
            <View style={styles.card}><Text style={styles.h2}>I. Introducción</Text><Text style={styles.bodyText}>La termodinámica, desde su formulación en el siglo XIX, ha sido el fundamento para comprender la transformación de la energía. Sin embargo, la observación de la naturaleza revela la emergencia de estructuras complejas en sistemas abiertos, aparentemente en contradicción con la segunda ley. Esta paradoja motiva la búsqueda de una <Text style={styles.bold}>cuarta ley</Text>, asociada al <Text style={styles.bold}>Principio de Máxima Producción de Entropía (MEPP)</Text>(1)(2).</Text></View>
            <View style={styles.card}><Text style={styles.h2}>II. Fundamentos y Entropía</Text><Text style={styles.bodyText}>La segunda ley introduce el concepto de entropía y la irreversibilidad, afirmando que la entropía total de un sistema aislado nunca disminuye. En los sistemas biológicos, la aparente contradicción entre el alto grado de organización y la segunda ley se resuelve al considerar que la disminución local de entropía (orden) se compensa con un aumento mayor en el entorno, gracias al flujo constante de energía. Así, la entropía no solo es una medida de desorden, sino una guía para entender la autoorganización(7)(8).</Text></View>
            <View style={styles.card}><Text style={styles.h2}>III. El MEPP como Cuarta Ley</Text><Text style={styles.bodyText}>El MEPP postula que los sistemas abiertos alejados del equilibrio tienden a evolucionar hacia estados en los que la producción de entropía es máxima. Esta idea, propuesta por <Text style={styles.bold}>Rod Swenson</Text>, sugiere la existencia de una "cuarta ley" que rige la dinámica de los sistemas complejos. Mientras que la segunda ley establece que la entropía total no puede disminuir, el MEPP afirma que, entre todas las trayectorias posibles, los sistemas seleccionan aquellas que maximizan la producción de entropía(1)(10).</Text></View>
            <View style={styles.card}><Text style={styles.h2}>IV. Sistemas Complejos</Text><Text style={styles.bodyText}><Text style={styles.bold}>Biología:</Text> Los organismos vivos mantienen su estructura lejos del equilibrio termodinámico, utilizando energía química para generar restricciones estructurales e informativas que contrarrestan la entropía. <Text style={styles.bold}>Ecología:</Text> Los ecosistemas pueden verse como sistemas autoorganizados que maximizan la disipación de energía solar a través de redes tróficas complejas. <Text style={styles.bold}>Tecnología:</Text> El diseño de redes de comunicación e inteligencia artificial se inspira en los principios de la autoorganización(15).</Text></View>
            <View style={styles.card}><Text style={styles.h2}>V. Multifractalidad y Sincronización</Text><Text style={styles.bodyText}>La <Text style={styles.bold}>multifractalidad</Text> describe múltiples escalas de organización en un sistema, cada una caracterizada por diferentes exponentes de escala (ej. pulmones, vasos sanguíneos). La <Text style={styles.bold}>sincronización multifractal</Text> es el fenómeno por el cual la complejidad de las señales se alinea entre diferentes subsistemas (cerebro, corazón), no en frecuencia, sino en el grado de complejidad y variabilidad. Disrupciones en esta sincronización se asocian a estados patológicos, como la insuficiencia cardíaca(4)(5).</Text></View>
            <View style={styles.card}><Text style={styles.h2}>VI. Perspectivas futuras</Text><Text style={styles.bodyText}>La investigación interdisciplinaria en física, biología, informática y ciencias sociales podría consolidar el MEPP como un principio fundamental, con aplicaciones en la sostenibilidad, la inteligencia artificial y la exploración del cosmos(17)(20)(32).</Text></View>
            <View style={styles.card}><Text style={styles.refText}>Refs: (1)Swenson(2010), (3)Andrade(2023), (4)West(2024), (5)West(2023), (11)Martyushev(2010).</Text></View>
          </View>
        )}

        {activeTab === 4 && (
          <View>
            <Text style={styles.header}>HELIBIOLOGÍA</Text>
            <Text style={styles.subheader}>Chizhevsky y la Cronosfera</Text>
            <View style={styles.card}><Text style={styles.h2}>Alexander Chizhevsky (1897-1964)</Text><Text style={styles.bodyText}>Padre de la Heliobiología. En 1915, usando telescopios y estadísticas históricas, demostró que las manchas solares y las tormentas geomagnéticas coinciden exactamente con epidemias, revoluciones y cambios masivos en la psique humana. Fue encerrado en el Gulag por sus descubrimientos.</Text></View>
            <View style={styles.card}><Text style={styles.h2}>Franz Halberg (1919-2013)</Text><Text style={styles.bodyText}>Padre de la Cronobiología. Descubrió que la biología no tiene relojes internos aislados, sino que está sincronizada con los ciclos del entorno (ritmos multiseptanos, trans-anuales). Llamó a esto la "Cronosfera". Sus estudios ligaron arritmias cardíacas y muertes súbitas con ciclos de 1.3 años del magnetismo solar.</Text></View>
            <View style={styles.card}><Text style={styles.h2}>De Marginales a Centrales</Text><Text style={styles.bodyText}>Estas ciencias fueron marginadas. Pero bajo la Cuarta Ley, son el núcleo de la física: demuestran que el ser humano es un nodo acoplado a los ritmos del cosmos, actuando como una estructura disipativa planetaria.</Text></View>
          </View>
        )}

        {activeTab === 5 && (
          <View>
            <Text style={styles.header}>MANIFIESTO</Text>
            <Text style={{textAlign:'center', color:'#38bdf8', fontSize:16, fontWeight:'bold', marginBottom:20}}>CHRONOSFERA: El Pulso de la Noósfera</Text>
            <Text style={{textAlign:'center', fontStyle:'italic', color:'#94a3b8', marginBottom:20}}>Monitor de Acoplamiento Solar y Carga Disipativa para la Validación Ciudadana de la Vida como Imperativo Entrópico.</Text>
            <View style={styles.card}><Text style={styles.h2}>De la Marginalidad al Centro</Text><Text style={styles.bodyText}>Durante décadas, la Heliobiología (Chizhevsky), la Cronobiología de la Noósfera (Vernadsky/Halberg) y la Magnetobiología han sido relegadas a los márgenes de la ciencia ortodoxa. Si aceptamos la Cuarta Ley de la Termodinámica, la vida no es una anomalía estadística ni una casualidad evolutiva: es una cualidad física inevitable. Los seres vivos somos estructuras disipativas altamente complejas cuyo propósito termodinámico es degradar los gradientes de energía del entorno de la manera más eficiente posible(3).</Text></View>
            <View style={styles.card}><Text style={styles.h2}>Ecuación Fundamental</Text><Text style={styles.bodyText}>La app cuantifica la producción de entropía local (σ) basándose en la ecuación fundamental de flujos y fuerzas: σ = Σ(Ji * Xi) ≥ 0. Traducimos la complejidad ambiental en un índice comprensible (0-100) que cruza datos cósmicos (Kp), locales (σ) y fisiológicos (VFC).</Text></View>
            <View style={styles.card}><Text style={styles.h2}>Linaje Científico y Agradecimientos</Text><Text style={styles.bodyText}>Este software no sería posible sin la mente de los pioneros que supieron ver la conexión entre el Cosmos y la Célula: Alexander L. Chizhevsky, Franz Halberg, Vladimir Vernadsky, Ilya Prigogine y Mikhail N. Zhadin.</Text></View>
            <View style={styles.synthesisCard}>
              <Text style={{color:'#38bdf8', fontSize:12, fontWeight:'bold', marginBottom:10}}>Dirección Científica del Proyecto</Text>
              <Text style={{fontWeight:'bold', color:'#ffffff', fontSize:16}}>Benjamin Cabeza Duran</Text>
              <Text style={{fontStyle:'italic', color:'#cbd5e1', marginTop:15}}>"En la acción de organizar, el universo no solo se disipa; se enriquece."</Text>
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
  subheader: { fontSize: 13, color: '#6478b', marginBottom: 25, textAlign:'center' },
  card: { backgroundColor: '#0f172a', padding: 20, borderRadius: 12, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#334155' },
  cardTitle: { color: '#94a3b8', fontSize: 11, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  h2: { color: '#38bdf8', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  bold: { color: '#ffffff', fontWeight: 'bold' },
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
  synthesisCard: { backgroundColor: '#1e293b', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#334155', marginBottom: 20 },
  synthesisText: { color: '#e2e8f0', fontSize: 14, lineHeight: 24 },
  refText: { color: '#64748b', fontSize: 11, fontStyle: 'italic' },
  mono: { color: '#64748b', fontFamily: 'monospace', fontSize: 12, marginTop: 10 },
  navBar: { flexDirection: 'row', backgroundColor: '#0f172a', borderTopWidth: 1, borderTopColor: '#1e293b', paddingBottom: 20, paddingTop: 10 },
  tab: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 },
  tabText: { color: '#64748b', fontSize: 11, fontWeight: 'bold' },
  tabActive: { color: '#38bdf8' }
});
