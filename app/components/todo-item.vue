<script setup lang="ts">
const { todo } = defineProps<{ todo: TodoDoc }>()
const actionError = ref<string | null>(null)

const runAction = async (action: () => Promise<{ error: string | null }>) => {
    actionError.value = null
    actionError.value = (await action()).error
}
</script>

<template>
    <span :class="todo.complete ? 'line-through text-green-700' : ''">
        {{ todo.text }}
    </span>
    <span :class="todo.complete ? 'line-through text-green-700' : ''">
        {{ todo.id }}
    </span>
    <button type="button" @click="runAction(() => updateTodo(todo.id, !todo.complete))" v-if="todo.complete">
        ✔️
    </button>
    <button type="button" @click="runAction(() => updateTodo(todo.id, !todo.complete))" v-else>
        ❌
    </button>
    <button type="button" @click="runAction(() => deleteTodo(todo.id))">
        🗑
    </button>
    <p v-if="actionError" class="col-span-4 text-red-600" role="alert">{{ actionError }}</p>
</template>
