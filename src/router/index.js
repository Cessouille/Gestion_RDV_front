import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ConversationView from "../views/ConversationView.vue";
import HistoriqueView from "../views/HistoriqueView.vue";
import NotificationView from "../views/NotificationView.vue";
import ProfileView from "../views/ProfileView.vue";
import LoginView from "../views/LoginView.vue";
import UserView from "../views/UserView.vue";
import AppointmentView from "../views/AppointmentView.vue";
import App from "@/App.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/conversation",
      name: "conversation",
      component: ConversationView,
    },
    {
      path: "/historique",
      name: "historique",
      component: HistoriqueView,
    },
    {
      path: "/notification",
      name: "notification",
      component: NotificationView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/logout",
      name: "logout",
      component: LoginView,
    },
    {
      path: "/user/:id",
      name: "user",
      component: UserView,
    },
    {
      path: "/user/:id/rdv",
      name: "appointment",
      component: AppointmentView
    }
  ],
});

export default router;
