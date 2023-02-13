// 引入axios
import axios from "axios"
import { getToken } from '@/utils/token'
import { Toast } from 'vant';

//1、利用axios对象的create方法，创建一个axios的实例
//2、service就是配置后的axios
const service = axios.create({
    // 配置对象
    baseURL: '/api', // 基础路径，在发送请求的时候，路径当中会出现api
    timeout: 5000    // 请求超时的时间5s
})
// 3、请求拦截器
service.interceptors.request.use((config) => {
    // config：配置对象，对象里面有一个属性很重要，headers请求头
    const token = getToken("TOKEN")
    if (token != null) {
        config.headers.token = getToken("TOKEN");
    }
    return config;
})

// 4、响应拦截器
service.interceptors.response.use((res) => {
    // 成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到
    return res.data;
}, (error) => {
    // 响应失败的回调函数
    Toast.fail('服务器响应失败！');
    return Promise.reject(new Error('faile'))
})

// 5、对外暴露
export default service;