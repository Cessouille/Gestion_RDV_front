<script setup>
import Chat from '../components/chat/Chat.vue';
import Loader from '../components/loader/Loader.vue';
import { onMounted, ref } from 'vue';
import { useConversationStore } from '@/stores/conversation';
import { useUserStore } from '@/stores/user';
import { useDoctorStore } from '@/stores/doctor';

import Form from '../components/form/Form.vue';
import Field from '../components/form/Field.js';

const convStore = useConversationStore();
const userStore = useUserStore();
const doctorStore = useDoctorStore();

onMounted(async () => {
  await LoadChats();
});

var currentUser = ref(userStore.getMe());
var textChats = ref(false);
var error = ref(false);
var chatError = ref(false);
var conversations = ref(false);
var sending = ref(false);
var lastTime = ref(null);
var intervalId = ref(null);
var currentMsgPage = ref(0);
var messageNumber = ref(0);
var allOlderLoaded = ref(false);
var showAddForm = ref(false);
var errMsg = ref(null);
var errField = ref(null);

var currentConversation = ref(false);

var firstTime = ref(null);
var nothingToShow = ref(true);

var formFields = ref([
  new Field("Nom", "text", "name"),
  new Field("Utilisateurs", "select-m", "users", []),
]);

function showConvNames(users) {
  var userString = "";
  users.forEach(function callback(value, index) {
    var fullname = value.firstName + ' ' + value.lastName.toUpperCase();
    userString += fullname + (fullname != currentUser.value.fullname ? "" : " (Vous)");
    if (index < users.length - 1) {
      userString += ", ";
    }
  });
  return userString;
}

async function handleSubmit(data) {
  if (!data.name) {
    errMsg.value = "La conversation doit avoir un nom";
    errField.value = "name";
  } else if (!data.users || data.users.length <= 0) {
    errMsg.value = "La conversation doit avoir au moins un autre utilisateur";
    errField.value = "users";
  } else {
    var userIds = [];
    await Promise.all(data.users.map(async (doctor) => {
      var doctorUserId = await doctorStore.getDoctorUserId(doctor.id);
      userIds.push(doctorUserId);
    }));
    userIds.push(currentUser.value.id);
    await convStore.createConversation(userIds, data.name);
    await LoadChats();
    showAddForm.value = false;
  }
}

async function LoadChats() {
  allOlderLoaded.value = false;
  currentMsgPage.value = 0;
  messageNumber.value = 0;
  error.value = null;
  chatError.value = null;
  await convStore.fetchUserConversations(currentUser.value.id);
  if (convStore.error) {
    error.value = convStore.error;
    chatError.value = true;
  } else {
    currentConversation.value = convStore.conversations[0];
    conversations.value = convStore.conversations;
    if (convStore.conversations.length > 0) {
      currentMsgPage.value = 0;
      await loadMessages(currentUser.value.id, currentConversation.value.conversationId);
    }
  }
  return;
}

async function loadMessages(userId, convId, relaunch = true) {
  chatError.value = false;
  textChats.value = false;
  try {
    await convStore.fetchPaginatedMessages(userId, convId, 0);
    if (convStore.messages.length < 10) {
      allOlderLoaded.value = true;
    }
    textChats.value = convStore.messages.map((msg => {
      return { user: msg.user ? msg.user.firstName + ' ' + msg.user.lastName.toUpperCase() : 'Utilisateur ' + msg.userId, date: msg.created, text: msg.text.replace(/\n/g, '<br />'), id: messageNumber.value++ };
    }));
    if (convStore.messages.length > 0) {
      lastTime.value = textChats.value[textChats.value.length - 1].date;
      firstTime.value = lastTime.value;
    }
    if (relaunch) {
      intervalId.value = setInterval(function () {
        getNewMessages(currentUser.value.id, currentConversation.value.conversationId);
      }, 1000);
    }
  } catch (error) {
    console.log(error)
    chatError.value = true;
    textChats.value = false;
  }
  return;
}

async function loadOlderMessages(userId, convId) {
  chatError.value = false;
  try {
    await convStore.fetchPaginatedMessages(userId, convId, currentMsgPage.value + 1, firstTime.value);
    currentMsgPage.value++;
    if (convStore.messages.length < 10) {
      allOlderLoaded.value = true;
    }
    var olderChats = convStore.messages.map((msg => {
      return { user: msg.user ? msg.user.firstName + ' ' + msg.user.lastName.toUpperCase() : 'Utilisateur ' + msg.userId, date: msg.created, text: msg.text.replace(/\n/g, '<br />'), id: messageNumber.value++ };
    }));
    olderChats.forEach(msg => {
      textChats.value.unshift(msg);
    });
    lastTime.value = textChats.value[textChats.value.length - 1].date;
  } catch (error) {
    console.log(error)
    chatError.value = true;
    textChats.value = false;
  }
  return;
}

