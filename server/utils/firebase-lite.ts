import { getApp, getApps, initializeApp, type FirebaseOptions } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = JSON.parse(process.env.VITE_FIREBASE_CONFIG!) as FirebaseOptions

const app = getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)

export const serverDB = getFirestore(app)
