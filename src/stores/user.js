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
    async SignUp(data) {
      try {
        await api.post('/Login/SignIn', { body: data });
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async LogIn(data, callback) {
      try {
        var response = await api.post('/Login/Login', {
          body: data,
          async onResponseError({ request, response, options }) {
            throw response._data;
          },
        });
        this.me = {
          id: response.userDetails.userId,
          firstname: response.userDetails.firstName,
          lastname: response.userDetails.lastName,
          fullname: response.userDetails.firstName + ' ' + response.userDetails.lastName.toUpperCase(),
          profilePicture: response.userDetails.avatar,
        }
        $cookies.set('me', this.me, '1d');
        $cookies.set('token', response.token, '1d');
        return true;
      } catch (e) {
        console.error(e.body);
        throw e;
      }
    },
    isAuthentificated() {
      return $cookies.get('me') !== null;
    }
  },
});
