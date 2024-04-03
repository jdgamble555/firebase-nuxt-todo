import {
    GoogleAuthProvider,
    onIdTokenChanged,
    signInWithPopup,
    signOut,
    type User,
    type Unsubscribe
} from "firebase/auth"

export type UserType = {
    displayName: string | null
    photoURL: string | null
    uid: string
    email: string | null
}

export const useUser = () => {

    const { $auth } = useNuxtApp()

    const user = useState<UserType | null>('user', () => null)

    const initialLoad = useState<boolean>('user-initial-load', () => true)

    if (!initialLoad.value) {
        return user
    }

    let unsubscribe: Unsubscribe = () => {}

    onMounted(() => {
        initialLoad.value = false
        unsubscribe = onIdTokenChanged($auth, (_user: User | null) => {
            if (!_user) {
                user.value = null
                return
            }
            const { displayName, photoURL, uid, email } = _user
            user.value = { displayName, photoURL, uid, email }
        })
    })

    onUnmounted(unsubscribe)

    return user
}

export const loginWithGoogle = async () => {
    const { $auth } = useNuxtApp()
    await signInWithPopup($auth, new GoogleAuthProvider())
}

export const logout = async () => {
    const { $auth } = useNuxtApp()
    await signOut($auth)
} 