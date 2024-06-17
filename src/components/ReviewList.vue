<script setup lang="ts">
import { ref } from 'vue'
import BubbleMessage from '@/components/BubbleMessage.vue';
import ReplyList from '@/components/ReplyList.vue';
import { BubbleMessageParam } from '@/models/types';

const test = ref<BubbleMessageParam>({
  name: "Jean MALADE",
  datePubli: new Date("2024/05/27"),
  content: "Je suis malade et j’ai mal au ventre mais mon cousin ma proposer des huiles essentiels. Que faire ?",
  nbComments: 3,
  nbLike: 50,
  liked: true,
  thumbed: false
});

const test2 = ref<BubbleMessageParam>({
  name: "Jean MALADE",
  datePubli: new Date("2024/05/27"),
  content: "Je suis malade et j’ai mal au ventre mais mon cousin ma proposer des huiles essentiels. Que faire ?",
  nbComments: 3,
  nbLike: 50,
  liked: true,
  thumbed: null
});

const reviews = ref([
    test, test2
]);

const replies = ref([
    {
        id: 1,
        name: "Christien Opticien",
        description: "En tant qu'opticien, je ne sais pas ..."
    },
    {
        id: 2,
        name: "Opticien Christien",
        description: "En tant que christien, je sais !"
    }
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
                <ReplyList :replies="replies"/>
            </div>
        </div>
    </div>
</template>