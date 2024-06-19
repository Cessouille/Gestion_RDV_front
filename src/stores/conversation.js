import { defineStore } from 'pinia';
import { useApiClient } from '../composables/apiClient';

const api = useApiClient();

export const useConversationStore = defineStore('conversation', {
    state: () => {
        return { conversations: [] }
    },
    actions: {
        async fetchConversations() {
            try {
                this.conversations = await api.get('/Conversations');
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async fetchUserConversations(userid) {
            try {
                var result = await api.get('/Conversations/user/' + userid);
                this.conversations = result.value;
            } catch (e) {
                console.error(e);
                throw e;
            }
        }
    },
});