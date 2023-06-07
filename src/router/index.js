import Vue from 'vue'
import VueRouter from 'vue-router'
import UserView from '../views/UserView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: UserView
    }
  ]
})

export default router
