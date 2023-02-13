import request from '@/utils/request'

// 账号登录
export const reqAccountLogin = (data) => request({ url: '/merchant/login/account', method: 'post', data })

// 验证码登录
export const reqCodeLogin = (data) => request({ url: '/merchant/login/code', method: 'post', data })

// 注册验证码
export const reqGetCode = (account) => request({ url: `/merchant/sendCode?account=${account}`, method: 'get' })

// 自动登录
export const reqAuthLogin = () => request({ url: `/merchant/authLogin`, method: 'get' })

// 退出登录
export const reqLogout = () => request({ url: `/merchant/logout`, method: 'get' })

// 查询商家全部商品
export const reqProduct = (page,limit) =>request({url:`/merchant/product/${page}/${limit}`,method:'get'})

// 商品管理
export const reqUpdateProductState = (id, state) => request({ url: `/merchant/product/state/${id}/${state}`,method: 'get' })

// 修改商品
export const reqUpdateProduct = (data) => request({ url: `/merchant/product/update`,method: 'post',data})

// 添加商品
export const reqInsertProduct = (data) => request({ url: `/merchant/product/insert`, method: 'post', data })

// 一级分类
export const reqCategoryName = () => request({ url: '/merchant/product/category', method: 'get' })

// 二级分类
export const reqSort = (name) => request({ url: `/merchant/product/sort/${name}`, method: 'get' })

// 品牌
export const reqBrand = (name)=>request({url:`/merchant/product/brand/${name}`,method: 'get'})

// 平台属性
export const reqAttributeName = ()=>request({url:`/merchant/product/attributeName`,method: 'get'})

// 商家订单
export const reqOrderList = (page,limit,state)=>request({url:`/merchant/order/${page}/${limit}/${state}`,method:'get'})

// 更新订单信息
export const reqUpdateState = (id, state) => request({ url: `/order/state/${id}/${state}` })

// 商家信息
export const reqMerchant = () =>request({url:'/merchant/person/info',method: 'get'})

//system

// brand
export const reqBrandLimt = (page,limit,name) =>request({url:`/admin/system/brand/category/${page}/${limit}/${name}`,method:"get"})

// platform
export const reqPlatformLimt = (page, limit, name) => request({ url: `/admin/system/platform/category/${page}/${limit}/${name}`, method: "get" })
export const reqPlatformDelete = (id) => request({ url:`/admin/system/platform/delete/${id}`,method: 'get'})

// roll
export const reqRollList = () =>request({url:'/admin/system/roll',method:'get'})
export const reqDeleteRoll = (id) => request({ url: `/admin/system/roll/delete/${id}`, method: 'get' })
export const reqInsertRoll = (data) => request({ url: `/admin/system/roll/insert`, method: 'post',data })


// client

// merchant
export const reqMerchantInfo = (page,limit)=>request({url:`/admin/client/merchant/${page}/${limit}`,method:'get'})
//user
export const requserInfo = (page,limit) => request({ url: `/admin/client/user/${page}/${limit}`, method: 'get' })

// business
// merchant
export const reqMerchantApplay = (page, limit) => request({ url: `/admin/business/merchant/${page}/${limit}`, method: 'get' })

export const reqAnnouncement = (page, limit) => request({ url:`/admin/business/announcement/${page}/${limit}`,method:'get'})