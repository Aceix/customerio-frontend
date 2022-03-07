import * as VueRouter from 'vue-router'

const routes: any = [
  { path: '/', component: () => import('./views/Customers.vue') },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
})

export default router
