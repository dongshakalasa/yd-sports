// 引入路由组件
import Home from '@/view/Home'
import Cart from '@/view/Cart'
import Personal from '@/view/personal'
import Search from '@/view/Search'
import AccountSet from '@/view/AccountSet'
import Address from '@/view/Address'
import Login from '@/view/Login'
import Register from '@/view/Register'
import Detail from '@/view/Detail'
import AddressSet from '@/view/AddressSet'
import Pay from '@/view/Pay'
import Order from '@/view/Order'
import OrderRate from '@/view/OrderRate'
import Sales from '@/view/Sales'
import Rate from '@/view/Rate'
import Collect from '@/view/Collect'
// 子组件

export default [
    {
        path: '/collect',
        component: Collect,
        meta: { show: false }
    },
    {
        path: '/rate',
        component: Rate,
        meta: { show: false }
    },
    {
        path: '/sales',
        component: Sales,
        meta: { show: false }
    },
    {
        path: '/orderrate',
        component: OrderRate,
        meta: { show: false }
    },
    {
        path: '/order',
        component: Order,
        meta: { show: false }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: false }
    },
    {
        name:'addressset',
        path: '/addressset/:id',
        component: AddressSet,
        meta: { show: false }
    },
    {
        name:'detail',
        path: '/detail/:id',
        component: Detail,
        meta: { show: false },
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    {
        path:'/address',
        component: Address,
        meta: { show: false}
    },
    {
        path: '/search/:keyword?',
        component: Search,
        name:'search',
        meta: { show: false }
    },
    {
        path: '/home',
        component: Home,
        meta:{show:true}
    },
    {
        path: '/cart',
        component: Cart,
        meta: { show: true }
    },
    {
        path: '/personal',
        component: Personal,
        meta: { show: true }
    },
    {
        path: '/accountset',
        component: AccountSet,
        meta: { show: false}
    },
    {
        path: '/*',
        redirect: '/home'
    }

]