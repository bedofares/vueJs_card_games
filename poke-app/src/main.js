import {createApp} from 'vue';
import router from './lib/router';
import store from './lib/store';
import './assets/index.css'

import Notifications from '@kyvg/vue3-notification'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
};
//import Toaster from 'v-toaster'
//import 'v-toaster/dist/v-toaster.css'
//import VueSimpleAlert from "vue-simple-alert";

const app = createApp({});
app.use(router);
app.use(router);
app.use(store);
app.use(Notifications)
app.use(VueSweetalert2,options)
//app.use(VueSimpleAlert);

//app.use(Toaster);
app.mount('#app');

const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");



btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    });



