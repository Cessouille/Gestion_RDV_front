<script setup>
import { ref } from 'vue';
import VueInlineCalendar from 'vue-inline-calendar';
import "vue-inline-calendar/dist/style.css";

const selectedDate = ref(null);
const selectedTime = ref(null);

</script>

<template>
  <div class="border-solid border-4 border-primary rounded-xl p-5 mt-10 mb-10 bg-secondary flex flex-col w-3/4 m-auto">
    <h1 class="text-tertiary font-semibold text-3xl self-center">Rendez-Vous avec Philipe LE DOCTEUR</h1>
    <!--------------------------------------- DISPOS ------------------------------------------->
    <h2 class="text-tertiary text-2xl self-center mt-10">Diponibilités :</h2>
    <vue-inline-calendar @update:selected-date="selectedDate = $event" :spec-min-date="new Date()" locale="fr-FR" :showYear="false" />
    <!------------------------------ CRENEAU HORAIRE ------------------------------------------->
    <div v-if="selectedDate" class="flex flex-col">
      <h2 class="text-tertiary text-2xl self-center mt-10 mb-5">Sélectionnez un créneau horaire</h2>
    <div class="grid grid-cols-3 gap-4">
        <div>
            <input type="radio" name="option" id="1" value="1" class="peer hidden" checked v-model="selectedTime" />
            <label for="1" class="bg-tertiary transition-colors duration-300 text-white font-semibold block border-solid border-5 border-tertiary cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-primary peer-checked:font-bold peer-checked:text-white">15h - 16h</label>
        </div>

        <div>
            <input type="radio" name="option" id="2" value="2" class="peer hidden" v-model="selectedTime" />
            <label for="2" class="bg-tertiary transition-colors duration-300 text-white font-semibold block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-primary peer-checked:font-bold peer-checked:text-white">16h - 17h</label>
        </div>

        <div>
            <input type="radio" name="option" id="3" value="3" class="peer hidden" v-model="selectedTime" />
            <label for="3" class="bg-tertiary transition-colors duration-300 text-white font-semibold block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-primary peer-checked:font-bold peer-checked:text-white">18h - 19h</label>
        </div>
    </div>
    </div>
    
    
    <!------------------------------ INFOS RDV ------------------------------------------------->
    <div v-if="selectedTime" class="flex flex-col">
        <h2 class="text-tertiary text-2xl self-center mt-10 mb-5">Informations à propos du RDV</h2>
        <div class="w-3/4 self-center">
        <label for="name" class="text-tertiary text-lg font-semibold">Sujet du RDV :</label>
        <input type="text" id="name" class="border-solid border-2 border-primary rounded-xl p-2 w-full" />
        <label for="message" class="text-tertiary text-lg font-semibold">Message :</label>
        <textarea id="message" class="border-solid border-2 border-primary rounded-xl p-2 w-full h-32 resize-none"></textarea>
        <h3 class="text-quartiary text-lg font-semibold text-quartiary rounded-full bg-primary w-fit p-2">Prix de la consultation : 46.72 €</h3>
        </div>
        <!------------------------------ ENVOYER ------------------------------------------------->
        <button class="bg-tertiary border-none rounded-lg px-3 py-1 text-white font-bold transition-colors duration-300 cursor-pointer hover:bg-primary w-fit self-end">Valider le Rendez-vous</button>
    </div>
    
  </div>
 
</template>