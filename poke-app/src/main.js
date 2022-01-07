import { createApp } from 'vue';
import router from './lib/router';
import store from './lib/store';

import './assets/index.css'

const app = createApp({});
app.use(router);
app.use(store);
app.mount('#app');
