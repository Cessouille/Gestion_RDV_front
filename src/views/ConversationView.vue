<script setup>
import Chat from '../components/chat/Chat.vue';
import Loader from '../components/loader/Loader.vue';
import { onMounted, ref } from 'vue';
import { useConversationStore } from '@/stores/conversation';

const convStore = useConversationStore();

onMounted(async () => {
  await LoadChats();
});

var currentUser = "Mike";
var textChats = ref(false);
var error = ref(false);
var chatError = ref(false);

var conversations = ref(false)

var currentConversation = ref(false);

function showConvNames(users) {
  if (users.length > 2) {
    var userString = "";
    users.forEach(function callback(value, index) {
      if (value != currentUser) {
        userString += value;
        if (index < users.length - 1) {
          userString += ", ";
        }
      }
    });
    return userString;
  } else {
    var name = users.find(u => u != currentUser);
    return name;
  }
}

async function LoadChats() {
  error.value = null;
  chatError.value = null;
  await convStore.fetchUserConversations(1); //set id
  if (convStore.error) {
    error.value = convStore.error;
    chatError.value = true;
  } else {
    currentConversation.value = convStore.conversations[0];
    conversations.value = convStore.conversations;
    await loadMessages(1, currentConversation.value.conversationId);
  }
  return;
}

async function loadMessages(userId, convId) {
  chatError.value = false;
  textChats.value = false;
  try {
    await convStore.fetchConversationMessages(1, convId); //set user id   
    textChats.value = convStore.messages.map((msg => {
      return { user: msg.user ? msg.user.firstName + ' ' + msg.user.lastName.toUpperCase() : 'Utilisateur ' + msg.userId, date: msg.created, text: msg.text };
    })); 
  } catch (error) {
    chatError.value = true;
    textChats.value = false;    
  }
  return;
}

async function switchChat(e) {
  var chats = document.querySelectorAll(".chatName");
  chats.forEach(chat => {
    if (chat.id != e.target.id) {
      chat.classList.remove("currentChat");
    }
  });
  e.target.classList.add("currentChat");

  var convId = e.target.id.slice(1);
  currentConversation.value = conversations.value.find(c => c.conversationId == convId);
  await loadMessages(1, convId);
}
</script>

<template>
  <main class="flex w-full place-content-center pt-2">
    <div class="chatHolder h-[90vh]">
      <div class="chatPicker">
        <div>Chats :</div>
        <div v-if="error" class="flex flex-col items-center gap-2">
          <div id="errMsg"><span class="material-symbols-rounded fill">warning</span>Erreur de connexion</div><button
            @click="LoadChats"
            class="flex justify-center gap-2 bg-secondary text-tertiary p-2 rounded w-fit m-0-auto"><span
              class="material-symbols-rounded fill">refresh</span>Recharger</button>
        </div>
        <div v-else-if="conversations" v-for="conv in conversations" :id="'c' + conv.conversationId"
          :class="{ chatName: true, currentChat: currentConversation.conversationId == conv.conversationId }"
          v-on:click="switchChat">{{
          conv.conversation.name }}
        </div>
        <div v-else>
          <Loader message="Chargement des conversations"></Loader>
        </div>
      </div>
      <div class="chat h-[90vh]">
        <div v-if="currentConversation" id="chatName">{{ currentConversation.conversation.name }}
          <div class="text-xs text-primary" v-if="currentConversation.conversation.conversationsUser.length > 2">{{
          showConvNames(currentConversation.conversation.conversationsUser) }}</div>
        </div>
        <div v-else id="chatName">Chat</div>
        <div v-if="chatError" class="flex flex-col items-center gap-2 bg-quartiary">
          <div id="errMsg"><span class="material-symbols-rounded fill">warning</span><span v-if="error">Erreur de
              chargement des conversations</span><span v-else>Erreur de chargement des messages</span></div>
          <button v-if="!error && chatError" @click="loadMessages(1,currentConversation.conversationId)"
            class="flex justify-center gap-2 bg-secondary text-tertiary p-2 rounded w-fit m-0-auto"><span
              class="material-symbols-rounded fill">refresh</span>Recharger</button>
        </div>
        <div v-else-if="textChats" id="chatScroll"
          class="scrollwindow flex align-self-center flex-col h-full overflow-scroll overflow-x-hidden bg-quartiary">
          <Chat :chats="textChats" :currentUser="currentUser"></Chat>
        </div>
        <div v-else class="bg-quartiary">
          <Loader message="Chargement des messages"></Loader>
        </div>
        <div class="w-auto flex gap-2 items-center bg-quartiary p-2">
          <div contenteditable
            class="messageBox w-full border-tertiary border-solid border-2 rounded-xl p-2 bg-quartiary row-span-1">
          </div>
          <button class="w-[60px] bg-tertiary rounded-xl p-2 row-span-1 text-white"><i
              class="fa-solid fa-paper-plane"></i></button>
        </div>

      </div>


    </div>
  </main>
</template>

<style lang="scss">
@import "../assets/scss/settings.scss";

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

.scrollwindow {
  scroll-behavior: smooth;
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
