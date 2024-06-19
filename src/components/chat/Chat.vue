<script>
export default {
  props: {
    chats: Array,
    currentUser: String,
  },
  data() {
    return {
    };
  },
  updated() {
    document.querySelector("#chatScroll").scrollTop = document.querySelector("#chatScroll").scrollHeight;
  }
}
</script>

<template>
    <div v-for="chat in chats" class="w-auto flex flex-col gap-3 p-3">
            <div v-if="chat.user == currentUser" class="w-auto flex flex-col">
              <div class="w-auto self-end p-3 bg-primary text-white rounded-lg rightBubble">{{ chat.text }}</div>
              <div class="w-auto self-end text-primary text-xs pt-1">{{ new Date(chat.date).toLocaleTimeString() }}
              </div>
            </div>
            <div v-else class="w-auto flex flex-col">
              <div class="w-auto self-start p-3 bg-secondary text-tertiary rounded-lg leftBubble">{{ chat.text }}</div>
              <div class="w-auto self-start text-primary text-xs pt-1">{{ chat.user }} · {{ new
          Date(chat.date).toLocaleTimeString() }}</div>
            </div>
          </div>
</template>