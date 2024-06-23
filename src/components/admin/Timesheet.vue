<script setup>
import { computed, onMounted } from 'vue';
import dayjs from 'dayjs';
import { useUserStore } from '@/stores/user';
import Loader from '@/components/loader/Loader.vue';

const userStore = useUserStore();

const groupedAppointments = computed(() => {
    if (!userStore.appointments || userStore.appointments.length === 0) {
        return {};
    }

    const grouped = userStore.appointments.reduce((acc, rdv) => {
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
    await userStore.fetchAppointments();
});
</script>

<template>
    <div class="flex flex-col items-center">
        <h2 class="text-tertiary font-bold text-center text-xl uppercase">Mon emploi du temps</h2>
        <div v-if="userStore.appointments">
            <div v-if="Object.keys(groupedAppointments).length === 0">
                Vous n'avez aucun rendez-vous prévu.
            </div>

            <div v-for="(appointments, date) in groupedAppointments" :key="date" class="my-4">
                <div class="bg-secondary border-[3px] border-primary p-4 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold text-tertiary mb-2">Rendez-vous du {{ date }}</h3>
                    <div v-for="rdv in appointments" :key="rdv.id" class="border-t border-primary py-2">
                        <p class="text-sm text-primary">
                            {{ dayjs(rdv.startDate).format('HH[h]mm') }} - {{ dayjs(rdv.endDate).format('HH[h]mm') }}
                        </p>
                        <p class="text-base text-primary">{{ rdv.description }}</p>
                        <p class="text-sm text-primary"><span class="font-semibold">Patient :</span> {{ rdv.name }}</p>
                        <div v-if="rdv.file" class="text-sm text-tertiary underline font-medium hover:cursor-pointer">
                            <a :href="rdv.file" target="_blank">Voir le fichier joint</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <Loader message="Chargement des rendez-vous" class="pt-16" />
        </div>
    </div>
</template>