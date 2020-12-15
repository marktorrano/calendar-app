import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/styles.css'
import './assets/css/tailwind.css'
import router from './router'
import mitt from 'mitt'
const emitter = mitt();

let app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(router);
app.mount('#app');
