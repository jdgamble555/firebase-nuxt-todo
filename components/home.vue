<script setup lang="ts">

const user = useUser()

</script>

<template>
    <section class="flex flex-col gap-3 p-5 items-center">
        <template v-if="user">
            <Profile />
            <button class="border bg-blue-600 text-white w-fit p-3 rounded-lg font-semibold" @click="logout">
                Logout
            </button>
            <hr />
            <Todos />
        </template>
        <button class="bg-red-600 text-white font-semibold p-2" @click="loginWithGoogle" v-else>
            Signin with Google
        </button>
    </section>
</template>