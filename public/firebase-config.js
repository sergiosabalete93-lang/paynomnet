/* ==========================================================================
   FIREBASE-CONFIG.JS - Conexión vía CDN (Sin NPM)
   ========================================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBM74wW3MUa-eMku0yrZehEv1J6DfqoUOw",
  authDomain: "paynomnet-d8db9.firebaseapp.com",
  projectId: "paynomnet-d8db9",
  storageBucket: "paynomnet-d8db9.firebasestorage.app",
  messagingSenderId: "440386531158",
  appId: "1:440386531158:web:bf629ad98453bfa6a870f7",
  measurementId: "G-031G1V1F9J"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

let analytics = null;
try {
    analytics = getAnalytics(app);
} catch (e) {
    console.warn("Firebase Analytics no pudo inicializarse (posible bloqueo por AdBlock o Red):", e.message);
}

// Exportamos las herramientas para usarlas en app.js
export const db = getFirestore(app);
export const auth = getAuth(app);

console.log("Firebase: Conectado a paynomnet-d8db9 con éxito.");
export { analytics };
export default app;
