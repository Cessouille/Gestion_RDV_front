import { defineStore } from 'pinia';
import { useApiClient } from '../composables/apiClient';

const api = useApiClient();

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

        $cookies.set('me', this.me, '1d');
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async SignUp(data) {
      try {
        await api.post('/Login/SignIn', { body: data });
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async LogIn(data) {
      try {
        return await api.post('/Login/Login?email=' + data.email + '&mdp=' + data.password);
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
