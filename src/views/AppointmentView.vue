<script setup>
import { onMounted, ref, computed, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import VueInlineCalendar from 'vue-inline-calendar'
import { useAvailabilityStore } from '@/stores/availability';
import { useAppointementStore } from '@/stores/appointement';
import { useUserStore } from '@/stores/user';
import { useDoctorStore } from '@/stores/doctor';
import "vue-inline-calendar/dist/style.css";

const $toast = useToast()

// Get doctor id from route
const route = useRoute();
const router = useRouter();
const doctorId = route.params.id;

// Importing stores
const doctorStore = useDoctorStore();
const availabilityStore = useAvailabilityStore();
const appointementStore = useAppointementStore();
const userStore = useUserStore();

// Date & Time selection
const selectedDate = ref(null);
const selectedTime = ref(null);
const formattedDate = computed(() => {
  return selectedDate.value ? new Date(selectedDate.value).toLocaleDateString('fr-CA') : '';
});

onMounted(async () => {
  await doctorStore.fetchDoctor(doctorId);
  await availabilityStore.fetchAvailabilities(doctorId);
  await userStore.getMe();
});

const rdvDescription = ref(null);
const rdv = reactive({
  availabilityId: selectedTime,
  description: null,
  price: doctorStore.doctor.prixConsultation,
  userId: userStore.me.id,
  officeId: doctorId
});

// Watch for changes in rdvDescription and update rdv.description
watch(rdvDescription, (newVal) => {
  rdv.description = newVal;
});

watch(selectedTime, (newVal) => {
  rdv.availabilityId = newVal;
});

async function validateAppointement() {
  try {
    if (!rdv.description) {
      $toast.error('Message requis', {
        position: 'bottom-right',
        duration: 3000,
      });
      return;
    }

    await appointementStore.createAppointement({
      availabilityId: rdv.availabilityId,
      description: rdv.description,
      price: rdv.price,
      userId: rdv.userId,
      officeId: rdv.officeId
    });
    
    try {
      await availabilityStore.reserveAvailability(rdv.availabilityId);
      $toast.success('Rendez-vous créé avec succès', {
      position: 'top',
      duration: 3000,
    });
    // Redirect to home page
    router.push('/');
    } catch (error) {
      $toast.error('Erreur lors de la suppression', {
        position: 'top',
        duration: 3000,
      });
    }
  } catch (error) {
    $toast.error('Erreur lors de l\'ajout du post.', {
      position: 'top',
      duration: 3000,
    });
  }
}
</script>

<template>
  <div class="border-solid border-4 border-primary rounded-xl p-5 mt-10 mb-10 bg-secondary flex flex-col w-3/4 m-auto">
    <h1 class="text-tertiary font-semibold text-3xl self-center">Rendez-Vous avec {{ doctorStore.doctor.name }}</h1>
    <!--------------------------------------- DISPOS ------------------------------------------->
    <h2 class="text-tertiary text-2xl self-center mt-10">Diponibilités :</h2>
    <vue-inline-calendar @update:selected-date="selectedDate = $event; selectedTime = null" :spec-min-date="new Date()" locale="fr-FR" :showYear="false" />
    <!------------------------------ CRENEAU HORAIRE ------------------------------------------->
    <div class="grid grid-cols-3 gap-4">
      <template v-for="creneau in availabilityStore.availabilities" :key="creneau.availabilityId">
        <div v-if="creneau.startDate == formattedDate" class="col-span-1">
          <input type="radio" name="option" :id="creneau.availabilityId" :value="creneau.availabilityId" class="peer hidden" v-model="selectedTime" />
          <label :for="creneau.availabilityId" class="bg-tertiary transition-colors duration-300 text-white font-semibold block border-solid border-5 border-tertiary cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-primary peer-checked:font-bold peer-checked:text-white">
            {{ creneau.startTime }} - {{ creneau.endTime }}
          </label>
        </div>
        <div v-else class="col-span-3 flex justify-center items-center text-2xl font-bold text-primary">
          <div class="text-center">
            Oups, il n'y a plus de créneau disponible pour cette date, veuillez sélectionnez une autre date.
          </div>
        </div>
      </template>
    </div>
    <!------------------------------ INFOS RDV ------------------------------------------------->
    <div v-if="selectedTime" class="flex flex-col">
      <h2 class="text-tertiary text-2xl self-center mt-10 mb-5">Informations à propos du RDV</h2>
      <div class="w-3/4 self-center">
        <label for="message" class="text-tertiary text-lg font-semibold">Message :</label>
        <textarea id="message" class="border-solid border-2 border-primary rounded-xl p-2 w-full h-32 resize-none" v-model="rdvDescription"></textarea>
        <h3 class="text-quartiary text-lg font-semibold text-quartiary rounded-full bg-primary w-fit p-2">Prix de la consultation : {{ doctorStore.doctor.prixConsultation }} €</h3>
      </div>
      <!------------------------------ ENVOYER ------------------------------------------------->
      <button class="bg-tertiary border-none rounded-lg px-3 py-1 text-white font-bold transition-colors duration-300 cursor-pointer hover:bg-primary w-fit self-end" @click="validateAppointement">Valider le Rendez-vous</button>
    </div>
  </div>
</template>
