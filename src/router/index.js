
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../pages/index.vue"),
    },
    {
      path: "/ambulance",
      name: "Ambulance",
      component: () => import("../pages/ambulance.vue"),
    },
  ],
});

export default router
