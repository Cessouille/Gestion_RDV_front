import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ConversationView from "../views/ConversationView.vue";
import HistoriqueView from "../views/HistoriqueView.vue";
import NotificationView from "../views/NotificationView.vue";
import ProfileView from "../views/ProfileView.vue";
import LoginView from "../views/LoginView.vue";
import FormTest from "../views/FormTest.vue";
import AppointmentView from "../views/AppointmentView.vue";
import UserView from "../views/UserProfileView.vue";
import DoctorsView from "../views/DoctorsView.vue";
import PostView from "../views/PostView.vue";
import AdministrationView from "../views/AdministrationView.vue";
import MailValidationView from "../views/MailValidationView.vue";

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
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/doctor/:id",
      name: "user",
      component: UserView,
    },
    {
      path: "/doctor/:id/appointment",
      name: "appointment",
      component: AppointmentView
    },
    {
      path: "/form",
      name: "form",
      component: FormTest,
    },
    {
      path: "/doctors",
      name: "doctors",
      component: DoctorsView,
    },
    {
      path: "/post/:id",
      name: "post",
      component: PostView,
    },
    {
      path: "/administration",
      name: "administration",
      component: AdministrationView,
    },
    {
      path: "/validation",
      name: "validation",
      component: MailValidationView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const me = $cookies.get('me');

  if (!me && to.path !== '/doctors' && to.name !== 'user' && to.path !== '/login') {
    next({ path: '/doctors' });
  } else {
    next();
  }

  if (me && me.activated === false && to.path !== '/validation' && to.path !== '/login') {
    next({ path: '/validation' });
  } else {
    next();
  }
});

export default router;
