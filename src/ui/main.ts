import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Router from "@providers/router";
import Store from "@providers/store";

import Button from "primevue/button";
import Card from "primevue/card";
import AutoComplete from "primevue/autocomplete";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import FileUpload from "primevue/fileupload";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

const app = createApp(App);

app.use(Router);
app.use(Store);
app.use(PrimeVue);
app.use(ToastService);

app.component("p-button", Button);
app.component("p-card", Card);
app.component("p-auto-complete", AutoComplete);
app.component("p-dialog", Dialog);
app.component("p-input-text", InputText);
app.component("p-file-upload", FileUpload);
app.component("p-toast", Toast);

app.mount("#app");
