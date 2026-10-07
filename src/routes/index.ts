//import createRouter, createWebHistory and Type RouteRecordRaw from vue-router
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

// Define route type with explicit type annotations
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/home.vue"),
  },

  // routes products
  {
    path: "/products",
    name: "products",
    component: () =>
      import(/* webpackChunkName: "products" */ "../views/products/index.vue"),
  },
  {
    path: "/products/create",
    name: "products-create",
    component: () =>
      import(
        /* webpackChunkName: "products-create" */ "../views/products/create.vue"
      ),
  },
  {
    path: "/products/edit/:id",
    name: "products-edit",
    component: () =>
      import(
        /* webpackChunkName: "products-edit" */ "../views/products/edit.vue"
      ),
  },

  // routes kategori
  {
    path: "/kategori",
    name: "kategori",
    component: () =>
      import(/* webpackChunkName: "products" */ "../views/kategori/index.vue"),
  },

  {
    path: "/kategori/create",
    name: "kategori-create",
    component: () =>
      import(
        /* webpackChunkName: "products-create" */ "../views/kategori/create.vue"
      ),
  },
  {
    path: "/kategori/edit/:id",
    name: "kategori-edit",
    component: () =>
      import(
        /* webpackChunkName: "products-edit" */ "../views/kategori/edit.vue"
      ),
  },
];

// Create router with explicit type annotations
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
