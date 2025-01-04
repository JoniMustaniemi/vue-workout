import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Training from "../views/Training.vue";
import Development from "../views/Development.vue";
import Diet from "../views/Diet.vue";
import Calendar from "../views/Calendar.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/dashboard", component: Dashboard },
  { path: "/training", component: Training },
  { path: "/development", component: Development },
  { path: "/diet", component: Diet },
  { path: "/calendar", component: Calendar },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
