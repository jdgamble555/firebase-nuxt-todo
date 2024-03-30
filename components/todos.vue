<script setup lang="ts">

const todos = useTodos()

</script>

<template>
    <template v-if="todos.data.length">
        <div class="grid grid-cols-[auto,auto,auto,auto] gap-3 justify-items-start" 
            v-for="todo in todos.data"
            :key="todo.id">
            <TodoItem :todo="todo" />
        </div>
    </template>
    <p class="font-bold" v-else>
        Add your first todo item!
    </p>
    <TodoForm />
</template>