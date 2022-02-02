import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Desktop from '../views/Desktop.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Desktop',
    component: Desktop
  },
  {
    path: '/blockchain',
    name: 'Blockchain',
    component: () => import('../views/Blockchain.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
