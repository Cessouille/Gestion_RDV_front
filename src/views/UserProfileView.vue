<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDoctorStore } from '@/stores/doctor';
import DoctorProfile from '../components/DoctorProfile.vue';
import Reviews from '../components/ReviewList.vue';

const route = useRoute();
const userId = parseInt(route.params.id.toString(), 10);

const doctorStore = useDoctorStore();

onMounted(async () => {
    await doctorStore.fetchDoctor(userId);
    await doctorStore.fetchReviews(userId);
});
</script>

<template>
    <div class="flex px-2 py-3">
        <div class="w-1/2 px-2 pt-4">
            <DoctorProfile :param="doctorStore.doctor" />
        </div>
        <div class="w-1/2 px-2 pt-2">
            <Reviews :reviews="doctorStore.reviews" />
        </div>
    </div>
</template>