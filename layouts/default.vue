<template>
    <main>
        <slot />
        <nav class="flex gap-3 justify-center mt-5">
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/about">About</NuxtLink>
        </nav>
    </main>
</template>