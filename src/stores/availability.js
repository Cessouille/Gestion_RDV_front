import { defineStore } from 'pinia';
import { useApiClient } from '../composables/apiClient';

const api = useApiClient();

export const useAvailabilityStore = defineStore('availability', {
    state: () => {
        return {
            availabilities: null,
            availability: null
        }
    },
    actions: {
        async fetchAvailabilities(idOffice) {
            try {
                const response = await api.get(`/Availabilities/GetByOfficeId/${idOffice}`);

                this.availabilities = response
                    .filter(availability => !availability.reserve)
                    .map(availability => {
                        const startDate = new Date(availability.startDate);
                        const endDate = new Date(availability.endDate);

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
                            ...availability,
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
        async getAvailability(id) {
            try {
                const data = await api.get(`/Availabilities/GetByAvailabilityId/${id}`);
                this.availability = {
                    id: data.availabilityId,
                    startDate: data.startDate,
                    endDate: data.endDate,
                }
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async reserveAvailability(id) {
            try {
                const response = await api.put(`/Availabilities/${id}?reserve=true`);
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async unreserveAvailability(id) {
            try {
                const response = await api.put(`/Availabilities/${id}?reserve=false`);
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async add(availability) {
            try {
                await api.post('/Availabilities', {
                    body: availability,
                });
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async deleteAvailability(id) {
            try {
                await api.delete(`/Availabilities/${id}`);
            } catch (e) {
                console.error(e);
                throw e;
            }
        }
    },
});