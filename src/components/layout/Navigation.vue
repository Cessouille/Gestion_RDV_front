<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import { ref } from 'vue';

    const openMenu = ref(false);

    const name = ref('Jedan-Michel ZEUB');
    const profilePicture = ref('/src/assets/images/pp.png')
    const notification = ref(0);
</script>

<template>
  <nav>
    <div class="nav">
      <RouterLink to="/">
        <img
          id="logo"
          class="image"
          src="/src/assets/images/Logo (2).png"
        >
      </RouterLink>
      <RouterLink
        to="/conversation"
        class="item"
      >
        Conversation
      </RouterLink>
      <RouterLink
        to="/historique"
        class="item"
      >
        Historique
      </RouterLink>
    </div>
    <div class="nav">
        <img
          id="pp"
          :src="profilePicture"
          class="image"
        >
        <span class="item">{{ name }}</span>
        <img
          src="/src/assets/images/arrow_down.png"
          class="item arrow"
          @click="openMenu = !openMenu"
        >
      </div>
      <div v-if="openMenu" class="menu">
        <ul>
          <li>Notifications ({{ notification }})</li>
          <li>Profil</li>
          <li>Déconnexion</li>
        </ul>
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

.nav {
    display: flex;
    align-items: center;
    width: auto;
}

.menu {
    color: black;
    position: absolute;
    top: 8.5%;
    right: 0;
    background-color: white;
    width: 250px;
    z-index: 1;
}

li {
    border: solid #A4A4A4;
    border-width: 2px;
    padding: 2px;
    border-collapse: separate;
}

.image {
    height: 6.5vh;
}

#pp {
    border-radius: 100%;
}

.item {
    margin: 0 10px;
}

.item:hover {
    cursor: pointer;
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