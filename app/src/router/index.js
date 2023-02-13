// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes.js'

// 使用插件
Vue.use(VueRouter)


// 获取VueRouter原型对象的push
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push|replace
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 对外暴露的VueRouter类的实例
let router = new VueRouter({
    // 配置对象
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // console.log(to);
        // console.log(from);
        // console.log(savedPosition);
        // return { y: 0 }
    }
})

export default router;