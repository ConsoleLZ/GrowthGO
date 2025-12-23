import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import './style.css'
import Pixelium from '@pixelium/web-vue'
import '@pixelium/web-vue/dist/pixelium-vue.css'
// Import the font [optional]
import '@pixelium/web-vue/dist/font.css'
// Import the normalize [optional]
import '@pixelium/web-vue/dist/normalize.css'

const app = createApp(App);
app.use(router);
app.use(Pixelium);
app.mount('#app');
