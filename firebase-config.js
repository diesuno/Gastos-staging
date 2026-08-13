// ==========================================
// ⚙️ CONFIGURACIÓN DE FIREBASE
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyB1nEj7Tv9bd6DNjQlq8OYZ7Hud9Y0G6kM",
    authDomain: "gastos-staging.firebaseapp.com",
    projectId: "gastos-staging",
    storageBucket: "gastos-staging.firebasestorage.app",
    messagingSenderId: "1038565911737",
    appId: "1:1038565911737:web:78422ba8e4f1911fcebf68"
};
// ==========================================

// "firebase" viene de los <script> de firebase-app/auth/firestore cargados
// en index.html antes que este módulo — no hace falta importarlo.
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
