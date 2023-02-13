import request from '@/utils/request'

// 获取首页信息
export const reqGetInfo = () => request({ url: '/home/init', method: 'get' })

// 推荐产品信息
export const reqRecommend = () => request({ url:'/home/recommend',method: 'get'})

// 搜索商品
export const reqSearch = (data)=>request({url:'/search/list',method:"post",data})

// 商品详情
export const reqDetail = (id) => request({ url: `/detail/${id}`, method: "get"})

// 注册验证码
export const reqGetCode = (account) => request({ url: `/user/sendCode?account=${account}`, method: 'get' })

// 注册
export const reqUserRegister = (data) => request({ url: '/user/register', method: 'post', data })

// 账号登录
export const reqUserAccountLogin = (data) => request({ url: 'user/login', method: 'post', data })

// 自动登录
export const reqUserAuthLogin = () => request({ url: 'user/authLogin', method: 'get' })

// 退出登录
export const reqLogout = () => request({ url: '/user/logout', method: "get" })

// 用户信息
export const reqUserInfo = () => request({ url: 'user/userInfo', method: 'get' })

// 获取用户所有地址信息
export const reqUserAddress = ()=>request({url:'/user/userAddress',method:'get'})

// 获取用户地址信息
export const reqUserAddressInfo = (id) => request({ url: `/user/userAddressInfo/${id}`, method: 'get' })

// 更新地址信息
export const reqUpdateUserAddressInfo = (data) => request({ url: '/user/updateAddress', method: 'post', data })

// 删除地址信息
export const reqDeleteUserAddressInfo = (id) => request({ url: `/user/deleteAddress/${id}`, method: 'get'})

// 收藏
export const reqInsertCollect = (id) => request({ url: `/detail/insertCollect/${id}`, method: 'get' })

// 取消收藏
export const reqDeleteCollect = (id) => request({ url: `/detail/deleteCollect/${id}`, method: 'get' })

// 获取用户收藏
export const reqSelectCollect = () => request({url:'/collect/info',method:"get"})

// 添加购物车
export const reqInsertCart = (data)=>request({url:'/cart/insert',method: 'post',data})

// 查看购物车
export const reqSelectCart = () => request({url:'cart/info',method: 'get'})

// 更改商品选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

// 全选、反选
export const reqUpdateAllCheck = (state) => request({url:`/cart/all/${state}`,method:'get'})

// 修改购物车产品数量
export const reqUpdateShopCart = (skuId, skuNum) => request({ url: `/cart/updateCart/${skuId}/${skuNum}`, method: 'get' })

// 删除购物车选中的全部商品商品
export const reqDeleteShoopCarts = () => request({ url: `/cart/deleteCarts`, method: 'delete' })

// 订单信息
export const reqGetPayInfo = () => request({ url: '/pay/info', method: 'get' })

// 存储订单
export const reqInsertOrder = (data) => request({ url: '/order/insert',method: 'post',data})

// 获取订单信息
export const reqSelectOrder = ()=> request({url:'/order/info',method: 'get'});

// 更新订单信息
export const reqUpdateState = (id,state)=>request({url:`/order/state/${id}/${state}`})

// 评价商品
export const reqInsertOrderRate = (data) => request({url:'/order/orderRate',method:'post',data})