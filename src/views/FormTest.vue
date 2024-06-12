<script>
import Form from '../components/form/Form.vue';
import Field from '../components/form/Field.js';
import ButtonField from '../components/form/ButtonField.js';

var emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export default {
  components: {
    Form,
  },
  data() {
    return {
      createError: null,
      errField: null,
      formName: "Log In",
      buttonName: "Connection",
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
      ],
      fields: this.fieldsLog,
      rdvButtons: [
        new ButtonField("Log In", "login", true),
        new ButtonField("Sign Up", "signup"),
      ]
    };
  },
  mounted() {
    this.fields = this.fieldsLog;
  },
  methods: {
    handleSubmit(data) {
      this.errField = null;
      this.errMsg = null;
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
            this.createError = null;
            this.errField = null;

            // API call

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
            this.createError = null;
            this.errField = null;

            // API call

          }
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
        this.buttonName = "Connection";
      } else {
        this.fields = this.fieldsCreate;
        this.buttonName = "Créer un Compte";
      }
    }
  }
}
</script>

<template>
  <Form :fields=fields :name=formName @submit="handleSubmit" :buttonName="buttonName" :errMsg="createError"
    :errLine="errField" :buttons="rdvButtons" @choiceButton="changeFields"></Form>
</template>

<style></style>
