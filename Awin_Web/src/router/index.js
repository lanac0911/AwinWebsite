import { createRouter, createWebHistory } from 'vue-router'
import WelcomPage from '../views/WelcomPage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import NewWelcome from '../views/NewWelcome.vue'
import Welcome from '../views/Welcome.vue'
import { auth } from '../firebase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
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
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

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
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && auth.currentUser) {
    next('/')
    return
  }

  if (to.matched.some((record) => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return
  }

  next()
})

export default router
