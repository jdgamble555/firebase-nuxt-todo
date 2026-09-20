<script setup lang="ts">

const todos = useTodos()

</script>

<template>
    <p v-if="todos.loading">Loading...</p>
    <p v-else-if="todos.error" class="text-red-600" role="alert">{{ todos.error.message }}</p>
    <div class="grid grid-cols-[auto,auto,auto,auto] gap-3 justify-items-start" v-else-if="todos.data.length">
        <template v-for="todo in todos.data" :key="todo.id">
            <TodoItem :todo="todo" />
        </template>
    </div>
    <p class="font-bold" v-else>
        Add your first todo item!
    </p>
    <TodoForm />
</template>
