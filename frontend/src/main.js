import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia'; //imported from pinia after installation
import router from '@/router'



// using pinia by use(createPinia())
createApp(App).use(createPinia()).use(router).mount('#app');