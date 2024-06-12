<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';

const openMenu = ref(false);

const name = ref('Jedan-Michel ZEUB');
const profilePicture = ref('/src/assets/images/pp.png')
const notification = ref(0);
</script>

<template>
  <nav class="bg-primary h-[8vh] flex items-center justify-between px-2.5 text-white">
    <div class="flex items-center space-x-2.5">
      <RouterLink to="/">
        <img
          id="logo"
          class="h-[6.5vh]"
          src="/src/assets/images/logo_full.png"
        >
      </RouterLink>
      <RouterLink
        to="/conversation"
        class="mr-2.5 hover:cursor-pointer"
      >
        Conversation
      </RouterLink>
      <RouterLink
        to="/historique"
        class="mr-2.5 hover:cursor-pointer"
      >
        Historique
      </RouterLink>
    </div>
    <div class="flex items-center space-x-2.5">
        <img
          id="pp"
          :src="profilePicture"
          class="h-[6.5vh] rounded-full"
        >
        <span class="mr-2.5">{{ name }}</span>
        <img
          src="/src/assets/images/arrow_down.png"
          class="mr-2.5 hover:cursor-pointer"
          @click="openMenu = !openMenu"
        >
      </div>
      <div v-if="openMenu" class="absolute top-[8%] right-0 bg-white w-[225px] z-10 text-black">
          <RouterLink to="/notification" class="flex items-center border border-gray-400 p-2" @click="openMenu = false">
            <span class="material-symbols-rounded"> notifications </span> 
            Notifications ({{ notification }})
          </RouterLink>
          <RouterLink to="/profile" class="flex items-center border border-gray-400 p-2" @click="openMenu = false">
            <span class="material-symbols-rounded"> account_circle </span>
            Profil
          </RouterLink>
          <RouterLink to="/logout" class="flex items-center border border-gray-400 p-2" @click="openMenu = false">
            <span class="material-symbols-rounded"> logout </span>
            Déconnexion
          </RouterLink>
    </div>
  </nav>

  <RouterView />
</template>