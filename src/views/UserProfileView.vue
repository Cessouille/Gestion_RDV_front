<script setup>
import DoctorProfile from '../components/DoctorProfile.vue';
import Reviews from '../components/ReviewList.vue';
</script>

<template>
    <div class="flex px-2 py-3">
        <div class="w-1/2 px-2 pt-4">
            <DoctorProfile />
        </div>
        <div class="w-1/2 px-2 pt-2">
            <Reviews />
        </div>
    </div>
</template>