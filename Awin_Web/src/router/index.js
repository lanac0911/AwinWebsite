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
      component: () => import('../views/ContactPage.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      children: [
        {
          path: '',
          components: {
            'dashboard-view': () => import('../views/Dashboard/Main.vue'),
          },
          name: 'dashboard-default',
        },
        {
          path: 'plan',
          components: {
            'dashboard-view': () => import('../views/Dashboard/Plan.vue'),
          },
          name: 'dashboard-plan',
        },
        {
          path: 'members',
          components: {
            'dashboard-view': () => import('../views/Dashboard/Members.vue'),
          },
          name: 'dashboard-members',
        },
        {
          path: 'professor',
          components: {
            'dashboard-view': () => import('../views/Dashboard/Professor.vue'),
          },
          name: 'dashboard-professor',
        },
        {
          path: ':page',
          components: {
            'dashboard-view': () => import('../views/Dashboard/Main.vue'),
          },
          name: 'dashboard-page',
        },
      ],
    },
    
    // {
    //   path: '/dashboard/:page',
    //   name: 'dashboard',
    //   components: {
    //     // 使用命名視圖 'subview' 來匹配名稱為 'subview' 的 router-view
    //     subview: () => import('../views/Dashboard.vue'),
    //     // 你可以添加其他的命名視圖，每個視圖對應不同的路由
    //     // 例如，'/dashboard/members' 可以有一個不同的組件
    //     members: () => import('../views/Dashboard/Members.vue'),
    //     plan: () => import('../views/Dashboard/Plan.vue'),
    //     // ... 其他視圖 ...
    //   },
    // },
    // {
    //   path: '/dashboard/:page',
    //   name: 'dashboard',
    //   component: () => import('../views/Dashboard.vue')
    // },
    // {
    //   path: '/dashboard/members',
    //   name: 'members',
    //   component: () => import('../views/Dashboard/Members.vue')
    // },
  ]
})

export default router
