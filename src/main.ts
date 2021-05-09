import {createApp} from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios';
import BalmUI from 'balm-ui'
import BalmUIPlus from 'balm-ui-plus'
import 'balm-ui-css'
import {key, store} from "./store";

const app = createApp(App)
app.use(VueAxios, axios)
app.use(BalmUI)
app.use(BalmUIPlus)

app.use(store, key)
app.mount('#app')
