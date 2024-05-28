<script setup>
import Navigation from './components/layout/Navigation.vue';
import BubbleMessage from './components/BubbleMessage.vue';
</script>

<template>
  <header>
    <Navigation/>
    <BubbleMessage name="Jean MALADE" datePubli="27/05/2024" content="Je suis malade et j’ai mal au ventre mais mon cousin ma proposer des huiles essentiels. Que faire ?" nbComments="3" nbLike="50" liked/>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

* {
  margin: 0;
  padding: 0;
}
</style>