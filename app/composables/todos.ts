import {
    collection,
    deleteDoc,
    doc,
    FirestoreError,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    Timestamp,
    updateDoc,
    where,
    type FirestoreDataConverter,
} from 'firebase/firestore'
import { ref, watchPostEffect } from 'vue'

// Only used to create example texts -- DO NOT USE IN PRODUCTION
export const generateText = () => {
    const { $db } = useNuxtApp()

    return doc(collection($db, 'todos'))
        .id
        .substring(0, 10)
        .toLowerCase()
}


const todoConverter: FirestoreDataConverter<TodoDoc> = {
    toFirestore(todo) {
        return todo
    },

    fromFirestore(snapshot) {

        // server optimistic date updates
        const data = snapshot.data({
            serverTimestamps: 'estimate'
        })

        // correctly use the date type
        const createdAt = data.createdAt as Timestamp

        return {
            id: snapshot.id,
            uid: data.uid,
            text: data.text,
            complete: data.complete,
            createdAt: createdAt.toDate()
        }
    }
}

export const useTodos = () => {

    const { $db } = useNuxtApp()
    const user = useUser()

    const todos = ref<{
        data: TodoDoc[]
        loading: boolean
        error: FirestoreError | null
    }>({
        data: [],
        loading: true,
        error: null
    })

    watchPostEffect((onCleanup) => {

        // Must be logged in
        const currentUser = user.value.data

        if (!currentUser) {
            todos.value = {
                loading: user.value.loading,
                data: [],
                error: null
            }

            return
        }

        todos.value = { loading: true, data: [], error: null }

        const unsubscribe = onSnapshot(
            query(
                collection($db, 'todos'),
                where('uid', '==', currentUser.uid),
                orderBy('createdAt')
            ).withConverter(todoConverter),
            (snapshot) => {

                const data = snapshot.docs.map(
                    (document) => document.data()
                )

                if (import.meta.dev) {
                    console.log(data)
                }

                todos.value = { loading: false, data, error: null }
            },
            (error) => {

                todos.value = { loading: false, data: [], error }
            }
        )

        onCleanup(unsubscribe)
    })

    return todos
}

export const addTodo = async (text: string) => {

    const { $auth, $db } = useNuxtApp()
    const user = $auth.currentUser

    if (!user) {
        return { error: 'No user' }
    }

    try {
        await setDoc(
            doc(collection($db, 'todos')),
            {
                uid: user.uid,
                text,
                complete: false,
                createdAt: serverTimestamp()
            }
        )

        return { error: null }
    } catch (error) {

        if (error instanceof FirestoreError) {
            return { error: error.message }
        }
        throw error
    }
}

export const updateTodo = async (id: string, newStatus: boolean) => {

    const { $db } = useNuxtApp()

    try {
        await updateDoc(
            doc($db, 'todos', id),
            {
                complete: newStatus,
                updatedAt: serverTimestamp()
            }
        )

        return { error: null }
    } catch (error) {

        if (error instanceof FirestoreError) {
            return { error: error.message }
        }
        throw error
    }
}

export const deleteTodo = async (id: string) => {

    const { $db } = useNuxtApp()

    try {
        await deleteDoc(
            doc($db, 'todos', id)
        )

        return { error: null }
    } catch (error) {

        if (error instanceof FirestoreError) {
            return { error: error.message }
        }
        throw error
    }
}
