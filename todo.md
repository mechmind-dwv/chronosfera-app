# 🗺️ Hoja de Ruta del Proyecto Chronosfera
*Dirección Científica: Benjamin Cabeza Duran*

## Fase 1: Estabilización y Prueba de Concepto (Actual)
- [x] Redacción del Manifiesto Científico (README.md).
- [x] Creación del repositorio en GitHub.
- [ ] **Tarea Actual:** Simplificar la arquitectura a un solo archivo (`App.js`) para asegurar que cargue instantáneamente en Expo Snack y dispositivos móviles sin congelarse por el llamado a sensores nativos.
- [ ] Validar visualmente el "Índice de Carga Disipativa" en pantalla.

## Fase 2: El Núcleo Termodinámico (Sensores Locales)
- [ ] Implementar lectura real del Magnetómetro en dispositivos físicos.
- [ ] Implementar lectura de Intensidad de Señal (WiFi/4G/5G).
- [ ] Calcular el Índice Cronosfera en tiempo real usando la fórmula: `σ = (Magnitud × 0.5) + (RF × 0.3) + (Tiempo × 0.2)`.
- [ ] Añadir sistema de almacenamiento local (guardar historial de lecturas).

## Fase 3: El Pulso de Chizhevsky (Integración NOAA)
- [ ] Conectar con la API de Space Weather Prediction Center de la NOAA.
- [ ] Extraer el Índice Kp (Actividad Geomagnética) en tiempo real.
- [ ] Crear alertas visuales: "Gradiente Solar Detectado. Posible aumento de excitabilidad nerviosa".
- [ ] Sincronizar el Índice Kp con el Índice local de la app.

## Fase 4: La Noósfera y la Cronosfera (Visualización Halberg)
- [ ] Crear gráficos de líneas para mostrar las fluctuaciones del campo magnético a lo largo del día.
- [ ] Intentar detectar ritmos "multiseptanos" o infradianos en los datos almacenados del usuario.
- [ ] Módulo de teoría integrado: Explicar la ecuación de Prigogine y Ziegler dentro de la app.

## Fase 5: Ciencia Ciudadana y Validación Masiva
- [ ] Crear una base de datos en la nube (ej. Firebase) anonimizada.
- [ ] Permitir a los usuarios pulsar un botón de "Síntomas" (dolor de cabeza, fatiga, euforia) y enviarlo junto con el dato del sensor y el Índice Kp de ese instante.
- [ ] Crear un mapa global de calor de "Entropía Biológica vs. Actividad Solar".

## Fase 6: Conexión Wearable (VFC)
- [ ] Integración con Google Fit / Apple Health para extraer Variabilidad de la Frecuencia Cardíaca (VFC).
- [ ] Cruzar datos de VFC (VVAs y VVDs de Halberg) con las tormentas geomagnéticas.
