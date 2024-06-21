import { defineStore } from 'pinia';
import { useApiClient } from '../composables/apiClient';
import { useAvailabilityStore } from './availability';

const api = useApiClient();



export const useAppointementStore = defineStore('appointement', {
    state: () => {
        return { 
            appointement: null
        }
    },
    actions: {
        async createAppointement(rdv) {

            const availabilityStore = useAvailabilityStore();
            availabilityStore.getAvailability(rdv.availabilityId);

            try {
                await api.post('/RendezVous', {
                  body: {
                    startDate: availabilityStore.availability.startDate,
                    endDate: availabilityStore.availability.endDate,
                    description: rdv.description,
                    prix: rdv.price,
                    fichierJoint: null,
                    userId: 1,
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