import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import router from "./router";
import "quasar/dist/quasar.css";
import "@quasar/extras/material-icons/material-icons.css";
import Vue3TouchEvents from "vue3-touch-events";

const app = createApp(App);
app.use(Vue3TouchEvents);

app.use(Quasar, {
  config: {
    brand: {
      primary: "#0000004d",
    },
  },
});

app.use(router);
app.mount("#app");

router.beforeEach((to, from, next) => {
  if (to.path === "/" && from.path !== "/") {
    backPressedOnce = false; // Reset back button flag if navigating to home
  }
  next();
});
