<script setup lang="ts">

const user = useUser()

</script>

<template>
    <div class="flex flex-col justify-center items-center gap-3" v-if="user">
        <h3 class="text-2xl font-bold">Hi {{ user.displayName }}!</h3>
        <img :src="user.photoURL" height="100" width="100" alt="user avatar" v-if="user?.photoURL" />
        <p>Your userID is {{ user.uid }}</p>
    </div>
</template>