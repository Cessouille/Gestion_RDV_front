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
                var result = await api.get('/Messages/messages/' + convId + '/' + userid);
                this.messages = result;
                this.msgError = null;
                return;
            } catch (e) {
                console.error(e);
                this.msgError = e;
                throw e;
            }
        },
        async fetchPaginatedMessages(userid, convId, page, time = null) {
            try {
                var result = await api.get('/Messages/messagesPaged/' + convId + '/' + userid + '/?pageIndex=' + page + '&pageSize=10' + (time ? ('&beforeDate=' + time) : ''));
                if(time) {
                    this.messages = result;
                } else {
                    this.messages = result.reverse();
                }
                this.msgError = null;
                return;
            } catch (e) {
                console.error(e);
                this.msgError = e;
                throw e;
            }
        },
        async fetchNewMessages(userid, convId, time) {
            try {
                var result = await api.get('/Messages/newMessages/' + convId + '/' + userid + '/?since=' + time);
                this.messages = result;
                this.msgError = null;
                return;
            } catch (e) {
                console.error(e);
                this.msgError = e;
                throw e;
            }
        },
        async sendMessage(userid, convId, message) {
            try {
                var result = await api.post('/Messages', {
                    body: {
                        "created": new Date().toISOString(),
                        "text": message,
                        "userId": userid,
                        "conversationId": convId
                    }
                });
                this.messages = result;
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