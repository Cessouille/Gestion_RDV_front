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
  methods: {
    computedSlide(sent) {
      if (sent) {
        return "slideIn";
      } else {
        return "";
      }
    }
  },
  mounted() {
    document.querySelector("#chatScroll").scrollTop = document.querySelector("#chatScroll").scrollHeight;
  },
  updated() {
    document.querySelector("#chatScroll").scrollTop = document.querySelector("#chatScroll").scrollHeight;
  }
}
</script>

<template>
  <div v-for="chat in chats" class="w-auto flex flex-col gap-3 p-3">
    <div v-if="chat.user == currentUser" class="w-auto flex flex-col">
      <div class="w-auto flex flex-col">
        <div class="w-auto self-end p-3 bg-primary text-white rounded-lg rightBubble" :id="computedSlide(chat.justSent)"
          v-html="chat.text"></div>
      </div>
      <div class="w-auto self-end text-primary text-xs pt-1">{{ new Date(chat.date).toLocaleTimeString() }}
      </div>
    </div>
    <div v-else class="w-auto flex flex-col h-full">
      <div class="w-auto self-start p-3 bg-secondary text-tertiary rounded-lg leftBubble justify-end"
        v-html="chat.text"></div>
      <div class="w-auto self-start text-primary text-xs pt-1">{{ chat.user }} · {{ new
    Date(chat.date).toLocaleTimeString() }}</div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../assets/scss/settings.scss";

#slideIn {
  animation: 0.5s ease-in-out appear;
}

@keyframes appear {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}
</style>