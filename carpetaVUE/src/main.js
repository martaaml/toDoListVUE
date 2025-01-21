//import './assets/main.css';

import { VueFire, VueFireAuth } from 'vuefire'
import { createApp } from 'vue'
import App from './App.vue'
import { firebaseApp } from '../firebase'
import { createWebHistory, createRouter } from 'vue-router'

import landing from './components/landing.vue'
import recordatorios from './components/recordatorios.vue'
import login from './components/login.vue'
import registro from './components/registro.vue'

const routes = [
  { path: '/', component: landing, meta: { requiresAuth: false } },
  {path: '/login', component: login, meta: { requiresAuth: false }},
  {path: '/registro', component: registro, meta: { requiresAuth: false }},
  { path: '/recordatorios', component:  recordatorios, meta: { requiresAuth: true }}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
})
app.use(router)
app.mount('#app')