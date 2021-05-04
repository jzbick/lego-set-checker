import {createApp} from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import AutoComplete from "primevue/autocomplete";
import 'primeflex/primeflex.css'

const app = createApp(App)
app.use(PrimeVue)
app.component(AutoComplete.name, AutoComplete)
app.mount('#app')
