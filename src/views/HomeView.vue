<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { usePostStore } from '@/stores/post';
import { useUserStore } from '@/stores/user';
import Loader from "@/components/loader/Loader.vue";
import PostMessage from "@/components/PostMessage.vue";

const $toast = useToast();
const router = useRouter();

const postStore = usePostStore();
const userStore = useUserStore();

const posting = ref(false);
const post = ref('');

async function newPost() {
  try {
    if (post.value.trim().length === 0) {
      $toast.error('Message requis', {
        position: 'bottom-right',
        duration: 3000,
      });

      return;
    }

    await postStore.add(post.value);
    await postStore.fetchPosts();

    post.value = '';
    posting.value = false;

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

onMounted(async () => {
  if (!userStore.isAuthentificated) {
    router.push({ path: '/doctors' });
  } else {
    await postStore.fetchPosts();
  }
});
</script>

<template>
  <main class="flex flex-col items-center justify-center mt-4" v-if="postStore.posts">
    <h2 v-if="!posting" @click="posting = true"
      class="text-white bg-tertiary p-4 rounded-lg text-center w-1/4 text-xl font-semibold uppercase cursor-pointer transition-colors duration-300 hover:bg-primary">
      Poster
    </h2>
    <div v-if="posting">
      <textarea class="w-96 h-32 border-tertiary border-solid border-2 rounded-xl p-2 resize-none bg-quartiary"
        v-model="post"></textarea>
      <div class="flex justify-between">
        <button v-if="posting" @click="posting = false"
          class="bg-primary border-none rounded-lg px-3 py-1 text-white font-semibold transition-colors duration-300 cursor-pointer hover:bg-tertiary">
          Annuler
        </button>
        <button v-if="posting" @click="newPost"
          class="bg-tertiary border-none rounded-lg px-3 py-1 text-white font-semibold transition-colors duration-300 cursor-pointer hover:bg-primary">
          Poster
        </button>
      </div>
    </div>

    <div v-for="message in postStore.posts" :key="message.id" class="w-3/5">
      <PostMessage :post="message" />
    </div>
  </main>

  <main v-else>
    <Loader message="Chargement des posts" class="pt-16" />
  </main>
</template>
