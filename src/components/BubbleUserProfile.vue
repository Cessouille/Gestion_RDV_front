<script setup>
import { ref } from 'vue';

const props = defineProps({
    id: Number
});

const user = {
    id: props.id,
    name: 'Philippe LE DOCTEUR',
    metier: 'Dentiste',
    description: 'Je suis Philipe LE DOCTEUR, suivez moi pour des bon tips !',
    rating: 4.25,
    domainePrincipale: 'Dents',
    prixConsultation: 29.99,
    phone: '0667788990',
    avatar: '/src/assets/images/pp.png',
    subscribers: 12458,
    subscribed: true,
}

const socials = {
    instagram: 'https://www.instagram.com/jerem.ps/',
    linkedin: 't',
    facebook: 't',
    youtube: 't',
    twitter: 't'
}

const subscribed = ref(user.subscribed);

function format(number) {
    if (number / 1000 > 10) {
        return (number /1000).toString().slice(0, 2).concat('k');
    }
    return number;
}

</script>

<template>
    <div class="bg-secondary border-[3px] border-primary rounded-lg p-2 w-[500px]">
        <div class="flex">
            <img :src="user.avatar" class="border-2 border-primary rounded-lg mr-2 mb-2 w-[10%]" />
            <div>
                <div class="flex items-center">
                    <h3 class="text-tertiary font-bold text-lg mr-2">{{ user.name }}</h3>
                    <span v-if="subscribed">
                        <i class="fa-solid fa-user-check text-tertiary" @click="subscribed = !subscribed"></i>
                    </span>
                    <span v-else>
                        <i class="fa-solid fa-user-plus text-tertiary" @click="subscribed = !subscribed"></i>
                    </span>
                </div>
                <p class="text-primary text-sm"> Professionnel : {{ user.metier }} </p>
            </div>
            <div class="ml-auto items-center">
                <p class="text-sm text-primary text-right">{{ format(user.subscribers) }} abonnés</p>
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
            <div>
                <p>29/05/2024, 8h - 12h</p>
                <p>12/06/2024, 14h - 16h</p>
                <p class="text-xs italic">Voir toutes</p>
            </div>
        </div>
        <button class="bg-tertiary text-white font-bold py-2 px-3 rounded-lg block ml-auto text-sm my-1.5">
            Prendre rendez-vous
        </button>
    </div>
</template>