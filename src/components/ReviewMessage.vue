<script setup lang="ts">
import { defineProps } from "vue";
import dayjs from "dayjs";
import { Review } from "@/models/types";

export interface ReviewMessageProps {
    review: Review;
}

const props = defineProps<ReviewMessageProps>();

const name = $cookies.get("me").name;
</script>

<template>
    <div class="bg-secondary border-[3px] border-primary rounded-lg p-2 mb-4">
        <div class="flex justify-between text-primary text-sm">
            <h3>
                {{
                    props.review.name += (props.review.name == name
                        ? ' (moi)'
                        : '')
                }}
            </h3>
            <h3>{{ dayjs(props.review.datePubli).format("DD/MM/YYYY") }}</h3>
        </div>
        <div class="flex text-tertiary text-sm py-2">
            <p v-for="star in props.review.rate">
                <i class="fa-solid fa-star"></i>
            </p>
        </div>
        <p class="text-justify text-tertiary text-lg">
            {{ props.review.content }}
        </p>
    </div>
</template>
