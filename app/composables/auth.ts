import { FirebaseError } from 'firebase/app'
import { GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth'
import { inject, provide, shallowRef, watchPostEffect, type ShallowRef } from 'vue'

// User context key
const USER_KEY = Symbol('user')

export const setUser = () => {
    const { $auth } = useNuxtApp()
    const user = shallowRef<UserState>({
        loading: true,
        data: null,
        error: null
    })

    // Create user listener
    watchPostEffect((onCleanup) => {
        const unsubscribe = onIdTokenChanged($auth, (currentUser) => {

            // not logged in
            if (!currentUser) {
                user.value = { loading: false, data: null, error: null }
                return
            }

            // logged in
            const { displayName, photoURL, uid, email } = currentUser
            user.value = {
                loading: false,
                data: { displayName, photoURL, uid, email },
                error: null
            }
        }, (error) => {
            user.value = { loading: false, data: null, error: error.message }
        })

        onCleanup(unsubscribe)
    })

    provide(USER_KEY, user)

    return user
}

export const getUser = () => {
    const user = inject<ShallowRef<UserState> | null>(USER_KEY, null)
    if (!user) throw new Error('User state has not been provided')
    return user
}

export const loginWithGoogle = async () => {

    const { $auth } = useNuxtApp()

    try {
        await signInWithPopup($auth, new GoogleAuthProvider())
        return { error: null }
    } catch (error) {

        if (error instanceof FirebaseError) {
            return { error: error.message }
        }

        throw error
    }
}

export const logout = async () => {

    const { $auth } = useNuxtApp()

    try {
        await signOut($auth)
        return { error: null }
    } catch (error) {

        if (error instanceof FirebaseError) {
            return { error: error.message }
        }

        throw error
    }
}
