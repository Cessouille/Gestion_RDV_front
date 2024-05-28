import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ConversationView from '../views/ConversationView.vue'
import HistoriqueView from '../views/HistoriqueView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/conversation',
      name: 'conversation',
      component: ConversationView
    },
    {
      path: '/historique',
      name: 'historique',
      component: HistoriqueView
    }
  ]
})

export default router
