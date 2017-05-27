import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/signUp',
      name: 'signUp',
      component: SignUp
    }, {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    }
  ]
})
