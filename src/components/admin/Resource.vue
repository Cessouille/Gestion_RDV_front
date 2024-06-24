<script setup>
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import { useToast } from 'vue-toast-notification';
import { useResourceStore } from '@/stores/resource';

const $toast = useToast();
const resourceStore = useResourceStore();

const adding = ref(false);

const resource = ref({
    name: '',
    lastUpdate: dayjs(new Date()).format('YYYY-MM-DD'),
    nextUpdate: null,
    state: true,
});

async function newResource() {
    try {
        const validationErrors = validateResource(resource.value);
        if (validationErrors.length > 0) {
            validationErrors.forEach((error) => $toast.error(error, {
                position: 'bottom-right',
                duration: 3000,
            }))
            return;
        }

        const newResource = {
            officeId: $cookies.get('me').officeId,
            name: resource.value.name,
            lastUpdate: resource.value.lastUpdate,
            nextUpdate: resource.value.nextUpdate,
            state: resource.value.state,
        };

        await resourceStore.add(newResource);
        await resourceStore.fetchResources($cookies.get('me').officeId);

        $toast.success('Succès lors de l\'ajout de la ressource', {
            position: 'top',
            duration: 3000,
        });
    } catch (error) {
        $toast.error('Erreur lors de l\'ajout de la ressource', {
            position: 'top',
            duration: 3000,
        });
    }
}

async function deleteResource(resourceId) {
    try {
        await resourceStore.delete(resourceId);
        await resourceStore.fetchResources($cookies.get('me').officeId);

        $toast.success('Succès lors de la suppression de la ressource', {
            position: 'top',
            duration: 3000,
        });
    } catch (error) {
        $toast.error('Erreur lors de la suppression de la ressource', {
            position: 'top',
            duration: 3000,
        });
    }
}

async function updateState(resource, state) {
    try {
        const updatedResource = {
            equipmentId: resource.id,
            officeId: resource.officeId,
            lastUpdate: resource.lastUpdate,
            futureUpdate: resource.nextUpdate,
            etat: state,
        };

        await resourceStore.update(updatedResource);
        await resourceStore.fetchResources($cookies.get('me').officeId);

        $toast.success('Succès lors de la modification de l\'état', {
            position: 'top',
            duration: 3000,
        });
    } catch (error) {
        $toast.error('Erreur lors de la modification de l\'état', {
            position: 'top',
            duration: 3000,
        });
    }
}

async function updateResource(resource) {
    try {
        const futureUpdate = new Date();
        futureUpdate.setFullYear(new Date().getFullYear() + 1);

        const updatedResource = {
            equipmentId: resource.id,
            officeId: resource.officeId,
            lastUpdate: new Date(),
            futureUpdate: futureUpdate,
            etat: resource.state,
        };

        await resourceStore.update(updatedResource);
        await resourceStore.fetchResources($cookies.get('me').officeId);

        $toast.success('Succès lors de la mise à jour de la ressource', {
            position: 'top',
            duration: 3000,
        });
    } catch (error) {
        $toast.error('Erreur lors de la mise à jour de la ressource', {
            position: 'top',
            duration: 3000,
        });
    }
}

function validateResource(resource) {
    const errors = [];

    if (!resource.name) {
        errors.push('Indiquer un nom');
    }
    if (!resource.lastUpdate) {
        errors.push('Indiquer une date de dernière de mise à jour');
    }
    if (!resource.nextUpdate) {
        errors.push('Indiquer une date de prochaine de mise à jour');
    }
    if (new Date(resource.lastUpdate) > new Date(resource.nextUpdate)) {
        errors.push('Dates non valides');
    }

    return errors;
}

onMounted(async () => {
    await resourceStore.fetchResources($cookies.get('me').officeId);
});
</script>

