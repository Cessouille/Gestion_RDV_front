<script setup>
    import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav>
        <RouterLink to="/"><img src="../../../logo.png"/></RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </nav>

    <RouterView />
</template>

<style lang="scss">
@import "../../assets/scss/settings.scss";

img {
  width: 20%;
}

nav {
    background-color: $primary;
}

</style>