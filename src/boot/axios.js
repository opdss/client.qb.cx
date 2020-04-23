import Vue from 'vue'
import axios from 'axios'
import { errorMsg } from 'src/libs/utils'

const axiosInstance = axios.create({
  baseURL: process.env.API,
  timeout: 30000
})

// 自定义的 axios 响应拦截器
axiosInstance.interceptors.response.use((response) => {
  if (response.data.errCode !== 0) {
    errorMsg(response.data.errMsg)
    return Promise.reject(response)
  }
  return response
}, (error) => {
  console.log(error.response)
  const status = error.response.status
  switch (status) {
    // 如果响应中的 http code 为 401，那么则此用户可能 token 失效了之类的，我会触发 logout 方法，清除本地的数据并将用户重定向至登录页面
    case 401:
      errorMsg('用户未登陆')
      break
    case 403:
      errorMsg('用户未授权访问')
      break
    // return this.$store.dispatch('logout')
    // 如果响应中的 http code 为 400，那么就弹出一条错误提示给用户
    case 400:
      errorMsg('客户端异常，重新打开看看')
      break
    case 500:
      errorMsg('网络好像出现点问题，稍后再试试')
      break
  }
  return Promise.reject(error)
})

Vue.prototype.$axios = axiosInstance

// 这里我们定义一个命名的导出，
// 然后我们后面可以使用这个内部的.js文件:
export { axiosInstance }
