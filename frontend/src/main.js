import { createApp } from 'vue';
// import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia'; //imported from pinia after installation
import router from './router/index.js'; //imported router from index.js inside of router folder
import "toastify-js/src/toastify.css";



// using pinia by use(createPinia())
// using router by use(router)
createApp(App).use(createPinia()).use(router).mount('#app');