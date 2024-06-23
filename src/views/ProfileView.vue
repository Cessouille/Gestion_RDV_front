<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useAppointementStore } from '@/stores/appointement';
import { Profile } from '@/models/types';
import { useUserStore } from '@/stores/user';

const appointementStore = useAppointementStore();
const userStore = useUserStore();

const connectedUser = computed<Profile>(
  () => userStore.me
);


// Date & Time selection
const selectedDate = ref(null);
const formattedDate = computed(() => {
  return selectedDate.value ? new Date(selectedDate.value).toLocaleDateString('fr-CA') : '';
});

onMounted(async () => {
  await userStore.getMe();
  await appointementStore.fetchAppointements(userStore.me.id);
  
});
</script>

<template>
  <div class="flex">
    <div class="bg-secondary border-[3px] border-primary rounded-lg p-2 w-1/8 h-fit mt-10 m-auto">
        <div class="flex">
            <img :src="connectedUser.profilePicture" class="border-2 border-primary rounded-lg mr-2 mb-2 w-16" />
            <div>
                <div class="flex items-center">
                    <h3 class="text-tertiary font-bold text-lg mr-2">{{ connectedUser.fullname }}</h3>
                </div>
            </div>
            <div class="ml-auto items-center">
      
            </div>
        </div>
    </div>
    <!-- Appointements-->
    <div class="border-solid border-4 border-primary rounded-xl p-5 mt-10 mb-10 bg-secondary flex flex-col w-2/4 m-auto">
        <h1 class="text-2xl font-bold text-tertiary">MES PROCHAINS RENDEZ-VOUS</h1>
        <hr class="my-4 border-primary border-2">
        <template v-for="appointement in appointementStore.appointements">
          <div class="border-solid border-4 border-primary mb-5 rounded-2xl">
            <div class="bg-primary text-xl font-semibold text-white flex justify-between p-2">
              <h1>{{ appointement.startTime }} - {{ appointement.endTime }}</h1>
              <h1>{{ appointement.startDate }}</h1>
            </div>
            <div class="p-2">
              <h1 class="text-lg font-semibold text-tertiary">Docteur {{ appointement.office.user.lastName }} {{ appointement.office.user.firstName }}</h1>
              <p class="text-tertiary"><span class="underline">Raison du RDV :</span> {{ appointement.description }}</p>
              <p class="text-tertiary"><span class="underline">Prix :</span> {{ appointement.prix }} €</p>
            </div>
          </div>
            
        </template>
    </div>
  </div>
  
</template>