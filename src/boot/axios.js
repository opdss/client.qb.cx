import Vue from 'vue'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.API,
  timeout: 30000
})

Vue.prototype.$axios = axiosInstance

// 这里我们定义一个命名的导出，
// 然后我们后面可以使用这个内部的.js文件:
export { axiosInstance }
