import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import router from "./router/router";
import "quasar/dist/quasar.css";
import "@quasar/extras/material-icons/material-icons.css";
import Vue3TouchEvents from "vue3-touch-events";
import { initBackButtonListener } from "./utils/utils";

initBackButtonListener();

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
