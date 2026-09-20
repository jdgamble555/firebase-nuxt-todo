import { doc, getDoc } from 'firebase/firestore/lite'
import { serverDB } from '#server/utils/firebase-lite'

export default defineEventHandler(async () => {
    const aboutSnap = await getDoc(
        doc(serverDB, 'about', 'ZlNJrKd6LcATycPRmBPA')
    )

    if (!aboutSnap.exists()) {
        throw createError({ statusCode: 404, statusMessage: 'About document does not exist' })
    }

    const data = aboutSnap.data()

    return data as AboutDoc
})
