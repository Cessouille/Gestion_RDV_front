import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return { me: null }
  },
  actions: {
    async getMe() {
      try {
        this.me = {
          name: "Jedan-Michel ZEUB",
          profilePicture: "/src/assets/images/pp.png",
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  },
});
