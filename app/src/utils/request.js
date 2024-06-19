import axios from 'axios'
// import $store from '@/store/index'
// 引入element-ui弹窗
import { Message } from 'element-ui'
 
// export const baseURL = process.env.VUE_APP_SERVER_URL
export const baseURL = '/api'
 
// 创建一个自定的axios方法(比原axios多了个基地址)
// axios函数请求的url地址前面会被拼接基地址, 然后axios请求baseURL+url后台完整地址
const reqAxios = axios.create({
  baseURL: baseURL,
  timeout: 60000
})
 
//  请求拦截的作用-- 使用axios拦截器处理api接口调用时，部分参数重复调用问题
reqAxios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 调用接口时统一为请求头挂载 Authorization 字段
    // if ($store.state.token) {
    //   config.headers.Authorization = $store.state.token
    // }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
 
// 响应拦截 -- 解决token过期问题
reqAxios.interceptors.response.use(
  function (response) { // 成功的回调
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) { // 失败的回调
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response.status === 401) {
      // 无效的 token
      // 把 Vuex 中的 token 重置为空，并跳转到登录页面
 
      // 弹窗提示
      Message.error('用户身份已过期，请重新登录!')
    }
    return Promise.reject(error)
  }
)
 
// 导出自定义的axios方法, 供外面调用传参发请求
export default reqAxios