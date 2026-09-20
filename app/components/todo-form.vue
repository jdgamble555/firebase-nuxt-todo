<script setup lang="ts">
const text = ref(generateText())
const error = ref<string | null>(null)

const onSubmit = async () => {
    error.value = null
    const result = await addTodo(text.value)
    error.value = result.error
    if (!result.error) text.value = generateText()
}
</script>

<template>
    <form class="flex gap-3 items-center justify-center mt-5" @submit.prevent="onSubmit">
        <input v-model="text" class="border p-2" name="task" required />
        <button class="border p-2 rounded-md text-white bg-sky-700" type="submit">
            Add Task
        </button>
    </form>
    <p v-if="error" class="text-red-600" role="alert">{{ error }}</p>
</template>
