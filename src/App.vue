<script setup>
import Navigation from './components/layout/Navigation.vue';
import BubbleMessage from './components/BubbleMessage.vue';

const test = {
  name: "Jean MALADE",
  datePubli: new Date("2024/05/27"),
  content: "Je suis malade et j’ai mal au ventre mais mon cousin ma proposer des huiles essentiels. Que faire ?",
  nbComments: 3,
  nbLike: 50,
  liked: true
}
</script>

<template>
  <header>
    <Navigation />
    <BubbleMessage :name="test.name" :datePubli="test.datePubli" :content="test.content" :nbComments="test.nbComments" :nbLike="test.nbLike" :liked="test.liked"/>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

* {
  margin: 0;
  padding: 0;
}
</style>