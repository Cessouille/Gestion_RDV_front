<script>
import Loader from '../loader/Loader.vue';
import Multiselect from 'vue-multiselect'
export default {
  props: {
    fields: Array,
    buttonName: String,
    name: String,
    errMsg: String,
    errLine: String,
    buttons: Array,
    loading: Boolean,
  },
  components: {
    Loader,
    Multiselect
  },
  data() {
    return {
      form: {},
      passScore: 0,
    };
  },
  emits: ['submit', 'choiceButton'],
  methods: {
    strengthChecker(event) {
      var pass = event.target.value;
      var score = 0;
      if (pass.length >= 8)
        score++;
      if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pass))
        score++;
      if (/[A-Z]/.test(pass) && /[a-z]/.test(pass))
        score++;
      if (/[0-9]/.test(pass))
        score++;
      this.passScore = score;
    },
    submit(callback = null) {
      if (callback) {
        this.$emit("choiceButton", callback);
      } else {
        this.form["title"] = this.name;
        this.$emit("submit", this.form);
      }
    }
  }
}
</script>

<template>
  <div id="formBubble">
    <div id="formHeader">
      <h3>{{ name }}</h3>
    </div>
    <div v-if="errMsg" id="errMsg"><span class="material-symbols-rounded fill">warning</span>{{ errMsg }}</div>
    <div id="formMain">
      <div v-if="buttons" class="formActions">
        <button v-for="button in buttons" @click="submit(button.callback)"
          :class="{ choiceButton: true, selectedChoice: button.selected }">{{ button.text }}</button>
      </div>
      <div v-for="field in  fields " class="formLine">
        <template v-if="field.type != 'info'">
          <div class="inputTitle">{{ field.title }} :</div>
          <input v-if="field.ref == 'mdpcreate'" @keyup="strengthChecker" v-model="form[field.ref]" :type=field.type
            class="inputBox"></input>
          <select v-else-if="field.type == 'select'" :name="field.title"
            :class="{ inputBox: true, erroredLine: errLine == field.ref }" v-model="form[field.ref]"
            :multiple="field.type == 'select-m'">
            <option selected disabled value>Choisir une option</option>
            <option v-if="field.type == 'select'" v-for=" option  in  field.values ">{{ option }}</option>
          </select>
          <Multiselect v-else-if="field.type == 'select-m'"
            :class="{ inputBox: true, erroredLine: errLine == field.ref }" v-model="form[field.ref]" multiple
            :options="field.values" group-values="doctors" group-label="name" track-by="id" label="name"></Multiselect>
          <input v-else v-model="form[field.ref]" :type=field.type
            :class="{ inputBox: true, erroredLine: errLine == field.ref }"></input>

          <div v-if="field.ref == 'mdpcreate' && form['mdpcreate'] != null && form['mdpcreate'] != ''" id="passRow">
            <div>Sécurité : </div>
            <div class="strengthBar"
              :style="[passScore >= 4 ? 'background-color: green' : passScore >= 3 ? 'background-color: lime' : passScore >= 2 ? 'background-color: yellow' : passScore >= 1 ? 'background-color: orange' : 'background-color: red']">
            </div>
            <div class="strengthBar"
              :style="[passScore >= 4 ? 'background-color: green' : passScore >= 3 ? 'background-color: lime' : passScore >= 2 ? 'background-color: yellow' : passScore >= 1 ? 'background-color: orange' : '']">
            </div>
            <div class="strengthBar"
              :style="[passScore >= 4 ? 'background-color: green' : passScore >= 3 ? 'background-color: lime' : passScore >= 2 ? 'background-color: yellow' : '']">
            </div>
            <div class="strengthBar"
              :style="[passScore >= 4 ? 'background-color: green' : passScore >= 3 ? 'background-color: lime' : '']">
            </div>
            <div class="strengthBar" :style="[passScore >= 4 ? 'background-color: green' : '']"></div>
          </div>
        </template>

        <template v-else>
          <div class="inputTitle">{{ field.title }} :</div>
          <div class="infoText">{{ field.ref }}</div>
        </template>
      </div>
    </div>
    <div id="formAction">
      <div v-if="loading" class="reply">
        <Loader colColor="quartiary"></Loader>
      </div>
      <button v-else @click="submit(null)" class="reply">{{ buttonName }}</button>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../assets/scss/settings.scss";
@import "../../../node_modules/vue-multiselect/dist/vue-multiselect.css";

// MultiSelect Re Skin
.multiselect__tags {
  background-color: $quartiary;
}

.multiselect__tag {
  background: $primary;
}

.multiselect__option--highlight::after,
.multiselect__option--selected::after,
.multiselect__option--selected.multiselect__option--highlight::after,
.multiselect__option--group-selected.multiselect__option--highlight::after {
  content: "";
}

.multiselect__option--highlight {
  background: $primary;
}

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
    display: flex;
    flex-direction: row;
    align-items: center;

    span {
      padding-right: 5px;
    }
  }

  #formMain {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 20px 0 20px 0;
  }

  .formLine {
    display: grid;
    justify-content: space-between;
    align-items: center;
    margin: 0 50px;
    padding-bottom: 2px;
  }

  .erroredLine {
    position: relative;
  }

  .erroredLine:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0px 2px red;
    animation: breathing 5s ease-in-out infinite normal;
  }

  .strengthBar {
    width: 20px;
    height: 5px;
    background-color: lightgray;
  }

  #passRow {
    grid-column: 2;
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: baseline;
    gap: 5px;
    color: $tertiary;
  }

  .inputTitle {
    grid-row: 1;
    color: $tertiary;
  }

  .inputBox {
    grid-row: 1;
    width: 200px;
    background-color: $quartiary;
    border: solid 2px $primary;
    border-radius: 10px;
    padding: 5px;
  }

  .infoText {
    width: 210px;
    grid-row: 1;
    color: $primary;
    text-align: end;
  }

  .erroredLine {
    border: solid 2px red;
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

  .formActions {
    display: flex;
    justify-content: space-between;
    margin: 0 50px;
    gap: 15px;
  }

  .choiceButton {
    background-color: $quartiary;
    border: 2px solid $tertiary;
    border-radius: 18px;
    padding: 5px 20px 5px 20px;
    color: $tertiary;
    font-weight: 700;
    transition: all ease-in-out 0.1s;
    cursor: pointer;
    width: 100%
  }

  .choiceButton.selectedChoice {
    background-color: $tertiary;
    color: white;
    border: 2px solid $tertiary;
  }
}
</style>