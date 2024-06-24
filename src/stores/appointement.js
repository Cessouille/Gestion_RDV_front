import { defineStore } from 'pinia';
import { useApiClient } from '../composables/apiClient';
import { useAvailabilityStore } from './availability';

const api = useApiClient();



export const useAppointementStore = defineStore('appointement', {
    state: () => {
        return { 
            appointement: null,
            appointements: []
        }
    },
    actions: {
        async fetchAppointements(userId) {
          try {
            const response = await api.get(`/RendezVous/getRendezVousByUserId/${userId}`);
            this.appointements = response
                .map(appointement => {
                const startDate = new Date(appointement.startDate);
                const endDate = new Date(appointement.endDate);

                const formatTime = date => {
                    const hours = date.getHours();
                    const minutes = date.getMinutes();
                    return `${hours}:${minutes.toString().padStart(2, '0')}`;
                };
                
                const formatDate = date => {
                    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
                    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
                    const dayOfWeek = days[date.getDay()];
                    const dayOfMonth = date.getDate();
                    const month = months[date.getMonth()];
                    const year = date.getFullYear();
                    return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
                };

                return {
                    ...appointement,
                    startDate: formatDate(startDate),
                    endDate: formatDate(endDate),
                    startTime: formatTime(startDate),
                    endTime: formatTime(endDate)
                };
                });

            } catch (e) {
              console.error(e);
            throw e;
            }
        },
        async createAppointement(rdv) {
            const availabilityStore = useAvailabilityStore();
            await availabilityStore.getAvailability(rdv.availabilityId);
            try {
                await api.post('/RendezVous', {
                  body: {
                    startDate: availabilityStore.availability.startDate,
                    endDate: availabilityStore.availability.endDate,
                    description: rdv.description,
                    prix: rdv.price,
                    fichierJoint: null,
                    userId: rdv.userId,
                    officeId: rdv.officeId
                  }
                })
              } catch (e) {
                console.error(e);
                throw e;
            }
            console.log('YOUPI');
        },
        async deleteAppointement(id) {
            try {
                await api.delete(`/RendezVous/${id}`);
            } catch (e) {
                console.error(e);
                throw e;
            }
        }
    },
});