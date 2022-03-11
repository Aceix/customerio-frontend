import * as VueRouter from "vue-router";

const routes: any = [
  {
    path: "/",
    component: () => import("./views/Customers.vue"),
  },
  {
    path: "/customers/:id",
    component: () => import("./views/Customer.vue"),
    props: true,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export default router;
