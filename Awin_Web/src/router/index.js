import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import NewWelcome from '../views/NewWelcome.vue'
import { auth } from '../firebase'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Welcome,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/research',
      name: 'research',
      component: () => import('../views/ResearchPage.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/professors',
      name: 'professors',
      component: () => import('../views/ProfessorPage.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/members',
      name: 'members',
      component: () => import('../views/MemberPage.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactPage.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: {
        requiresAuth: true
      },
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
    {
      path: '/newwelcome',
      name: 'newwelcome',
      component: NewWelcome,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && auth.currentUser) {
    console.log("dashboard")
    next('/dashboard')
    return
  }

  if (to.matched.some((record) => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return
  }

  next()
})

export default router
