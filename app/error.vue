<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()

const goHome = () => clearError({ redirect: '/' })
</script>

<template>
    <main class="min-h-screen flex flex-col items-center justify-center gap-4 p-5 text-center">
        <h1 class="text-3xl font-bold">Something went wrong</h1>
        <p class="text-gray-600">{{ error.status }}: {{ error.message }}</p>
        <button class="rounded-lg bg-blue-600 p-3 font-semibold text-white" @click="goHome">
            Back to Home
        </button>
    </main>
</template>
