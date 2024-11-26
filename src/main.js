// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import "quasar/dist/quasar.css";
import "@quasar/extras/material-icons/material-icons.css";

// Import the router configuration
import router from "./router";

const app = createApp(App);

// Use Quasar and Router
app.use(Quasar);
app.use(router); // Enable routing in the app

app.mount("#app");
