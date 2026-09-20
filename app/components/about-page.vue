<script setup lang="ts">

const { data, error } = await useAbout()

</script>

<template>
    <p v-if="error" class="text-red-600" role="alert">{{ error.message }}</p>
    <div v-else-if="data" class="flex items-center justify-center my-5">
        <div class="border w-[400px] p-5 flex flex-col gap-3">
            <h1 class="text-3xl font-semibold">{{ data.name }}</h1>
            <p>{{ data.description }}</p>
        </div>
    </div>
</template>
