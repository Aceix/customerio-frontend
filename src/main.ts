import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueApexCharts from 'vue3-apexcharts'

const app = createApp(App)

app.use(router)
app.use(Toast, {
  hideProgressBar: true,
  draggable: false,
})
app.use(VueApexCharts);

app.mount('#app')
