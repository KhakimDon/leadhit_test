import { createRouter, createWebHistory } from 'vue-router'
import Analytics from '../views/Analytics.vue'
import Auth from '../views/Auth.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Analytics',
      component: Analytics
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    }
  ]
})

export default router
