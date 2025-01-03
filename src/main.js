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

let backPressedOnce = false;

const handleBackButton = () => {
  const currentRoute = router.currentRoute.value;

  if (currentRoute.path === "/") {
    if (backPressedOnce) {
      alert("Exiting app...");
    } else {
      backPressedOnce = true;
      alert("Press back again to exit");
      setTimeout(() => {
        backPressedOnce = false;
      }, 2000);
    }
  } else {
    router.back();
  }
};

window.addEventListener("popstate", handleBackButton);

window.onbeforeunload = () => {
  window.removeEventListener("popstate", handleBackButton);
};
