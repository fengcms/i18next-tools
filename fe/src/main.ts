import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import hljs from 'highlight.js' //导入代码高亮文件
import 'highlight.js/styles/atom-one-light.css'

import '@/style/style.scss'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.use(vueHljs)
app.directive('highlight', function (el) {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block: any) => {
    hljs.highlightElement(block)
  })
})
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
