export const calculateVFC = (kp) => {
  const baseRMSSD = 65;
  const stressFactor = kp > 5 ? 0.4 : kp > 4 ? 0.6 : 0.9;
  const rmssd = Math.max(15, baseRMSSD * stressFactor + (Math.random() - 0.5) * 10);
  const bpm = 65 + (70 - rmssd);
  const status = rmssd < 30 ? "VVD Riesgo" : rmssd < 45 ? "VVA Alerta" : "Sincronizado";
  return { rmssd, bpm, status };
};