async function getNewMessages(userId, convId, fromSubmit = false) {
  chatError.value = false;
  try {
    if (textChats.value.length > 0) {
      var lastChatIndex = textChats.value.findIndex(msg => msg.date == lastTime.value);
      await convStore.fetchNewMessages(userId, convId, textChats.value[lastChatIndex].date);
      var newMessages = convStore.messages.map((msg => {
        return { user: msg.user ? msg.user.firstName + ' ' + msg.user.lastName.toUpperCase() : 'Utilisateur ' + msg.userId, date: msg.created, text: msg.text.replace(/\n/g, '<br />'), id: messageNumber.value++ };
      }));
      if (fromSubmit) {
        newMessages[newMessages.length - 1].justSent = true;
      }
      newMessages.forEach(element => {
        textChats.value.push(element)
      });
      if (textChats.value.length > 0) {
        lastTime.value = textChats.value[textChats.value.length - 1].date;
      }
    } else {
      nothingToShow.value = true;
      clearInterval(intervalId.value);
      await loadMessages(currentUser.value.id, currentConversation.value.conversationId, false);
    }
    return;
  } catch (error) {
    console.log(error)
    clearInterval(intervalId.value);
    chatError.value = true;
    textChats.value = false;
  }
  return;
}
async function loadShowAddConvForm() {
  showAddForm.value = true;
  await doctorStore.fetchDoctors();
  formFields.value[1].values = doctorStore.doctors.map((cat => {
    return { name: cat.name, doctors: cat.doctors }
  }));
}

async function sendMsg() {
  try {
    if (currentConversation.value) {
      var message = document.querySelector("#messageBox").innerText;
      if (message) {
        sending.value = true;
        try {
          if (textChats.value.length > 0) {
            lastTime.value = textChats.value[textChats.value.length - 1].date;
          }
          await convStore.sendMessage(currentUser.value.id, currentConversation.value.conversationId, message);
          await getNewMessages(currentUser.value.id, currentConversation.value.conversationId, true);
          sending.value = false
        } catch (error) {
          chatError.value = true;
        }
        document.querySelector("#messageBox").innerText = "";
      }
    }
  } catch (e) {
    console.log(e)
  }
}
function stopBadLines(e) {
  e.preventDefault();
}

async function switchChat(e) {
  allOlderLoaded.value = false;
  currentMsgPage.value = 0;
  messageNumber.value = 0;
  var chats = document.querySelectorAll(".chatName");
  chats.forEach(chat => {
    if (chat.id != e.target.id) {
      chat.classList.remove("currentChat");
    }
  });
  e.target.classList.add("currentChat");

  var convId = e.target.id.slice(1);
  currentConversation.value = conversations.value.find(c => c.conversationId == convId);
  await loadMessages(currentUser.value.id, convId);
}
</script>

