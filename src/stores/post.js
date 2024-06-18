import { defineStore } from 'pinia';
import { useUserStore } from '@/stores/user';

export const usePostStore = defineStore('post', {
  state: () => {
    return {
      posts: [],
      connectedUser: useUserStore().me
    }
  },
  actions: {
    async getPosts() {
      try {
        this.posts = [{
          name: "Jean MALADE",
          datePubli: new Date("2024/05/27"),
          content: "Je suis malade et j’ai mal au ventre mais mon cousin ma proposer des huiles essentiels. Que faire ?",
          nbLike: 50,
          liked: true,
        }];
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async addPost(post) {
      try {
        this.posts.push({
          name: $cookies.get('userName'),
          datePubli: new Date(),
          content: post,
          nbLike: 0,
          liked: false,
        });

        this.posts.sort((a, b) => new Date(b.datePubli) - new Date(a.datePubli));
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  },
});
