<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { Reply } from '@/models/types';

export interface ReplyListProps {
    replies: Reply[];
}

const props = defineProps<ReplyListProps>();

</script>

<template>
    <div class="text-primary border-l-[3px] border-primary p-2" v-for="reply in props.replies">
       <b>{{ reply.name }}</b> -  <i>{{ reply.description }}</i>
    </div>
</template>