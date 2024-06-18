<script setup lang="ts">
import { ref } from 'vue'
import BubbleMessage from '@/components/BubbleMessage.vue';
import { Post } from '@/models/types';

const test = ref<Post>({
  name: "Jean MALADE",
  datePubli: new Date("2024/05/27"),
  content: "Je suis malade et j’ai mal au ventre mais mon cousin ma proposer des huiles essentiels. Que faire ?",
  nbLike: 50,
  liked: true,
  thumbed: false
});

const test2 = ref<Post>({
  name: "Jean MALADE",
  datePubli: new Date("2024/05/27"),
  content: "Je suis malade et j’ai mal au ventre mais mon cousin ma proposer des huiles essentiels. Que faire ?",
  nbLike: 50,
  liked: true,
  thumbed: null
});

const reviews = ref([
    test, test2
]);
</script>

<template>
    <div class="w-full">
        <h2 class="text-tertiary font-bold text-center text-xl">Reviews</h2>
        <div class="flex items-center" v-for="review in reviews">
            <div class="items-center text-tertiary text-xl">
                <div class="px-2" v-if="review.value.thumbed == null || review.value.thumbed">
                    <i class="fa-solid fa-thumbs-up hover:cursor-pointer"
                         @click="review.value.thumbed = (review.value.thumbed == null ? true : null)"></i>
                </div>
                <div class="p-2" v-if="review.value.thumbed == null || !review.value.thumbed">
                    <i class="fa-solid fa-thumbs-down hover:cursor-pointer" 
                        @click="review.value.thumbed = (review.value.thumbed == null ? false : null)"></i>
                </div>
            </div>
            <div>
                <BubbleMessage :param="review.value" />
            </div>
        </div>
    </div>
</template>