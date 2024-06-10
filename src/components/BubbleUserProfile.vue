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
}

</script>

<template>
    <div id="bubbleMessage">
        <div id="profil">
            <img :src="user.avatar" id="profilePicture"/>
            <div>
                <h3>{{ user.name }}</h3>
                <p class="content"> Professionnel : {{ user.metier }} </p>
            </div>
        </div>
        <p>
            {{ user.description }}
        </p>
        <p>
            Domaine principale : {{ user.domainePrincipale }}
        </p>
        <p>
            Prix consultation : {{ user.prixConsultation }}€
        </p>
        <p>
            Téléphone : {{ user.phone }}
        </p>
        <p>
            Rating : {{ user.rating }}
        </p>
    </div>
</template>

<style lang="scss">
@import "../assets/scss/settings.scss";

#bubbleMessage {
    background-color: $secondary;
    border: 3px solid $primary;
    border-radius: 10px;
    padding: 7px;
    width: 500px;
}

#profil {
    display: flex;
}

h3 {
    color: $tertiary;
}

#profilePicture {
    width: 10%;
    border: solid 3px $primary;
    border-radius: 10px;
}
</style>