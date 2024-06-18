import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ToastPlugin from 'vue-toast-notification';
import VueCookies from 'vue-cookies'

import App from './App.vue';
import router from './router';
import './index.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ToastPlugin);
app.use(VueCookies);

app.mount('#app');