<template>
    <div class="flex flex-col items-center">
        <h2 class="text-tertiary font-bold text-center text-xl uppercase">Gestion des ressources</h2>
        <div class="bg-secondary border-[3px] border-primary rounded-[15px] p-[7px] w-2/5 mx-auto my-[20px]">
            <div class="flex justify-around text-tertiary text-medium font-bold hover:cursor-pointer"
                @click="adding = !adding">
                Ajouter une ressource
            </div>
            <div v-if="adding" class="pt-4">
                <div class="lg:grid justify-between items-center mx-[50px] pb-2">
                    <p class="row-start-1 text-tertiary">Nom :</p>
                    <input type="text" v-model="resource.name"
                        class="row-start-1 w-[200px] bg-quartiary border-2 border-primary rounded-[10px] p-[5px] text-center">
                </div>
                <div class="lg:grid justify-between items-center mx-[50px] pb-2">
                    <p class="row-start-1 text-tertiary">Dernière mise à jour :</p>
                    <input type="date" v-model="resource.lastUpdate"
                        class="row-start-1 w-[200px] bg-quartiary border-2 border-primary rounded-[10px] p-[5px] text-center">
                </div>
                <div class="lg:grid justify-between items-center mx-[50px] pb-2">
                    <p class="row-start-1 text-tertiary">Prochaine mise à jour recommandée :</p>
                    <input type="date" v-model="resource.nextUpdate"
                        class="row-start-1 w-[200px] bg-quartiary border-2 border-primary rounded-[10px] p-[5px] text-center">
                </div>
                <div class="lg:grid justify-between items-center mx-[50px] pb-2">
                    <p class="row-start-1 text-tertiary">Fonctionnel :</p>
                    <input type="checkbox" v-model="resource.state"
                        class="row-start-1 w-[200px] bg-quartiary border-2 border-primary rounded-[10px] p-[5px] text-center">
                </div>
                <div class="flex justify-between mx-[50px] gap-[15px]">
                    <button @click="adding = false"
                        class="bg-primary border-none rounded-lg px-[10px] py-[5px] text-white font-bold transition-all ease-in-out duration-300 cursor-pointer hover:bg-tertiary">
                        Annuler
                    </button>
                    <button @click="newResource"
                        class="bg-tertiary border-none rounded-lg px-[10px] py-[5px] text-white font-bold transition-all ease-in-out duration-300 cursor-pointer hover:bg-primary">
                        Ajouter
                    </button>
                </div>
            </div>
        </div>
        <div v-if="resourceStore.resources" class="w-2/5">
            <div v-if="resourceStore.resources.length === 0">
                Vous n'avez aucune ressource.
            </div>

            <div v-for="resource in resourceStore.resources" :key="resource.id"
                class="bg-secondary border-[3px] border-primary px-4 py-2 mb-4 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-tertiary mb-2 border-b border-tertiary pb-2">
                    {{ resource.name }}
                </h3>
                <div class="text-sm text-primary flex items-center justify-between">
                    <div>
                        <p>
                            <span class="font-semibold">Dernière mise à jour :</span>
                            {{ dayjs(resource.lastUpdate).format('DD/MM/YYYY') }}
                        </p>
                        <p>
                            <span class="font-semibold">Prochaine mise à jour recommandée :</span>
                            {{ dayjs(resource.nextUpdate).format('DD/MM/YYYY') }}
                        </p>
                    </div>
                    <p @click="deleteResource(resource.id)">
                        <i class="fa-regular fa-trash-can text-lg text-red-600 hover:cursor-pointer"></i>
                    </p>
                </div>
                <div class="pt-2 text-sm flex items-center">
                    <p v-if="resource.state" class="text-green-600 font-semibold hover:cursor-pointer"
                        @click="updateState(resource, false)">
                        Fonctionnel <i class="fa-solid fa-circle-check"></i>
                    </p>
                    <p v-else class="text-red-600 font-semibold hover:cursor-pointer"
                        @click="updateState(resource, true)">
                        Non fonctionnel <i class="fa-solid fa-circle-xmark"></i>
                    </p>
                    <button @click="updateResource(resource)"
                        class="ml-auto bg-tertiary text-white text-center font-bold py-2 px-3 rounded-lg ml-auto text-xs my-1.5 transition-colors duration-300 hover:cursor-pointer hover:bg-primary">
                        Effectuer une mise à jour
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>