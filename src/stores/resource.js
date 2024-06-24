import { defineStore } from 'pinia';
import { useApiClient } from '../composables/apiClient';

const api = useApiClient();

export const useResourceStore = defineStore('resource', {
    state: () => {
        return {
            resources: null,
        }
    },
    actions: {
        async fetchResources(id) {
            const data = await api.get(`/OfficeEquipments/${id}`);

            this.resources = data.map(equipment => ({
                id: equipment.equipmentId,
                officeId: equipment.officeId,
                name: equipment.equipment.name,
                state: equipment.etat,
                lastUpdate: equipment.lastUpdate,
                nextUpdate: equipment.futureUpdate,
            }));
        },
        async add(resource) {
            try {
                await api.post('/OfficeEquipments', {
                    body: resource,
                });
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async update(resource) {
            try {
                await api.put(`/OfficeEquipments/${resource.equipmentId}/${$cookies.get('me').officeId}`, {
                    body: resource,
                });
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async delete(id) {
            try {
                await api.delete(`/OfficeEquipments/${id}/${$cookies.get('me').officeId}`);
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
    },
});