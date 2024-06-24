import { defineStore } from 'pinia';
import { useApiClient } from '../composables/apiClient';
import { useAvailabilityStore } from './availability';
import dayjs from 'dayjs';

const api = useApiClient();



export const useAppointementStore = defineStore('appointement', {
    state: () => {
        return {
            appointement: null,
            appointements: [],
            histo: null,
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
        async fetchHistorique(id) {
            try {
                const data = await api.get(`/RendezVous/getPassedRendezVousByUserId/${id}`);

                this.histo = data.map(appointment => ({
                    id: appointment.rendezVousId,
                    name: `${appointment.office.user.firstName} ${appointment.office.user.lastName.toUpperCase()}`,
                    description: appointment.description,
                    startDate: appointment.startDate,
                    endDate: appointment.endDate,
                    price: appointment.prix,
                }));
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async downloadDiagnosisPdf(id) {
            try {
                const response = await api.get(`/Diagnoses/generate-pdf/${id}`, {
                    responseType: 'blob',
                });

                const blob = new Blob([response.data], { type: 'application/pdf' });

                const link = document.createElement('a');

                const url = URL.createObjectURL(blob);

                link.href = url;
                link.download = 'Prescrption_8.pdf';

                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);

                URL.revokeObjectURL(url);
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
                        availabilityId: rdv.availabilityId,
                        userId: rdv.userId,
                        officeId: rdv.officeId
                    }
                });

                const user = await api.get(`/Users/${rdv.userId}`);

                await api.post('/Email', {
                    body: {
                        to: user.email,
                        subject: 'Confirmation rendez-vous',
                        body: `Votre rendez-vous pour le ${dayjs(availabilityStore.availability.startDate).format('DD/MM/YYYY')} est confirmé.<br><br>
                        Motif : ${rdv.description}.`,
                    }
                });
            } catch (e) {
                console.error(e);
                throw e;
            }
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