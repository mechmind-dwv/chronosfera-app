const calculateMagnitude = (x, y, z) => Math.sqrt(x ** 2 + y ** 2 + z ** 2);
const calculateLocalEntropy = (x, y, z) => {
  const magnitude = calculateMagnitude(x, y, z);
  const val = Math.min(100, magnitude * 1.5);
  if (val < 40) return { text: "Óptimo", color: "#22c55e", val };
  if (val < 70) return { text: "Activo", color: "#eab308", val };
  return { text: "Perturbado", color: "#ef4444", val };
};
module.exports = { calculateLocalEntropy };
