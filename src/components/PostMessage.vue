<script setup lang="ts">
import { ref, defineProps } from "vue";
import dayjs from "dayjs";
import { useToast } from 'vue-toast-notification';
import { usePostStore } from '@/stores/post';
import ReplyList from "@/components/ReplyList.vue";
import { Post } from "@/models/types";

export interface PostListProps {
    post: Post;
}

const props = defineProps<PostListProps>();

const postStore = usePostStore();
const $toast = useToast();

const replying = ref(false);
const reply = ref('');

const name = $cookies.get("me").name;

function toggleLike(message: Post) {
    message.liked = !message.liked;
    message.nbLike += message.liked ? 1 : -1;
};

async function newAnswer() {
    try {
        if (reply.value.trim().length === 0) {
            $toast.error('Réponse requise', {
                position: 'bottom-right',
                duration: 3000,
            });

            return;
        }

        await postStore.addResponse(reply.value, props.post?.id);
        await postStore.fetchPosts();

        reply.value = '';
        replying.value = false;

        $toast.success('Succès lors de l\'ajout du post.', {
            position: 'top',
            duration: 3000,
        });
    } catch (error) {
        $toast.error('Erreur lors de l\'ajout de la réponse.', {
            position: 'top',
            duration: 3000,
        });
    }
}
</script>

<template>
    <div class="bg-secondary border-[3px] border-primary rounded-tl-lg rounded-tr-lg rounded-br-lg p-2 mt-6">
        <div class="flex justify-between text-primary text-sm">
            <h3>
                {{
                    props.post.name += (props.post.name == name
                        ? ' (moi)'
                        : '')
                }}
            </h3>
            <h3>{{ dayjs(props.post.datePubli).format("DD/MM/YYYY") }}</h3>
        </div>
        <p class="my-2.5 text-justify text-tertiary text-lg">
            {{ props.post.content }}
        </p>
        <div class="flex">
            <div class="w-full">
                <i v-if="!replying" class="text-primary text-lg cursor-pointer" @click="replying = true">Répondre...</i>
                <textarea v-if="replying" v-model="reply"
                    class="h-18 w-full resize-none bg-quartiary border-2 border-primary rounded-lg p-1.5"></textarea>
                <div class="flex items-center justify-between">
                    <button v-if="replying" @click="replying = false"
                        class="bg-primary border-none rounded-lg px-3 py-1 text-white font-bold transition-colors duration-300 cursor-pointer hover:bg-tertiary">
                        Annuler
                    </button>
                    <button v-if="replying" @click="newAnswer"
                        class="bg-tertiary border-none rounded-lg px-3 py-1 text-white font-bold transition-colors duration-300 cursor-pointer hover:bg-primary">
                        Répondre
                    </button>
                </div>
            </div>
            <div class="ml-auto">
                <div class="flex text-tertiary">
                    <div class="flex items-center ml-2.5">
                        <span class="material-symbols-rounded mx-1.5">comment</span>
                        <h4>{{ props.post.nbReplies }}</h4>
                    </div>
                    <div class="flex items-center ml-2.5">
                        <i v-if="props.post.liked" class="fa-solid fa-heart mx-1.5 cursor-pointer text-xl"
                            @click="toggleLike(props.post)"></i>
                        <i v-else class="fa-regular fa-heart mx-1.5 cursor-pointer text-xl"
                            @click="toggleLike(props.post)"></i>
                        <h4>{{ props.post.nbLike }}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <slot />
    <ReplyList :replies="props.post.replies" />
</template>