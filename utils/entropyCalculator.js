/**
 * Módulo de Cálculo Termodinámico - Cuarta Ley
 * Aquí vive la física pura, separada de la interfaz gráfica.
 */

export const calculateMagnitude = (x, y, z) => {
  return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
};

export const calculateEntropyIndex = (magnitude) => {
  // Basado en la ecuación σ = Σ(Ji * Xi)
  // Limitamos el índice a 100 para la interfaz
  return Math.min(100, magnitude * 1.5);
};

export const getStatus = (index) => {
  if (index < 40) return { text: "Acoplamiento Entrópico Óptimo", color: "#22c55e" };
  if (index < 70) return { text: "Flujo Disipativo Activo", color: "#eab308" };
  return { text: "Perturbación - Ruido Termodinámico", color: "#ef4444" };
};
