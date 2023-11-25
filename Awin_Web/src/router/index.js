import { createRouter, createWebHistory } from 'vue-router'
import WelcomPage from '../views/WelcomPage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomPage
    },
    {
      path: '/research',
      name: 'research',
      component: () => import('../views/ResearchPage.vue')
    },
    {
      path: '/professors',
      name: 'professors',
      component: () => import('../views/ProfessorPage.vue')
    },
    {
      path: '/members',
      name: 'members',
      component: () => import('../views/MemberPage.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue')
    },
  ]
})

export default router
