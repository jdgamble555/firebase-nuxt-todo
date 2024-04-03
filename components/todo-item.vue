<script setup lang="ts">
const { todo } = defineProps<{ todo: TodoItem }>()
</script>

<template>
    <span :class="todo.complete ? 'line-through text-green-700' : ''">
        {{ todo.text }}
    </span>
    <span :class="todo.complete ? 'line-through text-green-700' : ''">
        {{ todo.id }}
    </span>
    <button type="button" @click="updateTodo(todo.id, !todo.complete)" v-if="todo.complete">
        ✔️
    </button>
    <button type="button" @click="updateTodo(todo.id, !todo.complete)" v-else>
        ❌
    </button>
    <button type="button" @click="deleteTodo(todo.id)">
        🗑
    </button>
</template>