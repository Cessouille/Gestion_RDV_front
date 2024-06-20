<script setup lang="ts">
import { defineProps } from 'vue'
import dayjs from "dayjs";
import { Reply } from '@/models/types';

export interface ReplyListProps {
    replies: Reply[];
}

const props = defineProps<ReplyListProps>();

</script>

<template>
    <!-- seulement deux réponses affichées -->
    <div class="text-primary border-l-[3px] border-primary p-2" v-for="reply in props.replies.slice(0, 2)"
        :key="reply.id">
        <b>{{ reply.name }}</b> - <i>{{ reply.content }}</i>
        <p class="text-xs">{{ dayjs(reply.datePubli).format("DD/MM/YYYY") }}</p>
    </div>
</template>