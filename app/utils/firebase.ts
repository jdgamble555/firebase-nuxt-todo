import { getApp, getApps, initializeApp, type FirebaseOptions } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG) as FirebaseOptions

const app = getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
