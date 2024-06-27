import { defineStore } from 'pinia';
import { useApiClient } from '../composables/apiClient';

const api = useApiClient();

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      me: null,
      user: null,
      userSelected: null,
      appointments: null
    }
  },
  getters: {
    isAuthentificated() {
      return $cookies.get('me') !== null;
    },
    isActivated() {
      return $cookies.get('me').activated;
    },
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
    async signUp(data) {
      try {
        await api.post('/Login/SignIn', { body: data });
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async logIn(data) {
      try {
        var response = await api.post('/Login/Login', {
          body: data,
          async onResponseError({ request, response, options }) {
            throw { body: response._data, status: response.status };
          },
        });
        this.me = {
          id: response.userDetails.userId,
          officeId: response.userDetails.office ? response.userDetails.office.officeId : null,
          firstname: response.userDetails.firstName,
          lastname: response.userDetails.lastName,
          fullname: response.userDetails.firstName + ' ' + response.userDetails.lastName.toUpperCase(),
          profilePicture: response.userDetails.avatar ? response.userDetails.avatar : '/src/assets/images/avatar.png',
          role: this.getRole(response.userDetails.role),
          activated: response.userDetails.activated,
        }

        if (!response.userDetails.activated) {
          await this.sendValidationEmail(response.userDetails.userId);
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
    logOut() {
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

      this.appointments = this.appointments.filter((appointment) => {
        return appointment.startDate > new Date();
      });
    },
    async sendValidationEmail(id) {
      try {
        this.user = await api.get(`/Users/${id}`);
        await api.post(`/Login/SendConfirmationEmail/${this.user.email}`);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async validateEmail(id, token) {
      try {
        await api.post(`/Login/VerifyEmail/${id}/${token}`);

        const cookies = $cookies.get('me');
        cookies.activated = true;

        $cookies.set('me', cookies, '1d');
      } catch (e) {
        console.error(e);
        throw e;
      }
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
