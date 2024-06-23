import { defineStore } from 'pinia';
import { useApiClient } from '../composables/apiClient';
import { useUserStore } from '@/stores/user';

const api = useApiClient();

export const useDoctorStore = defineStore('doctor', {
    state: () => {
        return {
            doctors: null,
            doctor: null,
            reviews: null,
            userStore: useUserStore(),
        }
    },
    actions: {
        async fetchDoctors() {
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

                this.doctors = [];

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
                    subscribed: null,
                    nbSub: data.nbSub,
                    socials: data.socials.map(social => ({
                        name: social.platform,
                        link: social.url,
                    })),
                };

                if (this.userStore.isAuthentificated) {
                    this.doctor.subscribed = await api.get(`/Subscriptions/${$cookies.get("me").id}/${id}`);
                }
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async getDoctorUserId(id) {
            try {
                const data = await api.get(`/Offices/${id}`);
                return data.user.userId;
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async fetchReviews(id) {
            const data = await api.get(`/Reviews/${id}`);

            this.reviews = data.map(review => ({
                id: review.reviewId,
                name: `${review.rendezVous.user.firstName} ${review.rendezVous.user.lastName.toUpperCase()}`,
                datePubli: review.date,
                content: review.description,
                rate: review.note,
                thumbed: null,
            }));

            if (this.userStore.isAuthentificated) {
                this.reviews.forEach(async review => review.thumbed = await this.isThumbed(review.id));
            }
        },
        async isThumbed(id) {
            try {
                return await api.get(`LikeReviews/IsLiked/${$cookies.get('me').id}/${id}`);
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async thumbUpReview(id) {
            try {
                await api.post('LikeReviews', {
                    body: {
                        userId: $cookies.get('me').id,
                        reviewId: id,
                        isLiked: true,
                    }
                });
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async thumbDownReview(id) {
            try {
                await api.post('LikeReviews', {
                    body: {
                        userId: $cookies.get('me').id,
                        reviewId: id,
                        isLiked: false,
                    }
                });
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async removeThumbReview(id) {
            try {
                await api.delete(`LikeReviews/${$cookies.get('me').id}/${id}`)
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async subscribe(id) {
            try {
                await api.post('Subscriptions', {
                    body: {
                        userId: $cookies.get('me').id,
                        officeId: id,
                    }
                });
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async unsubscribe(id) {
            try {
                await api.delete(`Subscriptions/${$cookies.get('me').id}/${id}`)
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
    },
});
