import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return { me: null }
  },
  actions: {
    async getMe() {
      try {
        this.me = {
          id: 1,
          firstname: 'Jedan-Michel',
          lastname: 'Zeub',
          fullname: "Jedan-Michel ZEUB",
          profilePicture: "/src/assets/images/pp.png",
        }

        $cookies.set('me', this.me, '1d');
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    isAuthentificated() {
      return $cookies.get('me') !== null;
    }
  },
});
