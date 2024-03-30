<script setup lang="ts">

const user = useUser()

</script>

<template>
    <template v-if="user">
        <div class="flex flex-col justify-center items-center gap-3">
            <h3 class="text-2xl font-bold">Hi {{ user.displayName }}!</h3>
            <template v-if="user?.photoURL">
                <img :src="user.photoURL" height="100" width="100" alt="user avatar" />
            </template>
            <p>Your userID is {{ user.uid }}</p>
        </div>
    </template>
</template>
