import { getApp, getApps, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

export default defineNuxtPlugin(() => {

    const config = useRuntimeConfig()

    // must be in a plugin to use config variable
    const app = getApps().length
        ? getApp()
        : initializeApp(config.public.FIREBASE_CONFIG)

    const auth = getAuth(app)
    const db = getFirestore(app)

    return {
        provide: {
            auth,
            db
        }
    }
})