<template>
  <main class="flex w-full place-content-center pt-2">
    <div v-if="!currentUser">Connectez vous pour acceder aux conversations</div>
    <div v-else class="chatHolder h-[90vh]">
      <div class="chatPicker">
        <div>Chats :</div>
        <div v-if="error" class="flex flex-col items-center gap-2">
          <div id="errMsg"><span class="material-symbols-rounded fill">warning</span>Erreur de connexion</div><button
            @click="LoadChats"
            class="flex justify-center gap-2 bg-secondary text-tertiary p-2 rounded w-fit m-0-auto"><span
              class="material-symbols-rounded fill">refresh</span>Recharger</button>
        </div>
        <div v-else-if="conversations && conversations.length > 0" v-for="conv in conversations"
          :id="'c' + conv.conversationId"
          :class="{ chatName: true, currentChat: currentConversation.conversationId == conv.conversationId }"
          v-on:click="switchChat">{{
      conv.name }}
        </div>
        <div v-else-if="conversations.length == 0" class="flex justify-center text-primary text-xs text-center">
          Vous n'êtes dans aucune conversations.
        </div>
        <div v-else>
          <Loader message="Chargement des conversations"></Loader>
        </div>
        <div @click="loadShowAddConvForm"
          class="chatName flex gap-3 bg-quartiary border-2 border-solid border-secondary rounded"><span
            class="material-symbols-rounded fill">add</span>Ajouter</div>
      </div>
      <div class="chat h-[90vh]">
        <div v-if="currentConversation" id="chatName">{{ currentConversation.name }}
          <div class="text-xs text-primary">{{
      showConvNames(currentConversation.users) }}</div>
        </div>
        <div v-else id="chatName">Chat</div>
        <div v-if="chatError" class="flex flex-col items-center gap-2 bg-quartiary">
          <div id="errMsg"><span class="material-symbols-rounded fill">warning</span><span v-if="error">Erreur de
              chargement des conversations</span><span v-else>Erreur de chargement des messages</span></div>
          <button v-if="!error && chatError" @click="loadMessages(currentUser.id, currentConversation.conversationId)"
            class="flex justify-center gap-2 bg-secondary text-tertiary p-2 rounded w-fit m-0-auto"><span
              class="material-symbols-rounded fill">refresh</span>Recharger</button>
        </div>
        <div v-else-if="textChats.length > 0" id="chatScroll"
          class="scrollwindow flex align-self-center flex-col h-full overflow-scroll overflow-x-hidden bg-quartiary">
          <Chat @loadMore="loadOlderMessages(currentUser.id, currentConversation.conversationId)" :chats="textChats"
            :currentUser="currentUser.fullname" :currentPage="currentMsgPage" :allLoaded="allOlderLoaded"></Chat>
        </div>
        <div v-else-if="conversations.length > 0 && !nothingToShow" class="bg-quartiary">
          <Loader message="Chargement des messages"></Loader>
        </div>
        <div v-else class="bg-quartiary">
          <div class="flex justify-center text-primary">Aucun messages à montrer.</div>
        </div>
        <div class="w-auto flex gap-2 items-center bg-quartiary p-2">
          <div contenteditable id="messageBox"
            class="messageBox w-full border-tertiary border-solid border-2 rounded-xl p-2 bg-quartiary row-span-1"
            v-on:keyup.enter.exact="sendMsg" v-on:keydown.enter.exact="stopBadLines">
          </div>
          <button @click="sendMsg" class="w-[60px] bg-tertiary rounded-xl p-2 row-span-1 text-white">
            <i v-if="!sending" class="fa-solid fa-paper-plane"></i>
            <Loader v-else colColor="quartiary"></Loader>
          </button>
        </div>
      </div>
    </div>
  </main>
  <div v-if="showAddForm" class="formModal">
    <Form style="width: 80%;" @submit="handleSubmit" :fields="formFields" buttonName="Créer"
      name="Nouvelle conversation" :err-msg="errMsg" :err-line="errField"></Form>
    <button @click="showAddForm = false" class="reply">Annuler</button>
  </div>

</template>

<style lang="scss" scoped>
@import "../assets/scss/settings.scss";

.erroredLine:after {
  box-shadow: none !important;
}

.reply {
  background: rgb(230, 28, 28);
  border: none;
  border-radius: 8px;
  padding: 5px 10px 5px 10px;
  color: white;
  font-weight: 700;
  transition: all ease-in-out 0.1s;
  cursor: pointer;
  margin: 0 auto;
}

.formModal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: #fdfdfd54;
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

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: $primary;
  border-radius: 5px;
}

.rightBubble::after {
  content: "";
  border-width: 18px 0 0 12px;
  border-color: $primary;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -6px;
  bottom: 0;
  position: absolute;
}

.rightBubble {
  position: relative;
}

.leftBubble::after {
  content: "";
  border-width: 18px 12px 0 0;
  border-color: $secondary;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -6px;
  bottom: 0;
  position: absolute;
}

.leftBubble {
  position: relative;
}

.chatHolder {
  display: grid;
  grid-template-columns: 25% minmax(0, 1fr);
  width: 75%;
}

.chatPicker {
  grid-column: 1;
  overflow-y: scroll;
  overflow-x: hidden;
}

.chat {
  grid-column: 2;
  display: grid;
  grid-template-rows: min-content minmax(0, 1fr) min-content;
  overflow: hidden;
}

.chatName {
  background-color: $secondary;
  color: $tertiary;
  padding: 5px;
  margin: 2px;
  border-radius: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

#chatName {
  background-color: $secondary;
  color: $tertiary;
  padding: 10px;
  background: linear-gradient(0deg, $quartiary 0%, $secondary 100%);
}

.currentChat {
  background-color: $primary;
  color: $quartiary;
}
</style>
