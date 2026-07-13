import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Beberapa jaringan (firewall/proxy kampus, kantor, ISP tertentu, bahkan
// beberapa hotspot seluler) memutus koneksi streaming/long-lived yang
// dipakai Firestore secara default, menyebabkan request write/read
// tersangkut tanpa pernah selesai. `experimentalForceLongPolling` memaksa
// SDK selalu memakai mode long-polling biasa (bukan hanya auto-detect,
// yang kadang gagal mendeteksi kasus koneksi yang berulang kali di-reset),
// tanpa mengubah API `db` yang dipakai di seluruh project.
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export default app;