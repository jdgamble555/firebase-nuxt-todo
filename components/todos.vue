<script setup lang="ts">

const todos = useTodos()

</script>

<template>
    <template v-if="todos.data.length">
        <div class="grid grid-cols-[auto,auto,auto,auto] gap-3 justify-items-start">
            <template v-for="todo in todos.data" :key="todo.id">
                <TodoItem :todo="todo" />
            </template>
        </div>
    </template>
    <template v-else>
        <p><b>Add your first todo item!</b></p>
    </template>
    <TodoForm />
</template>