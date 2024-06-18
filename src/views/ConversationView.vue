<script setup>
import Chat from '../components/chat/Chat.vue';
import { onMounted, ref } from 'vue'

onMounted(() => {
  var scrollWindow = document.querySelector(".scrollwindow");
  var chatBox = document.querySelector(".messageBox");
  scrollWindow.scrollTop = scrollWindow.scrollHeight;

  const handleSelection = function () {
    scrollWindow.scrollTop = scrollWindow.scrollHeight;
  };

  ['mouseup', 'keyup', 'resize'].forEach((e) => {
    chatBox.addEventListener(e, handleSelection);
  });
})
var currentUser = "Mike";
var textChats = ref([
  { user: "Other", date: "2024-06-18T06:55:33.558Z", text: "Jordan Cereals" },
  { user: "Mike", date: new Date(), text: "Il est maintenant" },
  { user: "Mike", date: new Date(), text: "Il est maintenant" },
  { user: "Other", date: "2024-06-18T06:55:33.558Z", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac bibendum massa. Integer metus sem, porttitor ut maximus at, dignissim nec ligula. In hac habitasse platea dictumst. Cras auctor nisl sed efficitur convallis. Nunc vel pellentesque urna. Pellentesque vitae tincidunt tellus. Ut imperdiet ornare semper. Nam lacus urna, tincidunt nec erat at, efficitur pellentesque velit. Aliquam tortor augue, tincidunt ac hendrerit eu, bibendum at erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus tellus metus, venenatis quis tincidunt quis, porttitor malesuada ipsum. Mauris gravida, diam a vehicula consectetur, justo nisi tincidunt neque, quis ornare felis purus a odio. Nam ex nibh, pulvinar nec porttitor et, sollicitudin ut mauris. Integer luctus luctus gravida. Curabitur quis pretium lectus. Etiam sodales fringilla sem at ultrices." },
  { user: "Mike", date: new Date(), text: "Il est maintenant" },
]);

var conversations = ref([
  { users: ["Mike", "Steven"], id: 1 },
  { users: ["Mike", "Opticien"], id: 2 },
  { users: ["Mike", "Steven", "Opticien"], id: 3 },
  { users: ["Mike", "Steven 2"], id: 4 },
  { users: ["Mike", "Steven 2", "Steven", "Michel"], id: 5 },
])

var currentConversation = ref(conversations.value[0]);
console.log(currentConversation)

function showConvName(users) {
  if (users.length > 2) {
    var userString = "";
    users.forEach(function callback(value, index) {
      if (value != currentUser) {
        userString += value;
        if (index < users.length - 1) {
          userString += " & ";
        }
      }
    });
    return userString;
  } else {
    var name = users.find(u => u != currentUser);
    return name;
  }
}

function switchChat(e) {
  var chats = document.querySelectorAll(".chatName");
  chats.forEach(chat => {
    if (chat.id != e.target.id) {
      chat.classList.remove("currentChat");
    }
  });
  e.target.classList.add("currentChat");

  //get chats from id

  if (e.target.id == "c1") {
    textChats.value = [
      { user: "Steven", date: "2024-06-18T06:55:33.558Z", text: "Jordan Cereals" },
      { user: "Mike", date: new Date(), text: "Il est maintenant" },
      { user: "Mike", date: new Date(), text: "Il est maintenant" },
      { user: "Steven", date: "2024-06-18T06:55:33.558Z", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac bibendum massa. Integer metus sem, porttitor ut maximus at, dignissim nec ligula. In hac habitasse platea dictumst. Cras auctor nisl sed efficitur convallis. Nunc vel pellentesque urna. Pellentesque vitae tincidunt tellus. Ut imperdiet ornare semper. Nam lacus urna, tincidunt nec erat at, efficitur pellentesque velit. Aliquam tortor augue, tincidunt ac hendrerit eu, bibendum at erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus tellus metus, venenatis quis tincidunt quis, porttitor malesuada ipsum. Mauris gravida, diam a vehicula consectetur, justo nisi tincidunt neque, quis ornare felis purus a odio. Nam ex nibh, pulvinar nec porttitor et, sollicitudin ut mauris. Integer luctus luctus gravida. Curabitur quis pretium lectus. Etiam sodales fringilla sem at ultrices." },
      { user: "Mike", date: new Date(), text: "Il est maintenant" },
    ];
    currentConversation.value = conversations.value[0];
  } else if (e.target.id == "c2") {
    textChats.value = [
      { user: "Opticien", date: "2024-06-18T06:55:33.558Z", text: "Jordan Cereals pour opticien ?" },
      { user: "Mike", date: new Date(), text: "Il est maintenant" },
      { user: "Opticien", date: "2024-06-18T06:55:33.558Z", text: "En tant qu'opticien..." },
    ];
    currentConversation.value = conversations.value[1];
  } else if (e.target.id == "c3") {
    textChats.value = [
      { user: "Opticien", date: "2024-06-18T06:55:33.558Z", text: "Jordan Cereals pour opticien ?" },
      { user: "Stephen", date: "2024-06-18T06:57:33.558Z", text: "Jordan Cereals pour Steven !" },
      { user: "Mike", date: new Date(), text: "Il est maintenant" },
      { user: "Opticien", date: "2024-06-18T06:55:33.558Z", text: "En tant qu'opticien..." },
      { user: "Stephen", date: "2024-06-18T06:57:33.558Z", text: "En tant que Steven..." },
    ];
    currentConversation.value = conversations.value[2];
  } else {
    textChats.value = [
      { user: "Steven", date: "2024-06-18T06:55:33.558Z", text: "ok." },
      { user: "Mike", date: new Date(), text: "ok." },
    ];
    currentConversation.value = conversations.value[3];
  }

}
</script>

<template>
  <main class="flex w-full place-content-center pt-2">
    <div class="chatHolder h-[90vh]">
      <div class="chatPicker">
        <div>Chats :</div>
        <div v-for="conv in conversations" :id="'c' + conv.id" :class="{chatName: true, currentChat: currentConversation.id == conv.id}"
          v-on:click="switchChat">{{
          showConvName(conv.users) }}</div>
      </div>
      <div class="chat">
        <div id="chatName">Chat avec {{ showConvName(currentConversation.users) }}</div>
        <div id="chatScroll"
          class="scrollwindow flex align-self-center flex-col h-full overflow-scroll overflow-x-hidden bg-quartiary">
          <Chat :chats="textChats" :currentUser="currentUser"></Chat>
        </div>
        <div class="w-auto flex gap-2 items-center">
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


/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: $quartiary;
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

#chatName{
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
