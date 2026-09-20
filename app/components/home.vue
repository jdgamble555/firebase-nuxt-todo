<script setup lang="ts">

const user = useUser()
const actionError = ref<string | null>(null)

const onLogin = async () => {
    actionError.value = null
    actionError.value = (await loginWithGoogle()).error
}

const onLogout = async () => {
    actionError.value = null
    actionError.value = (await logout()).error
}

</script>

<template>
    <section class="flex flex-col gap-3 p-5 items-center">
        <p v-if="user.error || actionError" class="text-red-600" role="alert">
            {{ user.error || actionError }}
        </p>
        <p v-if="user.loading">Loading...</p>
        <template v-else-if="user.data">
            <Profile />
            <button class="border bg-blue-600 text-white w-fit p-3 rounded-lg font-semibold" @click="onLogout">
                Logout
            </button>
            <hr />
            <Todos />
        </template>
        <button class="bg-red-600 text-white font-semibold p-2" @click="onLogin" v-else>
            Signin with Google
        </button>
    </section>
</template>
