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
          src="/src/assets/images/logo_full.png"
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
          class="item image"
        >
        <span class="item">{{ name }}</span>
        <img
          src="/src/assets/images/arrow_down.png"
          class="item arrow"
          @click="openMenu = !openMenu"
        >
      </div>
      <div v-if="openMenu" class="menu">
          <RouterLink to="/notification" class="menuItem" @click="openMenu = false">
            <span class="material-symbols-rounded"> notifications </span> 
            Notifications ({{ notification }})
          </RouterLink>
          <RouterLink to="/profile" class="menuItem" @click="openMenu = false">
            <span class="material-symbols-rounded"> account_circle </span>
            Profil
          </RouterLink>
          <RouterLink to="/logout" class="menuItem" @click="openMenu = false">
            <span class="material-symbols-rounded"> logout </span>
            Déconnexion
          </RouterLink>
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
    width: 225px;
    z-index: 1;
}

.image {
    height: 6.5vh;
}

#pp {
    border-radius: 100%;
}

.item {
    margin-right: 7.5px;
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
}
nav a.router-link-exact-active:hover {
  background-color: transparent;
  cursor: pointer;
}

.menuItem {
  color: black;
  display: flex;
  align-items: center;
  border: solid #A4A4A4;
  border-width: 2px;
  padding: 2px;
}

.menuItem.router-link-exact-active {
  color: black;
}

.menuItem span {
  margin: 0 5px;
}

</style>