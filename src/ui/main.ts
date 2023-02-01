import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Router from "@providers/router";
import Store from "@providers/store";

import Button from "primevue/button";
import Card from "primevue/card";
import AutoComplete from "primevue/autocomplete";

const app = createApp(App);

app.use(Router);
app.use(Store);
app.use(PrimeVue);

app.component("p-button", Button);
app.component("p-card", Card);
app.component("p-auto-complete", AutoComplete);

app.mount("#app");
