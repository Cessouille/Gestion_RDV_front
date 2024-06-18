<script setup lang="ts">
import dayjs from "dayjs";
import ReplyList from "@/components/ReplyList.vue";
import { Post } from "@/models/types";

import { ref, defineProps } from "vue";

export interface BubbleMessageProps {
    param: Post;
}

const props = defineProps<BubbleMessageProps>();

const replying = ref(false);

const liked = ref(props.param.liked);
const nbLike = ref(props.param.nbLike.valueOf());

const name = $cookies.get("userName");

const replies = ref([
    {
        id: 1,
        name: "Christien Opticien",
        description: "En tant qu'opticien, je ne sais pas ...",
    },
    {
        id: 2,
        name: "Opticien Christien",
        description: "En tant que christien, je sais !",
    },
]);

const toggleLike = () => {
    liked.value = !liked.value;
    if (liked.value) {
        nbLike.value += 1;
    } else {
        nbLike.value -= 1;
    }
};
</script>

<template>
    <div class="bg-secondary border-[3px] border-primary rounded-tl-lg rounded-tr-lg rounded-br-lg p-2 mt-6">
        <div class="flex justify-between text-primary text-sm">
            <h3>
                {{
                    props.param.name == name
                        ? props.param.name + " (moi)"
                        : props.param.name
                }}
            </h3>
            <h3>{{ dayjs(props.param.datePubli).format("DD/MM/YYYY") }}</h3>
        </div>
        <p class="my-2.5 text-justify text-tertiary text-lg">
            {{ props.param.content }}
        </p>
        <div class="flex">
            <div class="w-full">
                <i v-if="!replying" class="text-primary text-lg cursor-pointer" @click="replying = true">Répondre...</i>
                <textarea v-if="replying"
                    class="h-18 w-full resize-none bg-quartiary border-2 border-primary rounded-lg p-1.5"></textarea>
                <div class="flex items-center justify-between">
                    <button v-if="replying" @click="replying = false"
                        class="bg-primary border-none rounded-lg px-3 py-1 text-white font-bold transition-colors duration-300 cursor-pointer hover:bg-tertiary">
                        Annuler
                    </button>
                    <button v-if="replying"
                        class="bg-tertiary border-none rounded-lg px-3 py-1 text-white font-bold transition-colors duration-300 cursor-pointer hover:bg-primary">
                        Répondre
                    </button>
                </div>
            </div>
            <div class="ml-auto">
                <div class="flex text-tertiary">
                    <div class="flex items-center ml-2.5">
                        <span class="material-symbols-rounded mx-1.5">comment</span>
                        <h4>{{ replies.length }}</h4>
                    </div>
                    <div class="flex items-center ml-2.5">
                        <i v-if="liked" class="fa-solid fa-heart mx-1.5 cursor-pointer text-xl" @click="toggleLike"></i>
                        <i v-else class="fa-regular fa-heart mx-1.5 cursor-pointer text-xl" @click="toggleLike"></i>
                        <h4>{{ nbLike }}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <slot />
    <ReplyList :replies="replies" />
</template>
