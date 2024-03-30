<script setup lang="ts">
const { todo } = defineProps<{ todo: TodoItem }>()
</script>

<template>
    <span :class="todo.complete ? 'line-through text-green-700' : ''">{{ todo.text }}</span>
    <span :class="todo.complete ? 'line-through text-green-700' : ''">{{ todo.id }}</span>
    <template v-if="todo.complete">
        <button type="button" @click="updateTodo(todo.id, !todo.complete)"> ✔️ </button>
    </template>
    <template v-else>
        <button type="button" @click="updateTodo(todo.id, !todo.complete)"> ❌ </button>
    </template>
    <button type="button" @click="deleteTodo(todo.id)"> 🗑 </button>
</template>