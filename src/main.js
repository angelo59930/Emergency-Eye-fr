import { createApp } from "vue";

import PrimeVue from "primevue/config";
import App from "./App.vue";
import Button from "primevue/button";

//in main.js
import "primevue/resources/themes/aura-light-green/theme.css";

const app = createApp(App);
app.mount("#app");
app.use(PrimeVue);
app.use(Button);