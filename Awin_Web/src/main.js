import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
