// 存储token
export const setToken = (token) => {
    localStorage.setItem('UUTOKEN', token)
}
// 获取token
export const getToken = () => {
    return localStorage.getItem("UUTOKEN")
}
// 清除本地存储的token
export const removeToken = () => {
    localStorage.removeItem("UUTOKEN")
}