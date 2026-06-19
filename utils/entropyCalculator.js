/**
 * Módulo de Cálculo Termodinámico - Cuarta Ley
 * Arquitectura CommonJS para máxima compatibilidad de tests.
 */

const calculateMagnitude = (x, y, z) => {
  return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
};

const calculateEntropyIndex = (magnitude) => {
  return Math.min(100, magnitude * 1.5);
};

const getStatus = (index) => {
  if (index < 40) return { text: "Acoplamiento Entrópico Óptimo", color: "#22c55e" };
  if (index < 70) return { text: "Flujo Disipativo Activo", color: "#eab308" };
  return { text: "Perturbación - Ruido Termodinámico", color: "#ef4444" };
};

module.exports = { calculateMagnitude, calculateEntropyIndex, getStatus };
