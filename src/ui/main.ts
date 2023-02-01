import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Router from "@providers/router";
import Store from "@providers/store";

import Button from 'primevue/button';
import Card from 'primevue/card';
import AutoComplete from 'primevue/autocomplete';

const app = createApp(App);

app.use(Router);
app.use(Store);
app.use(PrimeVue);

app.component('Button', Button);
app.component('Card', Card)
app.component('AutoComplete', AutoComplete)

app.mount('#app')
