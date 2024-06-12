<script setup>
import { ref } from 'vue';
import BubbleMessage from '@/components/BubbleMessage.vue';
import ReplyList from '@/components/ReplyList.vue';

const replying = ref(false);

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
  <main>
    <h2 v-if="!replying" @click="replying = true">Poster</h2>
    <div v-if="replying">
      <textarea  class="w-96 h-32 border-tertiary border-solid border-2 rounded-xl p-2 resize-none bg-quartiary">eze</textarea>
      <div class="flex justify-between">
        <h3 class="bg-secondary p-2 rounded-xl text-primary font-bold cursor-pointer" @click="replying = false">Annuler</h3>
        <h3 class="bg-tertiary p-2 rounded-xl font-bold text-white cursor-pointer">Envoyer</h3>
      </div>
    </div>
    
    <div id="fil">
      <BubbleMessage  :name="test.name" :datePubli="test.datePubli" :content="test.content" :nbComments="test.nbComments" :nbLike.sync="test.nbLike" :liked.sync="test.liked">
        <ReplyList />
        <ReplyList />
        <ReplyList />
      </BubbleMessage>
      <BubbleMessage  :name="test.name" :datePubli="test.datePubli" :content="test.content" :nbComments="test.nbComments" :nbLike.sync="test.nbLike" :liked.sync="test.liked"/>
      <BubbleMessage  :name="test.name" :datePubli="test.datePubli" :content="test.content" :nbComments="test.nbComments" :nbLike.sync="test.nbLike" :liked.sync="test.liked"/>
    </div> 
  </main>
</template>
<style lang="scss">
@import "../assets/scss/settings.scss";
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;

}
h2 {
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: white;
  background-color: $tertiary;
  padding: 15px;
  width: 25%;
  text-align: center;
  border-radius: 15px;
  transition: background-color 0.3s;
}
h2:hover {
  background-color: $primary;
  cursor: pointer;
}


</style>