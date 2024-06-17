import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return { me: null }
  },
  getters: {
    async getMe() {
      try {
        me = {
          name: "Célian CHAUSSON",
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  },
});
