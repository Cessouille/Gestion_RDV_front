<script setup lang="ts">
import { ref, defineProps } from 'vue'
import dayjs from "dayjs";
import { Reply } from '@/models/types';

export interface ReplyListProps {
    id: number;
    replies: Reply[];
    nbReplies: number;
}

const props = defineProps<ReplyListProps>();

const nbMoreReplies = ref(props.replies ? props.nbReplies - props.replies.length : 0);
const moreReplies = ref(props.replies ? props.nbReplies > props.replies.length : false)
</script>

<template>
    <div class="text-primary border-l-[3px] border-primary">
        <div class="pt-2 px-2" v-for="reply in props.replies" :key="reply.id">
            <b>{{ reply.name }}</b> - <i>{{ reply.content }}</i>
            <p class="text-xs italic">{{ dayjs(reply.datePubli).format("DD/MM/YYYY") }}</p>
        </div>
        <RouterLink :to="`/post/${props.id}`">
            <i class="px-2 text-sm" v-if="moreReplies">
                {{ nbMoreReplies > 1
                    ? `${nbMoreReplies} autres réponses ...`
                    : `${nbMoreReplies} autre réponse ...` }} <!-- Afficher ... autre(s) réponse(s) ? -->
            </i>
        </RouterLink>
    </div>
</template>