<template>
    <form class="flex gap-3 items-center justify-center mt-5" @submit.prevent="addTodo">
        <input class="border p-2" name="task" />
        <button class="border p-2 rounded-md text-white bg-sky-700" type="submit">
            Add Task
        </button>
    </form>
</template>
