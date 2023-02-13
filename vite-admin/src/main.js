import Vue from 'vue'
import App from './App.vue'

// 加载 element 组件库
import ElementUI from 'element-ui'

// 加载 element 组件库的样式
import 'element-ui/lib/theme-chalk/index.css'

// 全局注册 element 组件库
Vue.use(ElementUI)

// 引入表单校验插件
import '@/utils/validate'

import router from '@/router/index.js'

// 注册全局API接口
import * as API from '@/api'

Vue.config.devtools = true;

new Vue({
  router,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
}).$mount('#app')
