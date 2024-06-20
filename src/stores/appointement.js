import { defineStore } from 'pinia';
import { useApiClient } from '../composables/apiClient';

const api = useApiClient();

export const useAvailabilityStore = defineStore('availability', {
    state: () => {
        return { availabilities: [] }
    },
    actions: {
        async createAppointement() {
            try {
                const response = await api.post(`/RendezVous`, {
                    startDate: 1,
                    endDate: 1,
                    description: 'gougougaga',
                    fichierJoint: null,
                    userId: 1,
                    officeId: 1,
                });

                return response;
            } catch (e) {
                console.error(e);
                throw e;
            }
        }
    },
});