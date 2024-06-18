<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import { Profile, Post } from '@/models/types';
import { usePostStore } from '@/stores/post';
import BubbleMessage from '@/components/BubbleMessage.vue';

const postStore = usePostStore();

const $toast = useToast();

const replying = ref(false);
const post = ref('');

function newPost() {
  try {
    postStore.addPost(post.value);

    $toast.success('Succès lors de l\'ajout du post.', {
      position: 'top',
      duration: 3000,
    });
  } catch (error) {
    $toast.error('Erreur lors de l\'ajout du post.', {
      position: 'top',
      duration: 3000,
    });
  }
}

onMounted(() => {
  postStore.getPosts();
});
</script>

<template>
  <RouterLink to="/user/test">
    Test
  </RouterLink>

  <main class="flex flex-col items-center justify-center mt-10">
    <h2 v-if="!replying" @click="replying = true" 
      class="text-white bg-tertiary p-4 rounded-lg text-center w-1/4 text-xl font-semibold uppercase cursor-pointer transition-colors duration-300 hover:bg-primary"
    >
      Poster
    </h2>
    <div v-if="replying">
      <textarea class="w-96 h-32 border-tertiary border-solid border-2 rounded-xl p-2 resize-none bg-quartiary" v-model="post"></textarea>
      <div class="flex justify-between">
        <button v-if="replying" @click="replying = false"
            class="bg-primary border-none rounded-lg px-3 py-1 text-white font-semibold transition-colors duration-300 cursor-pointer hover:bg-tertiary"
        >
            Annuler
        </button>
        <button v-if="replying" @click="newPost"
            class="bg-tertiary border-none rounded-lg px-3 py-1 text-white font-semibold transition-colors duration-300 cursor-pointer hover:bg-primary"
        >
            Répondre
        </button>
      </div>
    </div>
    
    <div v-for="message in postStore.posts" class="w-3/5">
      <BubbleMessage :param="message" />
    </div> 
  </main>
</template>
