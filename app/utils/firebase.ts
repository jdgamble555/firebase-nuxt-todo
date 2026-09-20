import { getApp, getApps, initializeApp, type FirebaseOptions } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// import your .env variable
// VITE_FIREBASE_CONFIG={YOUR FIREBASE CONFIG}
// make sure the Firebase keys are in Quotes ""
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG) as FirebaseOptions

const app = getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
