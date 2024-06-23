<script setup>
import { ref, computed, onMounted } from 'vue';
import dayjs from 'dayjs';
import { useToast } from 'vue-toast-notification';
import { useAvailabilityStore } from '@/stores/availability';

const availabilityStore = useAvailabilityStore();
const $toast = useToast();

const adding = ref(false);
const selectedTab = ref('singleDay');
const officeId = $cookies.get('me').officeId;

const singleDayAvailability = ref({
    date: dayjs(new Date()).format('YYYY-MM-DD'),
    startTime: '',
    endTime: '',
    interval: 30,
});

const multiDayAvailability = ref({
    startDate: dayjs(new Date()).format('YYYY-MM-DD'),
    endDate: null,
    startTime: '',
    endTime: '',
    interval: 30,
});

async function newAvailability() {
    try {
        const availabilities = (selectedTab.value === 'singleDay'
            ? generateSingleDayTimeSlots(singleDayAvailability.value)
            : generateMultiDayTimeSlots(multiDayAvailability.value));

        availabilities.forEach(async availability => await availabilityStore.add(availability));
        await availabilityStore.fetchAvailabilities($cookies.get('me').officeId);

        adding.value = false;

        $toast.success('Succès lors de l\'ajout des disponibilités', {
            position: 'top',
            duration: 3000,
        });
    } catch (error) {
        $toast.error('Erreur lors de l\'ajout des disponibilités', {
            position: 'top',
            duration: 3000,
        });
    }
}

async function deleteAvailability(availabilityId) {
    try {
        await availabilityStore.deleteAvailability(availabilityId);
        await availabilityStore.fetchAvailabilities($cookies.get('me').officeId);

        $toast.success('Succès lors de la suppression de la disponibilité', {
            position: 'top',
            duration: 3000,
        });
    } catch (error) {
        $toast.error('Erreur lors de la suppression de la disponibilité', {
            position: 'top',
            duration: 3000,
        });
    }
}

function generateSingleDayTimeSlots(availability) {
    const slots = [];
    const startDateTime = dayjs(`${availability.date} ${availability.startTime}`);
    const endDateTime = dayjs(`${availability.date} ${availability.endTime}`);
    let current = startDateTime;

    while (current.isBefore(endDateTime)) {
        const endSlot = current.add(availability.interval, 'minute');
        if (endSlot.isAfter(endDateTime)) break;
        const startDate = new Date(current.format('YYYY-MM-DDTHH:mm:ss.SSSSSS[Z]'));
        const endDate = new Date(endSlot.format('YYYY-MM-DDTHH:mm:ss.SSSSSS[Z]'));
        startDate.setHours(startDate.getHours() - 2);
        endDate.setHours(endDate.getHours() - 2);
        slots.push({
            officeId: officeId,
            startDate: startDate,
            endDate: endDate,
            reserve: false,
        });
        current = endSlot;
    }

    return slots;
}

function generateMultiDayTimeSlots(availability) {
    const slots = [];
    const startDate = dayjs(availability.startDate);
    const endDate = dayjs(availability.endDate);
    let currentDay = startDate;

    while (currentDay.isBefore(endDate) || currentDay.isSame(endDate, 'day')) {
        const daySlots = generateSingleDayTimeSlots({
            date: currentDay.format('YYYY-MM-DD'),
            startTime: availability.startTime,
            endTime: availability.endTime,
            interval: availability.interval,
        });
        slots.push(...daySlots);
        currentDay = currentDay.add(1, 'day');
    }

    return slots;
}

const groupedAvailabilities = computed(() => {
    if (!availabilityStore.availabilities || availabilityStore.availabilities.length === 0) {
        return {};
    }

    const grouped = availabilityStore.availabilities.reduce((acc, rdv) => {
        const date = dayjs(rdv.startDate).format('ddd D MMMM YYYY');
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(rdv);
        return acc;
    }, {});

    return grouped;
});

onMounted(async () => {
    await availabilityStore.fetchAvailabilities($cookies.get('me').officeId);
});
</script>

