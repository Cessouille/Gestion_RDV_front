<script setup>
import BubbleUser from '../components/BubbleUserProfile.vue';
import Reviews from '../components/ReviewList.vue';
</script>

<template>
    <div class="flex px-2 py-3">
        <div class="w-1/2 px-2 pt-4">
            <BubbleUser :id="1" />
        </div>
        <div class="w-1/2 px-2 pt-2">
            <Reviews />
        </div>
    </div>
</template>