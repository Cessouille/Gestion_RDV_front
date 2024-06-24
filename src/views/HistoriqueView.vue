<script setup>
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import { useAppointementStore } from '@/stores/appointement';

const appointmentStore = useAppointementStore();

async function generatePdf(rdvId) {
  try {
    await appointmentStore.downloadDiagnosisPdf(rdvId);
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  await appointmentStore.fetchHistorique($cookies.get('me').id);
});
</script>

<template>
  <div class="mt-4">
    <h2 class="text-tertiary font-bold text-center text-xl uppercase">Historique</h2>
    <div v-if="appointmentStore.histo" class="w-full flex flex-col items-center mt-4">
      <div v-for="appointment in appointmentStore.histo" :key="appointment.id"
        class="w-2/5 bg-secondary border-[3px] border-primary px-4 py-2 mb-4 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold text-tertiary mb-2 border-b border-tertiary pb-2">
          Rendez-vous du {{ dayjs(appointment.startDate).format('ddd D MMMM YYYY') }} de
          {{ dayjs(appointment.startDate).format('HH[h]mm') }} à {{ dayjs(appointment.endDate).format('HH[h]mm') }}
        </h3>
        <p class="text-primary text-sm mb-2">{{ appointment.description }}</p>
        <div class="flex justify-between text-primary text-sm">
          <p>
            <span class="font-semibold">Médecin :</span> {{ appointment.name }}
          </p>
          <p>
            {{ appointment.price }}€
          </p>
        </div>
        <div class="flex pt-4">
          <button @click="generatePdf(appointment.id)"
            class="bg-tertiary border-none rounded-lg px-[10px] py-[5px] ml-auto text-white text-xs font-bold transition-all ease-in-out duration-300 cursor-pointer hover:bg-primary">
            Générer pdf
          </button>
        </div>
      </div>
    </div>
  </div>
</template>