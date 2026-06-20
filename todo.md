# 🗺️ Hoja de Ruta del Proyecto Chronosfera
*Dirección Científica: Benjamin Cabeza Duran*

## Fase 1: Estabilización y Prueba de Concepto 
- [x] Redacción del Manifiesto Científico (README.md).
- [x] Creación del repositorio en GitHub.
- [x] Simplificar la arquitectura a un solo archivo (`App.js`).
- [x] Validar visualmente el "Índice de Carga Disipativa".
- [x] Implementar 5 pestañas de contenido académico y divulgativo.
- [x] Creación de infraestructura Open Source (LICENSE, CONTRIBUTING, SECURITY, .gitignore).

## Fase 2: El Núcleo Termodinámico (Sensores Locales y APIs)
- [x] Conexión real con la API de la NOAA para extraer el Índice Kp.
- [x] Algoritmo de historial para superponer el Kp con el Índice de Carga Disipativa Local.
- [ ] Implementar lectura real del Magnetómetro en dispositivos físicos (desactivar simulación si hay sensor).
- [ ] Implementar lectura de Intensidad de Señal (WiFi/4G/5G).
- [ ] Añadir sistema de almacenamiento local permanente (guardar historial de días).

## Fase 3: El Pulso de Chizhevsky (Ciencia Ciudadana)
- [ ] Módulo de "Ciencia Ciudadana Chizhevsky": Formularios para que los usuarios reporten estados de ánimo/enfermedad.
- [ ] Buscar correlaciones estadísticas masivas en tiempo real cruzando síntomas con Kp.

## Fase 4: La Noósfera y la Cronosfera (Visualización Halberg)
- [ ] Crear gráficos de líneas para mostrar las fluctuaciones del campo magnético a lo largo del día.
- [ ] Intentar detectar ritmos "multiseptanos" o infradianos en los datos almacenados del usuario.

## Fase 5: Conexión Wearable (VFC)
- [ ] Integración con Google Fit / Apple Health para extraer Variabilidad de la Frecuencia Cardíaca (VFC).
- [ ] Cruzar datos de VFC (VVAs y VVDs de Halberg) con las tormentas geomagnéticas.
