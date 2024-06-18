<script setup lang="ts">
import { ref } from 'vue';
import { Disponibilite, User } from '@/models/types';
import { useToast } from 'vue-toast-notification';

export interface BubbleUserProps {
    id: number;
}

const props = defineProps<BubbleUserProps>();

const $toast = useToast();

const dispo: Disponibilite[] = [
    {
        date: '09/05/2024',
        debut: 8,
        fin: 12
    },
    {
        date: '12/06/2025',
        debut: 14,
        fin: 16
    },
    {
        date: '28/06/2024',
        debut: 15,
        fin: 18
    },
]

const user: User = {
    id: props.id,
    name: 'Philippe LE DOCTEUR',
    metier: 'Dentiste',
    description: 'Je suis Philipe LE DOCTEUR, suivez moi pour des bon tips !',
    rating: 4.25,
    domainePrincipale: 'Dents',
    prixConsultation: 29.99,
    phone: '0667788990',
    avatar: '/src/assets/images/avatar.png',
    subscribers: 12458,
    subscribed: true,
    disponibilites: dispo
}

const socials = {
    instagram: 'https://www.instagram.com/jerem.ps/',
    linkedin: 't',
    facebook: 't',
    youtube: 't',
    twitter: 't'
}

const subscribed = ref(user.subscribed);
const seeAll = ref(true);

function formatSubscribers(number: number) {
    if (number / 1000 > 10) {
        return (number / 1000).toString().slice(0, 2).concat('k');
    }
    return number;
}

function changeSubscribe() {
    if (subscribed.value) {
        subscribed.value = false;
        $toast.default(`Vous n\'êtes plus abonné à ${user.name}`, {
            position: 'bottom-right',
            duration: 3000,
        })
    } else {
        subscribed.value = true;
        $toast.default(`Vous êtes abonné à ${user.name}`, {
            position: 'bottom-right',
            duration: 3000,
        })
    }
}

</script>

<template>
    <div class="bg-secondary border-[3px] border-primary rounded-lg p-2 w-full">
        <div class="flex">
            <img :src="user.avatar" class="border-2 border-primary rounded-lg mr-2 mb-2 w-[10%]" />
            <div>
                <div class="flex items-center">
                    <h3 class="text-tertiary font-bold text-lg mr-2">{{ user.name }}</h3>
                    <span v-if="subscribed" class="hover:cursor-pointer">
                        <i class="fa-solid fa-user-check text-tertiary" @click="changeSubscribe"></i>
                    </span>
                    <span v-else class="hover:cursor-pointer">
                        <i class="fa-solid fa-user-plus text-tertiary" @click="changeSubscribe"></i>
                    </span>
                </div>
                <p class="text-primary text-sm"> Professionnel : {{ user.metier }} </p>
            </div>
            <div class="ml-auto items-center">
                <p class="text-sm text-primary text-right">{{ formatSubscribers(user.subscribers) }} abonnés</p>
                <div class="flex gap-1 ml-1.5 text-tertiary">
                    <a :href="socials.instagram" target="ext" v-if="socials.instagram">
                        <i class="fa-brands fa-square-instagram"></i>
                    </a>
                    <a :href="socials.linkedin" target="ext" v-if="socials.linkedin">
                        <i class="fa-brands fa-linkedin"></i>
                    </a>
                    <a :href="socials.facebook" target="ext" v-if="socials.facebook">
                        <i class="fa-brands fa-square-facebook"></i>
                    </a>
                    <a :href="socials.youtube" target="ext" v-if="socials.youtube">
                        <i class="fa-brands fa-square-youtube"></i>
                    </a>
                    <a :href="socials.twitter" target="ext" v-if="socials.twitter">
                        <i class="fa-brands fa-square-twitter"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="text-primary text-sm mb-1.5">
            <p class="mb-1.5">
                {{ user.description }}
            </p>
            <p>
                <span class="font-semibold">Domaine principale :</span> {{ user.domainePrincipale }}
            </p>
            <p>
                <span class="font-semibold">Prix consultation :</span> {{ user.prixConsultation }}€
            </p>
            <p>
                <span class="font-semibold">Téléphone :</span> {{ user.phone }}
            </p>
            <p>
                <span class="font-semibold">Rating :</span> {{ user.rating }}
            </p>
        </div>
        <div class="flex text-primary text-sm">
            <p class="mr-2">
                <span class="font-semibold">Disponibilité :</span>
            </p>
            <div v-if="seeAll">
                <p v-for="dispo in user.disponibilites.slice(0, 2)">
                    {{ dispo.date }}, {{ dispo.debut }}h - {{ dispo.fin }}h
                </p>
                <p class="text-xs italic hover:cursor-pointer" @click="seeAll = !seeAll">Voir toutes</p>
            </div>
            <div v-else>
                <p v-for="dispo in user.disponibilites">
                    {{ dispo.date }}, {{ dispo.debut }}h - {{ dispo.fin }}h
                </p>
                <p class="text-xs italic hover:cursor-pointer" @click="seeAll = !seeAll">Voir moins</p>
            </div>
        </div>
        <div class="flex">
            <RouterLink :to="'/user/' + user.id + '/appointment'"
                class="bg-tertiary text-white text-center font-bold py-2 px-3 rounded-lg ml-auto text-sm my-1.5 transition-colors duration-300 hover:cursor-pointer hover:bg-primary"
            >
                Prendre rendez-vous
            </RouterLink>
        </div>
    </div>
</template>