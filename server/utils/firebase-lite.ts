import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

const config = useRuntimeConfig()
const app = getApps().length
    ? getApp()
    : initializeApp(config.public.FIREBASE_CONFIG)

export const serverDB = getFirestore(app)
