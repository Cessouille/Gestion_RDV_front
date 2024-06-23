<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDoctorStore } from '@/stores/doctor';
import DoctorProfile from '@/components/DoctorProfile.vue';
import Reviews from '@/components/ReviewList.vue';
import Loader from '@/components/loader/Loader.vue';

const route = useRoute();
const userId = parseInt(route.params.id.toString(), 10);

const doctorStore = useDoctorStore();

onMounted(async () => {
    await doctorStore.fetchDoctor(userId);
    await doctorStore.fetchReviews(userId);
});
</script>

<template>
    <div class="px-2 py-3 lg:flex" v-if="doctorStore.doctor">
        <div class="px-2 pt-4 lg:w-1/2">
            <DoctorProfile :doctor="doctorStore.doctor" />
        </div>
        <div class="px-2 pt-4 lg:w-1/2">
            <Reviews :reviews="doctorStore.reviews" :doctorId="doctorStore.doctor.id" />
        </div>
    </div>

    <div v-else>
        <Loader message="Chargement du profil du médecin" class="pt-16" />
    </div>
</template>