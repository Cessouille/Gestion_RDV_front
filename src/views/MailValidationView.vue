<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter();
const $toast = useToast();

const token = ref('');
const isTokenValid = ref(true);

const validateToken = async (userId) => {
    if (token.value.length !== 6) {
        isTokenValid.value = false;

        $toast.error('Le token doit contenir 6 caractères', {
            position: 'bottom-right',
            duration: 3000,
        });

        return;
    }
    isTokenValid.value = true;

    try {
        await userStore.validateEmail(userId, token.value);

        $toast.success('Mail validé avec succès', {
            position: 'top',
            duration: 3000,
        });

        router.push({ path: '/' });
    } catch (error) {
        $toast.error('Code de validation invalide ou périmé', {
            position: 'top',
            duration: 3000,
        });
    }
};

async function sendEmail(userId) {
    try {
        await userStore.sendValidationEmail(userId);

        $toast.success('Succès lors de l\'envoi du mail', {
            position: 'top',
            duration: 3000,
        });
    } catch (error) {
        $toast.error('Erreur lors de l\'envoi du mail', {
            position: 'top',
            duration: 3000,
        });
    }
}

onMounted(async () => {
    const userId = $cookies.get('me')?.id;
    if (userId) {
        await userStore.getUserById(userId);
    }

    if ($cookies.get('me').activated) {
        router.back();
    }
});
</script>

<template>
    <div class="flex flex-col items-center pt-2">
        <h2 class="text-tertiary font-bold text-center text-xl uppercase">Validation de votre mail</h2>
        <div v-if="userStore.userSelected">
            <p class="mt-4">Code de validation envoyé à {{ userStore.userSelected.email }}</p>
            <p>
                Si vous ne l'avez pas reçu, cliquer <span @click="sendEmail(userStore.userSelected.userId)"
                    class="text-tertiary underline hover:cursor-pointer">ici</span>
            </p>
            <div class="flex items-center justify-between">
                <input type="text" v-model="token" maxlength="6"
                    class="row-start-1 w-4/5 bg-quartiary border-2 border-primary rounded-[10px] p-[5px] text-center"
                    :class="{ 'border-red-500': !isTokenValid }" />
                <button @click="validateToken(userStore.userSelected.userId)"
                    class="ml-auto bg-tertiary text-white text-center font-bold py-2 px-3 rounded-lg text-sm my-1.5 transition-colors duration-300 hover:cursor-pointer hover:bg-primary">
                    Valider
                </button>
            </div>
        </div>
    </div>
</template>