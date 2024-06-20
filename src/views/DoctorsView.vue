<script setup>
import { ref, onMounted } from 'vue';
import { useDoctorStore } from '@/stores/doctor';
import DoctorList from '@/components/DoctorList.vue';

const doctorStore = useDoctorStore();

onMounted(() => {
    doctorStore.fetchDoctors();
});
</script>

<template>
    <DoctorList :doctors="doctorStore.doctors" />
</template>