import { defineStore } from 'pinia';
import { useApiClient } from '../composables/apiClient';

const api = useApiClient();

export const useConversationStore = defineStore('conversation', {
    state: () => {
        return { conversations: [], error: null, msgError: null, messages: [] }
    },
    actions: {
        async fetchConversations() {
            try {
                this.conversations = await api.get('/Conversations');
                this.error = null;
            } catch (e) {
                console.error(e);
                this.error = e;
                throw e;
            }
        },
        async fetchConversationMessages(userid, convId) {
            try {
                var result = await api.get('/Messages/message/' + userid + '/' + convId);
                this.messages = result.value;
                this.msgError = null;
                return;
            } catch (e) {
                console.error(e);
                this.msgError = e;
                throw e;
            }
        },
        async fetchUserConversations(userid) {
            try {
                var result = await api.get('/Conversations/user/' + userid);
                this.conversations = result.value;
                this.error = null;
            } catch (e) {
                console.error(e);
                this.error = e;
            }
        }
    },
});