<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePostStore } from '@/stores/post';
import Loader from "@/components/loader/Loader.vue";
import PostMessage from "@/components/PostMessage.vue";

const route = useRoute();
const userId = parseInt(route.params.id.toString(), 10);

const postStore = usePostStore();

onMounted(async () => {
    await postStore.fetchPost(userId);
})
</script>

<template>
    <RouterLink to="/">
        <i class="fa-solid fa-arrow-left text-tertiary text-3xl px-4 pt-2"></i>
    </RouterLink>
    <div v-if="postStore.post" class="flex flex-col items-center justify-center mt-4">
        <div class="w-3/5">
            <PostMessage :post="postStore.post" />
        </div>
    </div>

    <div v-else>
        <Loader message="Chargement du post" class="pt-16" />
    </div>
</template>