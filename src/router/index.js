import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/index.vue')
  },
  {
    path: '/ambulances',
    name: 'Ambulances',
    component: () => import('@/pages/ambulance.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login.vue')
  },
  {
    path: '/patients',
    name: 'Patients',
    component: () => import('@/pages/patient.vue')
  },
  {
    path: '/transfers',
    name: 'Transfers',
    component: () => import('@/pages/travel.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/pages/settings.vue')
  },
  {
    path: '/personnel',
    name: 'Personnel',
    component: () => import('@/pages/user.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
