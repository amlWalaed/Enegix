import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

app.use(router).use(autoAnimatePlugin).use(VueQueryPlugin)
app.mount('#app')
