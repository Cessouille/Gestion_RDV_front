<script>
import Form from '../components/form/Form.vue';
import Field from '../components/form/Field.js';
import Loader from '../components/loader/Loader.vue';
import ButtonField from '../components/form/ButtonField.js';
import { useUserStore } from '@/stores/user';
import { useToast } from 'vue-toast-notification';

var emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const $toast = useToast();

export default {
    components: {
        Form,
        Loader,
    },
    data() {
        return {
            formLoading: false,
            submitMessage: null,
            userStore: useUserStore(),
            createError: null,
            errField: null,
            formName: "Log In",
            buttonName: "Connexion",
            fieldsLog: [
                new Field("E-mail", "text", "mail"),
                new Field("Mot de Passe", "password", "password"),
            ],
            fieldsCreate: [
                new Field("E-mail", "mail", "mail"),
                new Field("Prénom", "text", "name"),
                new Field("Nom", "text", "lastname"),
                new Field("Date de naissance", "date", "date"),
                new Field("Mot de Passe", "password", "mdpcreate"),
                new Field("Confirmer", "password", "mdpconf"),
                new Field("Professionnel", "checkbox", "ispro"),
            ],
            fields: this.fieldsLog,
            rdvButtonsStore: [
                new ButtonField("Log In", "login", true),
                new ButtonField("Sign Up", "signup"),
            ],
            rdvButtons: this.rdvButtonsStore,
        };
    },
    mounted() {
        var user = this.userStore.getMe();
        if (user) {
            this.rdvButtons = null;
            this.fields = [
                new Field("Nom d'utilisateur", "info", user.fullname),
            ];
            this.formName = "Connecté";
            this.buttonName = "Déconnexion";
        } else {
            this.rdvButtons = this.rdvButtonsStore;
            this.fields = this.fieldsLog;
            this.formName = "Log In";
            this.buttonName = "Connexion";
        }
    },
    methods: {
        async handleSubmit(data) {
            this.createError = false;

            async function digestMessage(message) {
                const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
                const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
                const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
                return hashHex;
            };

            this.errField = null;
            this.createError = null;
            switch (data.title) {
                case "Sign Up":
                    var mailCheck = emailReg.test(data.mail);
                    if (!mailCheck) {
                        this.createError = "Erreur de format d'adresse mail.";
                        this.errField = "mail";
                    } else if (!data.name) {
                        this.createError = "Le prénom doit être renseigné.";
                        this.errField = "name";
                    } else if (!data.lastname) {
                        this.createError = "Le nom doit être renseigné.";
                        this.errField = "lastname";
                    } else if (!data.date) {
                        this.createError = "La date de naissance doit être renseigné.";
                        this.errField = "date";
                    } else if (new Date(data.date) > new Date().setFullYear(new Date().getFullYear() - 16)) {
                        this.createError = "Vous devez avoir plus de 16 ans pour inscrire.";
                    } else if (!data.mdpcreate || data.mdpcreate.length < 5) {
                        this.createError = "Le mot de passe doit contenire plus de 5 caractères.";
                        this.errField = "mdpcreate";
                    } else if (data.mdpcreate != data.mdpconf) {
                        this.createError = "Confirmation du mot de passe incorrecte.";
                        this.errField = "mdpconf";
                    } else {
                        this.submitMessage = "Création du compte";
                        this.formLoading = true;
                        this.createError = null;
                        this.errField = null;
                        const hashedPwd = await digestMessage(data.mdpcreate);

                        var userToCreate = {
                            email: data.mail,
                            password: hashedPwd,
                            birthDate: data.date,
                            firstName: data.name,
                            lastName: data.lastname,
                            role: data.ispro ? 1 : 0
                        }

                        try {
                            await this.userStore.SignUp(userToCreate);
                            this.submitMessage = null;
                            $toast.success(`Votre compte à été crée avec succès.`, {
                                position: 'bottom-right',
                                duration: 3000,
                            });
                            this.changeFields("login");
                        } catch (error) {
                            this.createError = "Erreur lors de la création du compte.";
                            console.log(error);
                        }
                        this.formLoading = false;
                    }
                    break;
                case "Log In":
                    var mailCheck = emailReg.test(data.mail);
                    if (!data.mail) {
                        this.createError = "L'e-mail doit être renseigné.";
                        this.errField = "mail";
                    } else if (!mailCheck) {
                        this.createError = "Adresse mail non valide.";
                        this.errField = "mail";
                    } else if (!data.password) {
                        this.createError = "Le mot de passe doit être renseigné.";
                        this.errField = "password";
                    } else {
                        this.submitMessage = "Connexion en cours";
                        this.formLoading = true;
                        this.createError = null;
                        this.errField = null;

                        const hashedPwd = await digestMessage(data.password);

                        var login = {
                            email: data.mail,
                            password: hashedPwd,
                        }

                        try {
                            var result = await this.userStore.LogIn(login);
                            $toast.success(`Vous êtes connectez en tant que ${this.userStore.me.fullname}`, {
                                position: 'bottom-right',
                                duration: 3000,
                            });
                            this.submitMessage = null;
                            this.createError = null;
                            this.rdvButtons = null;
                            this.fields = [
                                new Field("Nom d'utilisateur", "info", result.fullname),
                            ];
                            this.formName = "Connecté";
                            this.buttonName = "Déconnexion";
                        } catch (error) {
                            console.log(error);
                            if (error.status == 401) {
                                this.createError = error.body;
                            } else {
                                this.createError = "Erreur de connexion";
                            }
                        }
                        this.formLoading = false;

                    }
                    break;
                case "Connecté":
                    this.userStore.LogOut();
                    this.fields = this.fieldsLog;
                    this.formName = "Log In";
                    this.buttonName = "Connexion";
                    this.rdvButtons = this.rdvButtonsStore;
                    $toast.success(`Vous êtes déconnectés`, {
                        position: 'bottom-right',
                        duration: 3000,
                    });
                    break;
            }
        },
        changeFields(field) {
            this.createError = null;
            this.errField = null;
            var clickedIndex = this.rdvButtons.findIndex(rdv => rdv.callback == field);
            var clickedButton = this.rdvButtons[clickedIndex];
            clickedButton.selected = true;
            this.rdvButtons.forEach(button => {
                if (button.callback != field) {
                    button.selected = false;
                }
            });
            this.formName = clickedButton.text;
            if (clickedButton.text == "Log In") {
                this.fields = this.fieldsLog;
                this.buttonName = "Connexion";
            } else {
                this.fields = this.fieldsCreate;
                this.buttonName = "Créer un Compte";
            }
        }
    }
}
</script>

<template>
    <Form :loading="formLoading" :fields=fields :name=formName @submit="handleSubmit" :buttonName="buttonName"
        :errMsg="createError" :errLine="errField" :buttons="rdvButtons" @choiceButton="changeFields"></Form>
</template>

<style lang="scss">
@import "../assets/scss/settings.scss";

#formBubble {
    background-color: $secondary;
    border: 3px solid $primary;
    border-radius: 15px;
    padding: 7px;
    width: 500px;
    margin: 20px auto;
}
</style>
