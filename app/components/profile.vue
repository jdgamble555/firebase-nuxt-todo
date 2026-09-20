<script setup lang="ts">

const user = getUser()

</script>

<template>
    <div class="flex flex-col justify-center items-center gap-3" v-if="user.data">
        <h3 class="text-2xl font-bold">Hi {{ user.data.displayName }}!</h3>
        <img :src="user.data.photoURL" height="100" width="100" alt="user avatar" v-if="user.data.photoURL" />
        <p>Your userID is {{ user.data.uid }}</p>
    </div>
</template>
