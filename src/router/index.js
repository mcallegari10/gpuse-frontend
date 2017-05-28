import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Dashboard from '@/components/Dashboard'
import auth from '../auth'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/dashboard'
    }, {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    }, {
      path: '/signUp',
      name: 'signUp',
      component: SignUp,
      meta: {
        requiresAuth: false
      }
    }, {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const toRequiresAuth = to.matched.some((record) => {
    return record.meta.requiresAuth
  })

  if (toRequiresAuth) {
    if (!auth.isLoggedIn()) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else if (auth.isLoggedIn()) {
    next({ path: '/dashboard' })
  } else {
    next()
  }
})

export default router
