import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import MonitorTab from './components/MonitorTab';
import GuideContent from './data/guideContent';
import TheoryContent from './data/theoryContent';
import HelioContent from './data/helioContent';
import ManifestoContent from './data/manifestoContent';
import { fetchKp } from './utils/noaa';
import { calculateVFC } from './utils/vfcLocalSimulator'; // Nota: Asegúrate de usar el nombre correcto del archivo
import { calculateLocalEntropy } from './utils/entropyCalculator';

export default function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [solarData, setSolarData] = useState(0);
  const [localData, setLocalData] = useState({ x: 0, y: 0, z: 0, val: 0, text: "Óptimo", color: "#22c55e" });
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [reports, setReports] = useState([]);
  const [vfcData, setVfcData] = useState({ rmssd: 65, bpm: 65, status: "Sincronizado" });

  useEffect(() => {
    const initAndInterval = async () => {
      const initialKp = await fetchKp();
      setSolarData(initialKp);
      setIsLoading(false);
      setHistory([{ time: new Date().toLocaleTimeString(), kp: initialKp, local: 0 }]);
      const interval = setInterval(async () => {
        const currentKp = await fetchKp();
        setSolarData(currentKp);
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
      setVfcData(prev => calculateVfcData(solarData));
    }, 1500);
    return () => clearInterval(int);
  }, [solarData]);

  const logSymptom = (symptom) => {
    const newReport = { time: new Date().toLocaleTimeString(), symptom, kp: solarData, sigma: localData.val, vfc: vfcData.rmssd };
    setReports(prev => [newReport, ...prev]);
    Alert.alert("Registro Guardado", `Síntoma: ${symptom}\nKp: ${solarData.toFixed(1)} | σ: ${localData.val.toFixed(1)} | VFC: ${vfcData.rmssd.toFixed(1)}ms`);
  };

  if (isLoading) return <View style={styles.centered}><ActivityIndicator size="large" color="#38bdf8" /></View>;

  const renderTab = () => {
    switch(activeTab) {
      case 1: return <MonitorTab solarData={solarData} localData={localData} vfcData={vfcData} reports={reports} history={history} logSymptom={logSymptom} />;
      case 2: return <GuideContent />;
      case 3: return <TheoryContent />;
      case 4: return <HelioContent />;
      case 5: return <ManifestoContent />;
      default: return null;
    }
    return renderTab();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderTab()}
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
  navBar: { flexDirection: 'row', backgroundColor: '#0f172a', borderTopWidth: 1, borderTopColor: '#1e293b', paddingBottom: 20, paddingTop: 10 },
  tab: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 },
  tabText: { color: '#64748b', fontSize: 11, fontWeight: 'bold' },
  tabActive: { color: '#38bdf8' }
});
