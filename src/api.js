import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1ED2x9QDOUMGLAQ4pwFFslOvZoOO_BNE",
  authDomain: "vanlife-86f65.firebaseapp.com",
  projectId: "vanlife-86f65",
  storageBucket: "vanlife-86f65.firebasestorage.app",
  messagingSenderId: "746842630873",
  appId: "1:746842630873:web:f6c6d26efaacb43b656cc8"
};

const app = initializeApp(firebaseConfig);


export async function getVans() {
    const res = await fetch("/api/vans")
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}