<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { Profile } from '@/models/types';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const openMenu = ref(false);

const connectedUser = computed<Profile>(
  () => userStore.me,
);
const notification = ref(0);

onMounted(() => {
  userStore.getMe();
});
</script>

<template>
  <nav class="bg-primary h-[8vh] flex items-center justify-between px-2.5 text-white">
    <div class="flex items-center text-gray-200 space-x-2.5">
      <RouterLink to="/">
        <img class="h-[6.5vh]" src="/src/assets/images/logo_full.png">
      </RouterLink>
      <RouterLink to="/doctors" class="px-2">
        Docteurs
      </RouterLink>
      <RouterLink to="/conversation" class="px-2">
        Conversation
      </RouterLink>
      <RouterLink to="/historique" class="px-2">
        Historique
      </RouterLink>
    </div>
    <div class="flex items-center space-x-2.5" v-if="connectedUser">
      <img :src="connectedUser.profilePicture" class="h-[6.5vh] rounded-full">
      <span class="mr-2.5">{{ connectedUser.fullname }}</span>
      <img src="/src/assets/images/arrow_down.png" class="mr-2.5 hover:cursor-pointer" @click="openMenu = !openMenu">
    </div>
    <div v-if="openMenu" class="absolute top-[8%] right-0 bg-white w-[250px] z-10 text-black">
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

<style>
.router-link-active {
  color: white;
}
</style>