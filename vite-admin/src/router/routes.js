import layout from '@/layout/user/index.vue'
import admin from '@/layout/admin/index.vue'

export default [
    {
        path:'/admin',
        component: admin,
        children: [
            {
                path:'home',
                component: ()=>import("@/page/home/index.vue")
            },
            {
                path: 'roll',
                component: () => import("@/page/roll/index.vue")
            },
            {
                path: 'platform',
                component: () => import("@/page/platform/index.vue")
            },
            {
                path: 'brand',
                component: () => import("@/page/brand/index.vue")
            },
            {
                path: 'merchant',
                component: () => import("@/page/merchant/index.vue")
            },
            {
                path: 'user',
                component: () => import("@/page/user/index.vue")
            },
            {
                path: 'applay',
                component: () => import("@/page/applay/index.vue")
            },
            {
                path: 'announcement',
                component: () => import("@/page/announcement/index.vue")
            },
            {
                path: '/admin',
                redirect: '/admin/home'
            }
        ]
    },
    {
        path: '/user',
        component: layout,
        children: [
            {
                path: 'home',
                component: () => import('@/views/home/index.vue')
            },
            {
                path: 'product',
                component: () => import('@/views/product/index.vue')
            },
            {
                path: 'order',
                component: () => import('@/views/order/index.vue')
            },
            {
                path: 'person',
                component: () => import('@/views/person/index.vue')
            },
            {
                path: '/user',
                redirect: 'user/home'
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: { show: false },
        children: [
            {
                path: 'code',
                component: () => import('@/views/login/code/index.vue')
            }, {
                path: 'account',
                component: () => import('@/views/login/account/index.vue')
            },
            {
                path: '/login',
                redirect: '/login/code'
            }
        ]
    },
     {
        path:'*',
        redirect:'/login'
     }
]