const { calculateMagnitude, calculateEntropyIndex, getStatus } = require('../utils/entropyCalculator');

describe('Módulo de Termodinámica de Chronosfera', () => {
  
  describe('Cálculo de Magnitud Vectorial', () => {
    test('Calcula correctamente la magnitud de un campo nulo', () => {
      expect(calculateMagnitude(0, 0, 0)).toBe(0);
    });
    test('Calcula correctamente la magnitud en un eje puro (Teorema de Pitágoras 3D)', () => {
      // Raíz cuadrada de (3^2 + 4^2 + 0^2) = 5
      expect(calculateMagnitude(3, 4, 0)).toBe(5);
    });
  });

  describe('Cálculo del Índice de Carga Disipativa', () => {
    test('Devuelve 0 si la magnitud es 0', () => {
      expect(calculateEntropyIndex(0)).toBe(0);
    });
    test('Multiplica la magnitud por 1.5 correctamente', () => {
      expect(calculateEntropyIndex(10)).toBe(15);
    });
    test('NEVER EXCEEDS 100 (Límite físico de la interfaz)', () => {
      // Si magnitud es 100, 100*1.5 = 150. Debe cortarse en 100.
      expect(calculateEntropyIndex(100)).toBe(100);
    });
  });

  describe('Clasificación del Estado Entrópico (Límites de Chizhevsky)', () => {
    test('Devuelve estado Óptimo si el índice es menor a 40', () => {
      const result = getStatus(20);
      expect(result.text).toBe("Acoplamiento Entrópico Óptimo");
      expect(result.color).toBe("#22c55e");
    });
    test('Devuelve estado Activo si el índice está entre 40 y 69', () => {
      const result = getStatus(55);
      expect(result.text).toBe("Flujo Disipativo Activo");
      expect(result.color).toBe("#eab308");
    });
    test('Devuelve Perturbación si el índice es 70 o mayor', () => {
      const result = getStatus(85);
      expect(result.text).toBe("Perturbación - Ruido Termodinámico");
      expect(result.color).toBe("#ef4444");
    });
  });
});
