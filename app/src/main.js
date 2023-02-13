import Vue from 'vue'
import App from './App.vue'

// 全局组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
import Product from '@/components/Product'
Vue.component(Product.name, Product)
import Recommend from '@/components/recommend'
Vue.component(Recommend.name, Recommend)


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入路由
import router from '@/router/index'

import Vant from 'vant'
import 'vant/lib/index.less'

// 引入swiper样式
import "swiper/css/swiper.min.css";

// 引入表单校验插件
import '@/utils/validate'

Vue.use(Vant)

// 注册全局API接口
import * as API from '@/api'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router
}).$mount('#app')
