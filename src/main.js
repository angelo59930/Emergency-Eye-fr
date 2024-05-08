import { createApp } from "vue";

import PrimeVue from "primevue/config";
import App from "./App.vue";

//in main.js
import "primevue/resources/themes/aura-light-green/theme.css";

const app = createApp(App);
app.use(PrimeVue);
