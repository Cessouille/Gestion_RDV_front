<script>
import Field from './Field.js';
export default {
  props: {
    fields: Array,
    buttonName: String,
    action: String,
    name: String,
    errMsg: String,
  },
  data () {
    return {
      form: {},
    };
  },
  emits: ['submit'],
  methods: {
    submit() {
      this.$emit("submit", this.form);
    }
  }
}
</script>

<template>
  <div id="formBubble">
    <div id="formHeader">
      <h3>{{ name }}</h3>
    </div>
    <div v-if="errMsg" id="errMsg">{{ errMsg }}</div>
    <div id="formMain">
      <div v-for="field in fields" class="formLine">
        <div class="inputTitle">{{ field.title }} :</div>
        <input v-model="form[field.ref]" :type=field.type class="inputBox"></input>
      </div>
    </div>
    <div id="formAction">
      <button :onclick=submit class="reply">{{ buttonName }}</button>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../assets/scss/settings.scss";

#formBubble {
  background-color: $secondary;
  border: 3px solid $primary;
  border-radius: 15px;
  padding: 7px;
  width: 500px;
  margin: 20px auto;

  #formHeader {
    display: flex;
    justify-content: space-around;
    color: $tertiary;
    font-size: medium;
    font-weight: bold;
  }

  #errMsg {
    background-color: rgba(255, 0, 0, 0.25);
    color: darkred;
    font-weight: bold;
    padding: 5px;
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 10px;
    width: 80%;
  }

  #formMain {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 20px 0 20px 0;
  }

  .formLine {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
  }

  .inputTitle {
    color: $tertiary;
  }

  .inputBox {
    width: 200px;
    background-color: $quartiary;
    border: solid 2px $primary;
    border-radius: 10px;
    padding: 5px;
  }

  p {
    margin: 5px 0 10px 0;
    text-align: justify;
    color: $tertiary;
    font-size: large;
  }

  .replyText {
    color: $primary;
    font-size: large;
  }

  .reply {
    background-color: $tertiary;
    border: none;
    border-radius: 8px;
    padding: 5px 10px 5px 10px;
    color: white;
    font-weight: 700;
    transition: all ease-in-out 0.1s;
    cursor: pointer;
    margin: 0 auto;
  }

  #formAction {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>