<script>
import Loader from '../../components/loader/Loader.vue';
export default {
  components: {
    Loader,
  },
  props: {
    chats: Array,
    currentUser: String,
    currentPage: Number,
    allLoaded: Boolean,
  },
  data() {
    return {
      loadingMore: false,
      dontScroll: false,
      topMessage: null,
    };
  },
  emits: ['loadMore'],
  methods: {
    getDateString(date) {
      if (new Date().toDateString() === new Date(date).toDateString()) {
        return new Date(date).toLocaleTimeString();
      } else {
        return new Date(date).toLocaleDateString();
      }
    },
    fetchingMore() {
      if (!this.allLoaded) {
        this.dontScroll = true;
        this.loadingMore = true;
        this.$emit("loadMore");
        this.topMessage = null;
      }
    },
    computedSlide(chat) {
      if (chat.justSent) {
        return "w-auto self-end p-3 bg-primary text-white rounded-lg rightBubble slideIn";
      } else {
        return "w-auto self-end p-3 bg-primary text-white rounded-lg rightBubble";
      }
    },
  },
  mounted() {
    document.querySelector("#chatScroll").scrollTop = document.querySelector("#chatScroll").scrollHeight;
  },
  updated() {
    if (!this.dontScroll) {
      document.querySelector("#chatScroll").scrollTop = document.querySelector("#chatScroll").scrollHeight;
    } else if (document.getElementById("c-" + (this.currentPage - 1) * 10)) {
      if (this.currentPage == 1) {
        document.getElementById("c-0").scrollIntoView({ offset: { top: -100 } });
      } else {
        document.getElementById("c-" + (((this.currentPage - 1) * 10) + 9)).scrollIntoView({ offset: { top: -100 } });
      }
    }
    this.loadingMore = false;
  }
}
</script>

<template>
  <button v-if="!loadingMore" @click="fetchingMore()"
    class="bg-quartiary border-secondary border-solid border-2 text-tertiary p-2 rounded w-fit my-[10px] mx-[auto]">
    <div v-if="!allLoaded" class="flex justify-center gap-2"><span
        class="material-symbols-rounded fill">refresh</span>Charger plus de messages</div>
    <div v-else class="flex justify-center gap-2"><span class="material-symbols-rounded fill">check</span>Tout les
      messages sont chargés</div>
  </button>
  <Loader v-else message="Chargement des messages"></Loader>
  <div v-for="chat in  chats " class="w-auto flex flex-col gap-3 p-3 py-1">
    <div v-if="chat.user == currentUser" class="chat w-auto flex flex-col">
      <div class="w-auto flex flex-col">
        <div :class="computedSlide(chat)" :id="'c-' + chat.id"
          v-html="chat.text"></div>
      </div>
      <div class="w-auto self-end text-primary text-xs pt-1">{{ getDateString(chat.date) }}
      </div>
    </div>
    <div v-else class="chat w-auto flex flex-col h-full">
      <div class="w-auto self-start p-3 bg-secondary text-tertiary rounded-lg leftBubble justify-end"
        :id="'c-' + chat.id" v-html="chat.text"></div>
      <div class="w-auto self-start text-primary text-xs pt-1">{{ chat.user }} · {{ getDateString(chat.date) }}</div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../assets/scss/settings.scss";

.slideIn {
  animation: 0.5s ease-in-out appear;
}

.chat {
  scroll-margin: 100px;
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