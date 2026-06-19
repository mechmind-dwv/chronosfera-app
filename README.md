<div align="center">
  <img src="https://img.shields.io/badge/Filosofía-Cuarta_Ley_Termodinámica-38bdf8?style=for-the-badge" alt="4th Law">
  <img src="https://img.shields.io/badge/Base_Científica-Chizhevsky_&_Halberg-22c55e?style=for-the-badge" alt="Science">
  <img src="https://img.shields.io/badge/Tecnología-React_Native_(Expo)-f59e0b?style=for-the-badge" alt="Tech">
  
  <h1>CHRONOSFERA: El Pulso de la Noósfera</h1>
  <p><strong>Monitor de Acoplamiento Solar y Carga Disipativa para la Validación Ciudadana de la Vida como Imperativo Entrópico.</strong></p>
</div>

---

## 🌌 El Manifiesto: De la Marginalidad al Centro

Durante décadas, la **Heliobiología** (Chizhevsky), la **Cronobiología de la Noósfera** (Vernadsky/Halberg) y la **Magnetobiología** han sido relegadas a los márgenes de la ciencia ortodoxa. Se las consideraba curiosidades o "ciencias marginales".

**Chronosfera nace para cambiar este paradigma.**

Si aceptamos la **Cuarta Ley de la Termodinámica** (Principio de Máxima Producción de Entropía), la vida no es una anomalía estadística ni una casualidad evolutiva: es una **cualidad física inevitable**. Los seres vivos somos *estructuras disipativas* altamente complejas cuyo propósito termodinámico es degradar los gradientes de energía del entorno de la manera más eficiente posible.

Bajo esta luz:
*   Las epidemias y excitaciones masivas descritas por **Chizhevsky** no son "magia", sino la respuesta biológica a los pulsos de energía solar.
*   Los ritmos multiseptanos y trans-anuales descubiertos por **Halberg** no son simples relojes internos, sino el acoplamiento de nuestra fisiología con los ciclos geomagnéticos de la Tierra.
*   La **Electropolución** no es solo un problema de salud, es "ruido" termodinámico que rompe la eficiencia de nuestro acoplamiento con la Cronosfera.

Chronosfera es la primera herramienta de ciencia ciudadana diseñada para medir, visualizar y validar esta realidad física.

---

## 🎯 Funcionalidades Principales

### 1. Monitor de Carga Disipativa (Bio-EMF)
No medimos simplemente "radiación", medimos la **carga termodinámica** del entorno. Utilizando el magnetómetro del dispositivo, la app calcula en tiempo real la magnitud de los flujos energéticos ($X_i$) que obligan a tu biología a realizar trabajo ($J_i$) para mantener su estructura.

### 2. El Pulso de Chizhevsky (Integración Space Weather)
Conexión en tiempo real con los datos de la NOAA (Índice Kp, tormentas geomagnéticas). La app te avisa cuando el Sol emite un gradiente de energía que alterará la impedancia entrópica de tu entorno local.

### 3. Sincronicidad de la Cronosfera
Visualización de cómo los campos magnéticos ambientales fluctúan en períodos que coinciden con la biología humana (ritmos circadianos, infradianos), validando la hipótesis de Halberg de que estamos inmersos en una matriz temporal física.

---

## ⚛️ La Ciencia Detrás del Código

La app cuantifica la producción de entropía local ($\sigma$) basándose en la ecuación fundamental de flujos y fuerzas:
$$ \sigma = \sum J_i X_i \geq 0 $$

### El Algoritmo del Índice de Carga Disipativa
Hemos traducido la complejidad ambiental en un índice comprensible (0-100):

```text
Índice_Cronosfera = (Magnitud_Campo_Magnético_Ambiental × 0.5) + 
               (Intensidad_Senal_RF_Normalizada × 0.3) + 
               (Tiempo_Exposición_Acumulado × 0.2)
```

*   **0-24 (Equilibrio Entrópico):** El entorno permite una disipación eficiente y rítmica de la energía biológica.
*   **25-49 (Flujo Disipativo Activo):** Presencia de variaciones geomagnéticas naturales (ej. paso de una tormenta solar débil). El cuerpo aumenta su excitabilidad nerviosa (como observó Chizhevsky).
*   **50+ (Perturbación / Ruido Termodinámico):** Electropolución severa. El gasto energético celular se desvía de funciones vitales para combatir el estrés electromagnético artificial.

---

## 🛠️ Stack Tecnológico

*   **Framework:** React Native con Expo
*   **Lenguaje:** TypeScript / JavaScript
*   **Sensores Físicos:** `expo-sensors` (Magnetómetro de alta frecuencia), `expo-network`
*   **Datos Externos:** API REST de NOAA Space Weather Prediction Center

---

## 🚀 Instalación y Ejecución

Esta app está diseñada para ser compilada y ejecutada por investigadores independientes y ciudadanos.

**Recomendado (Sin dependencias locales):** 
Ejecutar directamente en la nube vía [Expo Snack](https://snack.expo.dev/).

**Local (Requiere entorno de desarrollo):** 
Node.js 18+ (LTS) instalado.

```bash
# 1. Clonar el repositorio
git clone https://github.com/mechmind-dwv/chronosfera-app.git
cd chronosfera-app

# 2. Instalar dependencias
npm install --legacy-peer-deps

# 3. Iniciar el servidor de desarrollo
npx expo start

# 4. Escanear el código QR con la app "Expo Go" en tu teléfono
```

---

## 🗺️ Roadmap del Proyecto

- [x] **Fase 1 (Actual):** Captura en tiempo real del magnetómetro y cálculo del Índice de Carga Disipativa local.
- [ ] **Fase 2:** Integración total de la API de la NOAA para superponer el Índice Kp sobre el índice local.
- [ ] **Fase 3:** Módulo de "Ciencia Ciudadana Chizhevsky": Formularios para que los usuarios reporten estados de ánimo/enfermedad y buscar correlaciones estadísticas masivas en tiempo real.
- [ ] **Fase 4:** Conexión con Wearables (Apple Watch/Garmin) para extraer Variabilidad de la Frecuencia Cardíaca (VFC) y demostrar experimentalmente las VVAs y VVDs descritas por Halberg.

---

## 📚 Linaje Científico y Agradecimientos

Este software no sería posible sin la mente de los pioneros que supieron ver la conexión entre el Cosmos y la Célula:

*   **Alexander L. Chizhevsky (1897-1964):** Fundador de la Heliobiología. Por demostrar que la "Ira del Sol" dicta los ritmos de la historia y la biología.
*   **Franz Halberg (1919-2013):** Fundador de la Cronobiología. Por descubrir la Cronosfera y demostrar matemáticamente que la biología es un reflejo de los ciclos físicos del entorno.
*   **Vladimir Vernadsky (1863-1945):** Por la concepción de la Noósfera como fuerza geológica.
*   **Ilya Prigogine (1917-2003):** Por las Estructuras Disipativas, base física de esta aplicación.
*   **Mikhail N. Zhadin:** Por su rigurosa revisión de la literatura sobre bioelectromagnetismo de baja frecuencia.

---

## ⚖️ Licencia

Este proyecto se libera bajo la licencia MIT. El conocimiento científico es libre; las herramientas para validarlo también deben serlo.

**"En la acción de organizar, el universo no solo se disipa; se enriquece."**

*Dirección Científica del Proyecto: Benjamin Cabeza Duran*
