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
                    const year = date.getFullYear();
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const day = date.getDate().toString().padStart(2, '0');
                    return `${year}-${month}-${day}`;
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
        }
    },
});