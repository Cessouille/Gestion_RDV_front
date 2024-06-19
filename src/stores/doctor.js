import { defineStore } from 'pinia';
import { useApiClient } from '../composables/apiClient';

const api = useApiClient();

export const useDoctorStore = defineStore('doctor', {
    state: () => {
        return {
            doctors: [],
            specificDoctors: [],
            doctor: null,
        }
    },
    actions: {
        async fetchDoctors() {
            this.doctors = [];

            try {
                const data = await api.get('/Offices');

                const dto = data.map(doctor => ({
                    id: doctor.officeId,
                    name: `${doctor.user.firstName} ${doctor.user.lastName.toUpperCase()}`,
                    avatar: doctor.user.avatar ? doctor.user.avatar : '/src/assets/images/avatar.png',
                    metier: doctor.metier,
                    domainePrincipal: doctor.domainePrincipal,
                    description: doctor.description,
                    rating: doctor.rating,
                }));

                const mentalHealth = dto.filter(doctor => doctor.domainePrincipal === 'Santé mentale');
                const physicalHealth = dto.filter(doctor => doctor.domainePrincipal === 'Santé physique');

                this.doctors.push({ name: 'Santé mentale', doctors: mentalHealth }, { name: 'Santé physique', doctors: physicalHealth });
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async fetchDoctor(id) {
            try {
                const data = await api.get(`/Offices/${id}`);

                this.doctor = {
                    id: data.officeId,
                    name: `${data.user.firstName} ${data.user.lastName.toUpperCase()}`,
                    avatar: data.user.avatar ? data.user.avatar : '/src/assets/images/avatar.png',
                    metier: data.metier,
                    domainePrincipal: data.domainePrincipal,
                    description: data.description,
                    prixConsultation: data.prixPCR,
                    telephone: data.telephone,
                    rating: data.rating,
                };
            } catch (e) {
                console.error(e);
                throw e;
            }
        }
    },
});
