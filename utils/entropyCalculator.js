const calculateMagnitude = (x = 0, y = 0, z = 0) => Math.sqrt(x ** 2 + y ** 2 + z ** 2);

function calculateEntropyIndex(magnitude) {
  const mag = Number(magnitude) || 0;
  const idx = mag * 1.5;
  return idx > 100 ? 100 : idx;
}

function getStatus(index) {
  const i = Number(index) || 0;

  if (i < 40) {
    return {
      text: "Acoplamiento Entrópico Óptimo",
      color: "#22c55e",
    };
  }

  if (i >= 40 && i <= 69) {
    return {
      text: "Flujo Disipativo Activo",
      color: "#eab308",
    };
  }

  return {
    text: "Perturbación - Ruido Termodinámico",
    color: "#ef4444",
  };
}

// Backwards-compatible helper: keeps previous calculateLocalEntropy behavior
function calculateLocalEntropy(x, y, z) {
  const magnitude = calculateMagnitude(x, y, z);
  const val = calculateEntropyIndex(magnitude);
  const status = getStatus(val);
  return { text: status.text, color: status.color, val };
}

module.exports = {
  calculateMagnitude,
  calculateEntropyIndex,
  getStatus,
  calculateLocalEntropy,
};
