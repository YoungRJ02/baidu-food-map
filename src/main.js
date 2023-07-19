import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import BaiduMap from "vue-baidu-map-3x"
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
app.use(router)
app.use(Antd)
app.use(BaiduMap, {
    // ak: 'GRWD17zy6nGRtoApKI2qIqOCxFCCkAK0'
    ak: 'AtGLP0EjU2Gk8HK4KSeD8aDSSL41MWAe'
})
app.mount('#app')
