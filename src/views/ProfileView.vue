<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useAppointementStore } from '@/stores/appointement';
import { useAvailabilityStore } from '@/stores/availability';
import { Profile } from '@/models/types';
import { useUserStore } from '@/stores/user';
import { useToast } from 'vue-toast-notification';

const $toast = useToast()

const appointementStore = useAppointementStore();
const availabilityStore = useAvailabilityStore();
const userStore = useUserStore();

const connectedUser = computed<Profile>(
  () => userStore.me
);

const loading = ref(true);

onMounted(async () => {
  await userStore.getMe();
  await appointementStore.fetchAppointements(userStore.me.id);
  await userStore.getUserById(userStore.me.id);
  loading.value = false;
});

async function cancelAppointement(appointementId, availabilityId) {
  if (window.confirm("Êtes vous sûr de vouloir annuler ce rendez-vous ?")) {
    try {
      await appointementStore.deleteAppointement(appointementId);
      try {
        await availabilityStore.unreserveAvailability(availabilityId);
        $toast.success('Rendez-vous annulé avec succès', {
          position: 'top',
          duration: 3000
        });
        location.reload(); // Reload the page after success
      } catch (error) {
        $toast.error('Erreur lors de la libération du créneau.', {
          position: 'top',
          duration: 3000,
        });
      }
    } catch (error) {
      $toast.error('Erreur lors de la suppression du rendez-vous.', {
        position: 'top',
        duration: 3000,
      });
    }
  }
}
</script>

<template>
  <div class="flex">
    <div v-if="loading" class="m-auto mt-10 text-tertiary text-lg">Chargement...</div>
    <div v-else class="bg-secondary border-[3px] border-primary rounded-lg p-2 w-1/8 h-fit mt-10 m-auto">
      <div class="flex">
        <img :src="connectedUser.profilePicture" class="border-2 border-primary rounded-lg mr-2 mb-2 w-16" />
        <div>
          <div class="flex items-center">
            <h3 class="text-tertiary font-bold text-lg mr-2">{{ connectedUser.fullname }}</h3>
          </div>
          <div class="flex flex-col">
            <h3 class="text-tertiary font-semibold text-sm mr-2">Adresse Mail : <span class="font-normal">{{ userStore.userSelected.email }}</span></h3>
            <h3 class="text-tertiary font-semibold text-sm mr-2">Date de naissance : <span class="font-normal">{{ userStore.userSelected.birthDate }}</span></h3>
          </div>
        </div>
        <div class="ml-auto items-center"></div>
      </div>
    </div>
    <!-- Appointements-->
    <div v-if="!loading" class="border-solid border-4 border-primary rounded-xl p-5 mt-10 mb-10 bg-secondary flex flex-col w-2/4 m-auto">
      <h1 class="text-2xl font-bold text-tertiary">MES PROCHAINS RENDEZ-VOUS</h1>
      <hr class="my-4 border-primary border-2">
      <template v-if="appointementStore.appointements.length === 0">
        <h1 class="text-tertiary text-lg">Vous n'avez pas de rendez-vous à venir</h1>
      </template>
      <template v-else>
        <template v-for="appointement in appointementStore.appointements" :key="appointement.rendezVousId">
          <div class="border-solid border-4 border-primary mb-5 rounded-2xl">
            <div class="bg-primary text-xl font-semibold text-white flex justify-between p-2">
              <h1>{{ appointement.startTime }} - {{ appointement.endTime }}</h1>
              <h1>{{ appointement.startDate }}</h1>
            </div>
            <div class="flex justify-between">
              <div class="p-2">
                <h1 class="text-lg font-semibold text-tertiary">Docteur {{ appointement.office.user.lastName }} {{ appointement.office.user.firstName }}</h1>
                <p class="text-tertiary"><span class="underline">Raison du RDV :</span> {{ appointement.description }}</p>
                <p class="text-tertiary"><span class="underline">Prix :</span> {{ appointement.prix }} €</p>
              </div>
              <button class="bg-tertiary border-none rounded-lg px-3 py-1 m-3 text-white font-bold transition-colors duration-300 cursor-pointer hover:bg-primary w-fit self-end" @click="cancelAppointement(appointement.rendezVousId, appointement.availabilityId)">Annuler le Rendez-vous</button>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>
