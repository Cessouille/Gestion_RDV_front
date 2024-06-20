<script setup lang="ts">
import ReviewMessage from '@/components/ReviewMessage.vue';
import { Review } from '@/models/types';
import Loader from '@/components/loader/Loader.vue';

export interface ReviewListProps {
    reviews: Review[] | null;
}

const props = defineProps<ReviewListProps>();

</script>

<template>
    <div class="w-full">
        <h2 class="text-tertiary font-bold text-center text-xl pb-4">Reviews</h2>
        <div v-if="props.reviews">
            <div class="flex items-center" v-for="review in props.reviews">
                <div class="text-tertiary text-xl">
                    <div class="px-2" v-if="review.thumbed == null || review.thumbed">
                        <i class="fa-solid fa-thumbs-up hover:cursor-pointer"
                            @click="review.thumbed = (review.thumbed == null ? true : null)"></i>
                    </div>
                    <div class="p-2" v-if="review.thumbed == null || !review.thumbed">
                        <i class="fa-solid fa-thumbs-down hover:cursor-pointer"
                            @click="review.thumbed = (review.thumbed == null ? false : null)"></i>
                    </div>
                </div>
                <div class="w-full">
                    <ReviewMessage :review="review" />
                </div>
            </div>
        </div>

        <div v-else>
            <Loader message="Chargement des reviews" class="pt-16" />
        </div>

    </div>
</template>