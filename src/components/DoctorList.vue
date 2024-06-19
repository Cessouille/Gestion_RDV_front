<script setup lang="ts">
import { ref, computed } from 'vue';
import { Doctors } from '@/models/types';

export interface DoctorProps {
    doctors: Array<Doctors>;
    domaine?: string;
}

const props = defineProps<DoctorProps>();

const domaine = ref(props.domaine);

const doctors = computed(() => {
    console.log(props.doctors)
    return props.doctors.filter(
        (doctor) => doctor.name.includes(domaine.value ?? '')
    );
});
</script>

<template>
    <div class="w-full mt-4">
        <h2 class="text-tertiary font-bold text-center text-xl uppercase">Nos docteurs</h2>
        <div v-if="!domaine || domaine.trim().length === 0" v-for="groupDoctor in doctors">
            <div class="flex justify-between items-center p-2">
                <h3 class="text-tertiary font-semibold text text-lg">{{ groupDoctor.name }}</h3>
                <div class="text-primary hover:cursor-pointer" @click="domaine = groupDoctor.name">
                    <i>Voir plus</i>
                </div>
            </div>
            <div class="flex overflow-x-auto">
                <RouterLink :to="`/user/${doctor.id}`"
                    class="bg-secondary border-[3px] border-primary rounded-lg flex-shrink-0 p-2 m-2 w-4/12"
                    v-for="doctor in groupDoctor.doctors" :key="doctor.id">
                    <div class="flex">
                        <img :src="doctor.avatar" class="border-2 border-primary rounded-lg mr-2 mb-2 w-14 h-14" />
                        <div>
                            <div class="flex items-center">
                                <h3 class="text-tertiary font-bold text-lg mr-2">{{ doctor.name }}</h3>
                            </div>
                            <p class="text-primary text-sm">
                                <span class="font-semibold">Professionnel :</span>
                                {{ doctor.metier }}
                            </p>
                        </div>
                    </div>
                    <div class="text-primary text-sm mb-1.5">
                        <p class="mb-1.5">{{ doctor.description }}</p>
                        <p>
                            <span class="font-semibold">Rating :</span> {{ doctor.rating }}
                        </p>
                    </div>
                </RouterLink>
            </div>
        </div>

        <div v-else v-for="groupDoctor in doctors">
            <div class="flex justify-between items-center p-2">
                <h3 class="text-tertiary font-semibold text text-lg">{{ groupDoctor.name }}</h3>
                <div class="text-primary hover:cursor-pointer" @click="domaine = ''">
                    <i>Voir moins</i>
                </div>
            </div>
            <div class="flex flex-wrap flex-row">
                <RouterLink :to="`/user/${doctor.id}`"
                    class="bg-secondary border-[3px] border-primary rounded-lg p-2 m-2 w-3/12 flex-auto"
                    v-for="doctor in groupDoctor.doctors" :key="doctor.id">
                    <div class="flex">
                        <img :src="doctor.avatar" class="border-2 border-primary rounded-lg mr-2 mb-2 w-14 h-14" />
                        <div>
                            <div class="flex items-center">
                                <h3 class="text-tertiary font-bold text-lg mr-2">{{ doctor.name }}</h3>
                            </div>
                            <p class="text-primary text-sm">
                                <span class="font-semibold">Professionnel :</span>
                                {{ doctor.metier }}
                            </p>
                        </div>
                    </div>
                    <div class="text-primary text-sm mb-1.5">
                        <p class="mb-1.5">{{ doctor.description }}</p>
                        <p>
                            <span class="font-semibold">Rating :</span> {{ doctor.rating }}
                        </p>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
::-webkit-scrollbar {
    height: 10px;
}

::-webkit-scrollbar-thumb {
    background: #7AB2B2;
    border-radius: 5px;
}
</style>