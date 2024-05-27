<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import { ref } from 'vue';

    const name = ref('Jedan-Michel ZEUB');
</script>

<template>
    <nav>
        <div class="menu">
            <RouterLink to="/">
                <img src="../../assets/images/logo_full.png" id="logo"/>
            </RouterLink>
            <RouterLink to="/about">Conversation</RouterLink>
        </div>
        <div class="menu">
            <img src="../../assets/images/pp.png" id="pp"/>
            {{ name }}
            <img src="../../assets/images/arrow_down.png" @click=""/>
        </div>
    </nav>

    <RouterView />
</template>

<style lang="scss">
@import "../../assets/scss/settings.scss";

nav {
    background-color: $primary;
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px 0 10px;
    color: white;
}

.menu {
    display: flex;
    align-items: center;
}

#logo {
    height: 7vh;
}

#pp {
    height: 7vh;
    border-radius: 100%;
}

nav a {
    color: #efeded;
    text-decoration: none;
}

nav a.router-link-exact-active {
    color: white;
    border-bottom: solid 1px white;
}
nav a.router-link-exact-active:hover {
  background-color: transparent;
  cursor: pointer;
}

</style>