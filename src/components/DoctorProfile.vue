<script setup lang="ts">
import { defineProps } from 'vue';
import { Doctor } from '@/models/types';
import { useToast } from 'vue-toast-notification';
import { useDoctorStore } from '@/stores/doctor';

export interface DoctorProfileProps {
    doctor: Doctor | null;
}

const props = defineProps<DoctorProfileProps>();

const $toast = useToast();

const doctorStore = useDoctorStore();

function formatSubscribers(number: number) {
    if (number / 1000 > 10) {
        return (number / 1000).toString().slice(0, 2).concat('k abonnés');
    }
    if (number == 0 || number == 1) {
        return number.toString().concat(' abonné');
    }
    return number.toString().concat(' abonnés');
}

async function changeSubscribe(doctor: Doctor) {
    try {
        doctor.subscribed ? await doctorStore.unsubscribe(doctor.id) : await doctorStore.subscribe(doctor.id);
        await doctorStore.fetchDoctor(doctor.id);
    } catch (error) {
        $toast.error('Erreur lors de la modification de l\'abonnement', {
            position: 'top',
            duration: 3000,
        });
    }
}
</script>

<template>
    <div class="bg-secondary border-[3px] border-primary rounded-lg p-2 w-full" v-if="props.doctor">
        <div class="flex">
            <img :src="props.doctor.avatar" class="border-2 border-primary rounded-lg mr-2 mb-2 w-16" />
            <div>
                <div class="flex items-center">
                    <h3 class="text-tertiary font-bold text-lg mr-2">{{ props.doctor.name }}</h3>
                    <span v-if="props.doctor.subscribed" class="hover:cursor-pointer">
                        <i class="fa-solid fa-user-check text-tertiary" @click="changeSubscribe(props.doctor)"></i>
                    </span>
                    <span v-else class="hover:cursor-pointer">
                        <i class="fa-solid fa-user-plus text-tertiary" @click="changeSubscribe(props.doctor)"></i>
                    </span>
                </div>
                <p class="text-primary text-sm"> <span class="font-semibold">Professionnel :</span>
                    {{ props.doctor.metier }}
                </p>
            </div>
            <div class="ml-auto items-center">
                <p class="text-sm text-primary text-right">{{ formatSubscribers(props.doctor.nbSub) }}</p>
                <div class="flex gap-1 ml-1.5 text-tertiary" v-for="social in props.doctor.socials">
                    <a :href="social.link" target="ext" v-if="social.name == 'Instagram'">
                        <i class="fa-brands fa-square-instagram"></i>
                    </a>
                    <a :href="social.link" target="ext" v-if="social.name == 'Linkedin'">
                        <i class="fa-brands fa-linkedin"></i>
                    </a>
                    <a :href="social.link" target="ext" v-if="social.name == 'Facebook'">
                        <i class="fa-brands fa-square-facebook"></i>
                    </a>
                    <a :href="social.link" target="ext" v-if="social.name == 'Youtube'">
                        <i class="fa-brands fa-square-youtube"></i>
                    </a>
                    <a :href="social.link" target="ext" v-if="social.name == 'Twitter'">
                        <i class="fa-brands fa-square-twitter"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="text-primary text-sm mb-1.5">
            <p class="mb-1.5">
                {{ props.doctor.description }}
            </p>
            <p>
                <span class="font-semibold">Domaine principale :</span> {{ props.doctor.domainePrincipal }}
            </p>
            <p>
                <span class="font-semibold">Prix consultation :</span> {{ props.doctor.prixConsultation }}€
            </p>
            <p>
                <span class="font-semibold">Téléphone :</span> {{ props.doctor.telephone }}
            </p>
            <p>
                <span class="font-semibold">Note :</span> {{ props.doctor.rating }}
            </p>
        </div>
        <div class="flex">
            <RouterLink :to="`/doctor/${props.doctor.id}/appointment`"
                class="bg-tertiary text-white text-center font-bold py-2 px-3 rounded-lg ml-auto text-sm my-1.5 transition-colors duration-300 hover:cursor-pointer hover:bg-primary">
                Prendre rendez-vous
            </RouterLink>
        </div>
    </div>
</template>