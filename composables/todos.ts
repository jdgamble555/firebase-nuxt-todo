import {
    onSnapshot,
    type DocumentData,
    type QuerySnapshot,
    query,
    collection,
    where,
    orderBy,
    setDoc,
    doc,
    serverTimestamp,
    updateDoc,
    deleteDoc,
    Timestamp,
} from "firebase/firestore"

export interface TodoItem {
    id: string
    text: string
    complete: boolean
    createdAt: Date
    uid: string
}

export const snapToData = (
    q: QuerySnapshot<DocumentData, DocumentData>
) => {

    // creates todo data from snapshot
    if (q.empty) {
        return []
    }
    return q.docs.map((doc) => {
        const data = doc.data({
            serverTimestamps: 'estimate'
        })
        const createdAt = data['createdAt'] as Timestamp;
        return {
            ...data,
            createdAt: createdAt.toDate(),
            id: doc.id
        }
    }) as TodoItem[]
}

export const useTodos = () => {

    const runtimeConfig = useRuntimeConfig()

    const { $db } = useNuxtApp()

    const user = useUser()

    const todos = ref<{
        data: TodoItem[]
        loading: boolean
    }>({
        data: [],
        loading: true
    })

    const userData = user.value

    if (!userData) {
        todos.value.loading = false
        todos.value.data = []
        return todos
    }

    watchEffect((onCleanup) => {

        const unsubscribe = onSnapshot(

            // query realtime todo list
            query(
                collection($db, 'todos'),
                where('uid', '==', userData.uid),
                orderBy('createdAt')
            ), (q) => {

                // toggle loading
                todos.value.loading = false

                // get data, map to todo type
                const data = snapToData(q)

                /**
                 * Note: Will get triggered 2x on add 
                 * 1 - for optimistic update
                 * 2 - update real date from server date
                */

                // print data in dev mode
                if (runtimeConfig.public.dev) {
                    console.log(data)
                }

                // add to store
                todos.value.data = data
            })

        onCleanup(unsubscribe)
    })

    return todos
}

export const addTodo = async (e: Event) => {

    const uid = useUser().value?.uid

    // get and reset form
    const target = e.target as HTMLFormElement
    const form = new FormData(target)
    const { task } = Object.fromEntries(form)

    // reset form
    target.reset()

    if (!uid) {
        throw 'No user!'
    }

    const { $db } = useNuxtApp()

    setDoc(doc(collection($db, 'todos')), {
        uid,
        text: task,
        complete: false,
        createdAt: serverTimestamp()
    })
}

export const updateTodo = (id: string, newStatus: boolean) => {
    const { $db } = useNuxtApp()
    updateDoc(doc($db, 'todos', id), { complete: newStatus })
}

export const deleteTodo = (id: string) => {
    const { $db } = useNuxtApp()
    deleteDoc(doc($db, 'todos', id))
}
