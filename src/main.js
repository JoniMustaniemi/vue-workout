import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import router from "./router";
import "quasar/dist/quasar.css";
import "@quasar/extras/material-icons/material-icons.css";

const app = createApp(App);

app.use(Quasar);
app.use(router);

app.mount("#app");
