<script setup>
import Form from '../components/form/Form.vue';
import Field from '../components/form/Field.js';

const fields = [
  new Field("E-mail", "text", "mail"),
  new Field("Mot de Passe", "password", "password"),
];
const fieldsCreate = [
  new Field("E-mail", "text", "mail"),
  new Field("Prénom", "text", "name"),
  new Field("Nom", "text", "lastname"),
  new Field("Date de naissance", "date", "date"),
  new Field("Mot de Passe", "password", "mdp"),
  new Field("Confirmer", "password", "mdpconf"),
];

var createError = null;

function handleSub(data) {
  console.log(data);
};

function handleCreate(data) {
  if (data.mdp != data.mdpconf) {
    createError = "Confirmation du mot de passe incorrecte.";
  } else {
    createError = null;
  }
  console.log(createError);
};
</script>

<template>
  <Form :fields=fields name="Log In" action="sub" @submit="handleSub" buttonName="Se Connecter"></Form>
  <Form :fields=fieldsCreate name="Sign Up" action="sub" @submit="handleCreate" buttonName="Créer un Compte"
    :errMsg=createError></Form>
</template>

<style>
</style>
