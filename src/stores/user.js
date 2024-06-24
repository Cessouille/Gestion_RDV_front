import { defineStore } from 'pinia';
import { useApiClient } from '../composables/apiClient';

const api = useApiClient();

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      me: null,
      userSelected: null,
      appointments: null
    }
  },
  getters: {
    isAuthentificated() {
      return $cookies.get('me') !== null;
    }
  },
  actions: {
    getMe() {
      try {
        var cookieMe = $cookies.get('me');
        if (cookieMe) {
          this.me = cookieMe;
          return this.me;
        } else {
          return false;
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async getUserById(userId) {
      try {
        this.userSelected = await api.get(`/Users/${userId}`);
        return this.userSelected;
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
        var response = await api.post('/Login/Login', {
          body: data,
          async onResponseError({ request, response, options }) {
            throw { body: response._data, status: response.status };
          },
        });
        this.me = {
          id: response.userDetails.userId,
          officeId: response.userDetails.office.officeId,
          firstname: response.userDetails.firstName,
          lastname: response.userDetails.lastName,
          fullname: response.userDetails.firstName + ' ' + response.userDetails.lastName.toUpperCase(),
          profilePicture: response.userDetails.avatar ? response.userDetails.avatar : '/src/assets/images/avatar.png',
          role: this.getRole(response.userDetails.role),
        }

        $cookies.set('me', this.me, '1d');
        $cookies.set('token', response.token, '1d');
        const loggedInEvent = new CustomEvent('loggedin::hide');
        window.dispatchEvent(loggedInEvent);
        return this.me;
      } catch (e) {
        throw e;
      }
    },
    LogOut() {
      const loggedOutEvent = new CustomEvent('loggedout::hide')
      window.dispatchEvent(loggedOutEvent);
      $cookies.remove('me');
    },
    async fetchAppointments() {
      if ($cookies.get('me').role !== 'pro') {
        return;
      }

      const data = await api.get(`/RendezVous/${$cookies.get('me').officeId}`);

      this.appointments = data.map(rdv => ({
        id: rdv.rendezVousId,
        userId: rdv.user.userId,
        name: `${rdv.user.firstName} ${rdv.user.lastName.toUpperCase()}`,
        description: rdv.description,
        startDate: new Date(rdv.startDate),
        endDate: new Date(rdv.endDate),
        price: rdv.prix,
        file: rdv.fichierJoint,
      }));
    },
    getRole(roleId) {
      switch (roleId) {
        case 0:
          return 'user';
        case 1:
          return 'pro';
        case 2:
          return 'admin';
        default:
          throw 'Erreur';
      }
    },
  },
});
