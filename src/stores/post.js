import { defineStore } from 'pinia';
import { useApiClient } from '../composables/apiClient';

const api = useApiClient();

export const usePostStore = defineStore('post', {
  state: () => {
    return {
      posts: null,
      post: null,
    }
  },
  actions: {
    async fetchPosts() {
      try {
        const data = await api.get('/Posts');

        this.posts = data.map(post => ({
          id: post.postId,
          name: `${post.user.firstName} ${post.user.lastName.toUpperCase()}`,
          datePubli: post.date,
          content: post.text,
          nbLike: post.nbLike,
          liked: false,
          nbReplies: post.totalReplies,
          replies: post.childPosts.map(reply => ({
            id: reply.postId,
            name: `${reply.user.firstName} ${reply.user.lastName.toUpperCase()}`,
            datePubli: reply.date,
            content: reply.text,
          })),
        }));
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async fetchPost(id) {
      try {
        const data = await api.get(`/Posts/${id}`);

        this.post = {
          id: data.postId,
          name: `${data.user.firstName} ${data.user.lastName.toUpperCase()}`,
          datePubli: data.date,
          content: data.text,
          nbLike: data.nbLike,
          liked: false,
          nbReplies: data.childPosts.length,
          replies: data.childPosts.map(reply => ({
            id: reply.postId,
            name: `${reply.user.firstName} ${reply.user.lastName.toUpperCase()}`,
            datePubli: reply.date,
            content: reply.text,
          })),
        };
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async add(post) {
      try {
        await api.post('/Posts', {
          body: {
            text: post,
            date: new Date(),
            type: "text",
            userId: $cookies.get('me').id,
            parentPostId: null,
          }
        })
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async addResponse(reply, postId) {
      try {
        await api.post('/Posts', {
          body: {
            text: reply,
            date: new Date(),
            type: "text",
            userId: $cookies.get('me').id,
            parentPostId: postId,
          }
        })
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  },
});
