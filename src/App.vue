<script setup>
import Navigation from './components/layout/Navigation.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const test = {
  name: "Jean MALADE",
  datePubli: new Date("2024/05/27"),
  content: "Je suis malade et j’ai mal au ventre mais mon cousin ma proposer des huiles essentiels. Que faire ?",
  nbComments: 3,
  nbLike: 50,
  liked: true
}

const user = {
  id: 1,
}
</script>

<template>
  <header>
    <Navigation />
  </header>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

* {
  margin: 0;
  padding: 0;
}

html, body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #333;
}
</style>