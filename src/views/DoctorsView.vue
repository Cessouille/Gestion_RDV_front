<script setup>
import { ref, onMounted } from 'vue';
import { useDoctorStore } from '@/stores/doctor';
import DoctorList from '@/components/DoctorList.vue';
import Loader from '@/components/loader/Loader.vue';

const doctorStore = useDoctorStore();

onMounted(async () => {
    await doctorStore.fetchDoctors();
});
</script>

<template>
    <div v-if="doctorStore.doctors">
        <DoctorList :doctors="doctorStore.doctors" />
    </div>

    <div v-else>
        <Loader message="Chargement des médecins" class="pt-16" />
    </div>
</template>