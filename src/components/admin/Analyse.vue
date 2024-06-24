<script setup>
import { ref } from 'vue';
import { useDoctorStore } from '@/stores/doctor';
import { onMounted } from 'vue';

const doctorStore = useDoctorStore();
var officeStats = ref({})
var rdvDone = ref(0);
var rdvTodo = ref(0);

onMounted(() => {
    LoadOfficeStat();
})

async function LoadOfficeStat() {
    var doctorStats = await doctorStore.fetchDoctorStats($cookies.get('me').officeId);
    officeStats.value = [
        { name: "Nombres d'abonées", stat: doctorStats.nbFollowers },
        { name: "Nombres d'abonements", stat: doctorStats.nbSub },
        { name: "Nombres de reviews", stat: doctorStats.totalReviews },
        { name: "Note moyenne", stat: doctorStats.averageReviewNote },
    ];
    rdvDone.value = doctorStats.nbRdvPasse;
    rdvTodo.value = doctorStats.nbRdvAVenir;
}

</script>

<template>
    <h2 class="text-tertiary font-bold text-center text-xl uppercase">Analyse du cabinet</h2>
    <div class="w-full flex flex-col items-center">
        <div class="w-2/5 bg-secondary border-[3px] border-primary px-4 py-2 mb-4 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold text-tertiary mb-2 border-b border-tertiary pb-2">
                Statistiques :
            </h3>
            <div class="text-sm text-primary flex items-center justify-between">
                <div>
                    <p v-for="stat in officeStats">
                        <span class="font-semibold">{{ stat.name }} :</span> {{ stat.stat }}
                    </p>
                </div>
            </div>
        </div>
        <div class="w-2/5 bg-secondary border-[3px] border-primary px-4 py-2 mb-4 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold text-tertiary mb-2 border-b border-tertiary pb-2">
                Répartition des rendez-vous :
            </h3>
            <div class="text-sm text-primary flex flex-col items-center">
                <div class="w-full flex">
                    <div class="doneBar" :style="{ width: (rdvDone / (rdvDone + rdvTodo)) * 100 + '%' }"></div>
                    <div class="todoBar"></div>
                </div>
                <div class="w-full">
                    <div class="flex justify-between">
                        <p>{{ rdvDone }}</p>
                        <p>{{ rdvTodo }}</p>
                    </div>
                </div>
                <div class="w-full">
                    <div class="flex justify-between">
                        <p>Passés</p>
                        <p>À venir</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "../../assets/scss/settings.scss";

.doneBar,
.todoBar {
    height: 10px;
}

.doneBar {
    background-color: $primary;
}

.todoBar {
    background-color: $quartiary;
    flex-grow: 1;
}
</style>