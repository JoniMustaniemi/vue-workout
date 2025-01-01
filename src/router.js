import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/Login.vue";
import Dashboard from "./views/Dashboard.vue";
import Page2 from "./views/Page2.vue";
import Page3 from "./views/Page3.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/dashboard", component: Dashboard },
  { path: "/page2", component: Page2 },
  { path: "/page3", component: Page3 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
