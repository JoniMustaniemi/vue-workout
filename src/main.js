import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import router from "./router";
import "quasar/dist/quasar.css";
import "@quasar/extras/material-icons/material-icons.css";

const app = createApp(App);

app.use(Quasar, {
  config: {
    brand: {
      primary: "#0000004d",
    },
  },
});
app.use(router);

app.mount("#app");
