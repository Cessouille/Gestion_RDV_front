import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ToastPlugin from 'vue-toast-notification';
import VueCookies from 'vue-cookies';

import App from './App.vue';
import router from './router';
import './index.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const app = createApp(App);

dayjs.extend(customParseFormat);
dayjs.locale('fr');

app.use(createPinia());
app.use(router);
app.use(ToastPlugin);
app.use(VueCookies);

app.mount('#app');