<template>
    <div class="flex flex-col items-center">
        <h2 class="text-tertiary font-bold text-center text-xl uppercase">Mes disponibilités</h2>
        <div class="bg-secondary border-[3px] border-primary rounded-[15px] p-[7px] w-2/5 mx-auto my-[20px]">
            <div class="flex justify-around text-tertiary text-medium font-bold hover:cursor-pointer"
                @click="adding = true">
                Ajouter une disponibilité
            </div>
            <div class="flex flex-col gap-[5px] my-[20px]" v-if="adding">
                <div class="flex justify-between mx-[50px] gap-[15px] pb-2">
                    <button @click="selectedTab = 'singleDay'"
                        :class="{ 'bg-tertiary text-white border-2 border-tertiary': selectedTab === 'singleDay' }"
                        class="bg-quartiary border-2 border-tertiary rounded-[18px] px-[20px] py-[5px] text-tertiary font-bold transition-all ease-in-out duration-100 cursor-pointer w-full">
                        Jour simple
                    </button>
                    <button @click="selectedTab = 'multiDay'"
                        :class="{ 'bg-tertiary text-white border-2 border-tertiary': selectedTab === 'multiDay' }"
                        class="bg-quartiary border-2 border-tertiary rounded-[18px] px-[20px] py-[5px] text-tertiary font-bold transition-all ease-in-out duration-100 cursor-pointer w-full">
                        Jours multiples
                    </button>
                </div>

                <div v-if="selectedTab === 'singleDay'">
                    <div class="grid justify-between items-center mx-[50px] pb-2">
                        <p class="row-start-1 text-tertiary">Date :</p>
                        <input type="date" v-model="singleDayAvailability.date"
                            class="row-start-1 w-[200px] bg-quartiary border-2 border-primary rounded-[10px] p-[5px] text-center">
                    </div>
                    <div class="grid justify-between items-center mx-[50px] pb-2">
                        <p class="row-start-1 text-tertiary">Heure de départ :</p>
                        <input type="time" v-model="singleDayAvailability.startTime"
                            class="row-start-1 w-[200px] bg-quartiary border-2 border-primary rounded-[10px] p-[5px] text-center">
                    </div>
                    <div class="grid justify-between items-center mx-[50px] pb-2">
                        <p class="row-start-1 text-tertiary">Heure de fin :</p>
                        <input type="time" v-model="singleDayAvailability.endTime"
                            class="row-start-1 w-[200px] bg-quartiary border-2 border-primary rounded-[10px] p-[5px] text-center">
                    </div>
                    <div class="grid justify-between items-center mx-[50px] pb-2">
                        <p class="row-start-1 text-tertiary">Durée d'un créneau :</p>
                        <input type="number" min="30" max="120" step="30" v-model="singleDayAvailability.interval"
                            class="row-start-1 w-[200px] bg-quartiary border-2 border-primary rounded-[10px] p-[5px] text-center">
                    </div>
                </div>

                <div v-if="selectedTab === 'multiDay'">
                    <div class="grid justify-between items-center mx-[50px] pb-2">
                        <p class="row-start-1 text-tertiary">Date de début :</p>
                        <input type="date" v-model="multiDayAvailability.startDate"
                            class="row-start-1 w-[200px] bg-quartiary border-2 border-primary rounded-[10px] p-[5px] text-center">
                    </div>
                    <div class="grid justify-between items-center mx-[50px] pb-2">
                        <p class="row-start-1 text-tertiary">Date de fin :</p>
                        <input type="date" v-model="multiDayAvailability.endDate"
                            class="row-start-1 w-[200px] bg-quartiary border-2 border-primary rounded-[10px] p-[5px] text-center">
                    </div>
                    <div class="grid justify-between items-center mx-[50px] pb-2">
                        <p class="row-start-1 text-tertiary">Heure de départ :</p>
                        <input type="time" v-model="multiDayAvailability.startTime"
                            class="row-start-1 w-[200px] bg-quartiary border-2 border-primary rounded-[10px] p-[5px] text-center">
                    </div>
                    <div class="grid justify-between items-center mx-[50px] pb-2">
                        <p class="row-start-1 text-tertiary">Heure de fin :</p>
                        <input type="time" v-model="multiDayAvailability.endTime"
                            class="row-start-1 w-[200px] bg-quartiary border-2 border-primary rounded-[10px] p-[5px] text-center">
                    </div>
                    <div class="grid justify-between items-center mx-[50px] pb-2">
                        <p class="row-start-1 text-tertiary">Durée d'un créneau :</p>
                        <input type="number" min="30" max="120" step="30" v-model="multiDayAvailability.interval"
                            class="row-start-1 w-[200px] bg-quartiary border-2 border-primary rounded-[10px] p-[5px] text-center">
                    </div>
                </div>
                <div class="flex justify-between mx-[50px] gap-[15px]">
                    <button @click="adding = false"
                        class="bg-primary border-none rounded-lg px-[10px] py-[5px] text-white font-bold transition-all ease-in-out duration-300 cursor-pointer hover:bg-tertiary">
                        Annuler
                    </button>
                    <button @click="newAvailability"
                        class="bg-tertiary border-none rounded-lg px-[10px] py-[5px] text-white font-bold transition-all ease-in-out duration-300 cursor-pointer hover:bg-primary">
                        Ajouter
                    </button>
                </div>
            </div>
        </div>

        <div v-if="availabilityStore.availabilities" class="w-2/5">
            <div v-if="Object.keys(groupedAvailabilities).length === 0">
                Vous n'avez aucune disponibilité prévue.
            </div>

            <div v-for="(availabilities, date) in groupedAvailabilities" :key="date" class="my-4">
                <div class="bg-secondary border-[3px] border-primary p-4 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold text-tertiary mb-2">Disponibilités du {{ date }}</h3>
                    <div v-for="availability in availabilities" :key="availability.availabilityId"
                        class="border-t border-primary py-2">
                        <div class="text-sm text-primary flex items-center justify-between">
                            <p>{{ availability.startTime }} - {{ availability.endTime }}</p>
                            <div class="flex">
                                <p v-if="availability.reserve">
                                    <i class="fa-regular fa-calendar-check text-lg text-tertiary px-4"></i>
                                </p>
                                <p v-else>
                                    <i class="fa-regular fa-calendar-xmark text-lg text-tertiary px-4"></i>
                                </p>
                                <p @click="deleteAvailability(availability.availabilityId)">
                                    <i class="fa-regular fa-trash-can text-lg text-red-600 hover:cursor-pointer"></i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>