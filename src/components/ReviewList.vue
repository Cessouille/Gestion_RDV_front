<script setup lang="ts">
import ReviewMessage from '@/components/ReviewMessage.vue';
import { Review } from '@/models/types';
import Loader from '@/components/loader/Loader.vue';
import { useDoctorStore } from '@/stores/doctor';
import { useToast } from 'vue-toast-notification';

export interface ReviewListProps {
    reviews: Review[] | null;
    doctorId: number;
}

const props = defineProps<ReviewListProps>();

const $toast = useToast();
const doctorStore = useDoctorStore();

async function toggleThumb(review: Review, thumbUp: boolean) {
    try {
        review.thumbed != null ? await doctorStore.removeThumb(review.id) :
            (review.thumbed == null && thumbUp ? await doctorStore.thumbUp(review.id) : await doctorStore.thumbDown(review.id));
        await doctorStore.fetchReviews(props.doctorId);
    } catch (error) {
        $toast.error('Erreur lors de la modification du pouce', {
            position: 'top',
            duration: 3000,
        });
    }
}
</script>

<template>
    <div class="w-full">
        <h2 class="text-tertiary font-bold text-center text-xl pb-4">Reviews</h2>
        <div v-if="props.reviews">
            <div class="flex items-center" v-for="review in props.reviews">
                <div class="text-tertiary text-xl">
                    <div class="px-2" v-if="review.thumbed == null || review.thumbed">
                        <i class="fa-solid fa-thumbs-up hover:cursor-pointer" @click="toggleThumb(review, true)"></i>
                    </div>
                    <div class="p-2" v-if="review.thumbed == null || !review.thumbed">
                        <i class="fa-solid fa-thumbs-down hover:cursor-pointer" @click="toggleThumb(review, false)"></i>
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