<script setup lang="ts">
import { ref, defineProps } from "vue";
import { useRoute } from 'vue-router';
import dayjs from "dayjs";
import { useToast } from 'vue-toast-notification';
import { usePostStore } from '@/stores/post';
import ReplyList from "@/components/ReplyList.vue";
import { Post } from "@/models/types";

export interface PostMessageProps {
    post: Post;
}

const props = defineProps<PostMessageProps>();

const postStore = usePostStore();
const $toast = useToast();
const route = useRoute();

const replying = ref(false);
const reply = ref('');

async function toggleLike(message: Post) {
    try {
        message.liked ? await postStore.unlikePost(message.id) : await postStore.likePost(message.id);
        route.params.id ? await postStore.fetchPost(message.id) : await postStore.fetchPosts();
    } catch (error) {
        $toast.error('Erreur lors de l\'ajout du j\'aime.', {
            position: 'top',
            duration: 3000,
        });
    }
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
        $toast.error('Erreur lors de l\'ajout du post.', {
            position: 'top',
            duration: 3000,
        });
    }
}

async function deletePost(postId) {
    try {
        await postStore.delete(postId);
        await postStore.fetchPosts();

        $toast.success('Succès lors de la suppression du post.', {
            position: 'top',
            duration: 3000,
        });
    } catch (error) {
        $toast.error('Erreur lors de la suppression du post.', {
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
                    props.post.userId == $cookies.get("me").id
                        ? `${props.post.name} (moi)`
                        : props.post.name
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
                    <div class="flex items-center ml-2.5" @click="deletePost(props.post.id)">
                        <i v-if="props.post.userId === $cookies.get('me').id"
                            class="fa-regular fa-trash-can text-xl text-red-600 hover:cursor-pointer"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <slot />
    <ReplyList :id="props.post.id ?? 0" :replies="props.post.replies" :nb-replies="props.post.nbReplies" />
</template>