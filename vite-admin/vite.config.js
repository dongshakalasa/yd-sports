import { defineConfig } from 'vite' // 动态配置函数
import { createVuePlugin } from 'vite-plugin-vue2'

export default () =>
    defineConfig({
        plugins: [createVuePlugin()],
        server: {
            open: true, //自动打开浏览器
            port: 1567, //端口号
            proxy: {
                '/api': {    //只要有api就走这
                    target: 'http://localhost:81',    //目标地址
                    changeOrigin: true,    //是否开启跨域
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        },
        resolve: {
            // 别名
            alias: [
                {
                    find: '@',
                    replacement: '/src'
                }
            ]
        }
    })