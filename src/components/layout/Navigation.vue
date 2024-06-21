<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Profile } from '@/models/types';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const openMenu = ref(false);

const connectedUser = computed<Profile>(
  () => userStore.me,
);

var logged = ref(false);

const notification = ref(0);

function logout() {
  logged.value = false;
}

onMounted(() => {
  if (userStore.getMe()) {
    logged.value = true;
  } else {
    logged.value = false;
  }
  window.addEventListener('loggedout::hide', () => { logged.value = false; });
  window.addEventListener('loggedin::hide', () => { logged.value = true; });
});
onUnmounted(() => {
  window.removeEventListener('loggedout::hide', () => { logged.value = false; });
  window.removeEventListener('loggedin::hide', () => { logged.value = true; });
})
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
    <div class="flex items-center space-x-2.5 hover:cursor-pointer" v-if="logged" @click="openMenu = !openMenu">
      <img :src="connectedUser.profilePicture" class="h-[6.5vh] rounded-full">
      <span class="mr-2.5">{{ connectedUser.fullname }}</span>
      <img src="/src/assets/images/arrow_down.png" :class="{ navArrow: true, unfolded: openMenu }">
    </div>
    <div class="flex items-center space-x-2.5" v-else>
      <RouterLink to="/login" class="flex gap-2 items-center p-2 bg-tertiary rounded-md" @click="openMenu = false">
        Se connecter
        <span class="material-symbols-rounded"> login </span>
      </RouterLink>
    </div>
    <div v-if="openMenu" class="absolute top-[8%] right-0 bg-white w-[250px] z-10 text-black">
      <RouterLink to="/notification"
        class="flex items-center border text-tertiary rounded bg-quartiary border-tertiary-400 p-2"
        @click="openMenu = false">
        <span class="material-symbols-rounded"> notifications </span>
        Notifications ({{ notification }})
      </RouterLink>
      <RouterLink to="/profile"
        class="flex items-center border text-tertiary rounded bg-quartiary border-tertiary-400 p-2"
        @click="openMenu = false">
        <span class="material-symbols-rounded"> account_circle </span>
        Profil
      </RouterLink>
      <RouterLink to="/login"
        class="flex items-center border text-tertiary rounded border-tertiary-400 p-2 bg-quartiary"
        @click="openMenu = false">
        <span class="material-symbols-rounded"> logout </span>
        Déconnexion
      </RouterLink>
    </div>
  </nav>

  <RouterView />
</template>

<style lang="scss">
@import "../../assets/scss/settings.scss";

.router-link-active {
  color: $quartiary !important;
  background-color: $tertiary !important;
}

.navArrow {
  transform: rotateZ(-90deg);
  transition: all ease 0.2s;
}

.unfolded {
  transform: rotateZ(0deg);
}
</style>