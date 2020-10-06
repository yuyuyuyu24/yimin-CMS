import axios from 'axios'
import { getCookie } from './function'
import { message } from './loading'
import { removeToken, removeUserName } from './auth'
import router from '../router/index'

axios.defaults.baseURL = ''

axios.interceptors.request.use(config => { // 配置axios请求头，axios每次发起请求携带token，在Network中的headers看的到
  let tokenObj = {
    token: getCookie('token'),
    userName: getCookie('userName')
  }
  config.headers.Authorization = JSON.stringify(tokenObj) // Authorization  是请求头要求加上的字段
  return config
})

// 请求返回拦截，把数据返回到页面之前做些什么...
axios.interceptors.response.use((response) => {
  if (response.data.code === -2) {
    message('error', '非法登录，请重新登录！')
    removeToken()
    removeUserName()
    router.push('/')
  } else if (response.data.code === -3) {
    message('error', '登录失效，请重新登录！')
    removeToken()
    removeUserName()
    router.push('/')
  } else if (response.data.code === -4) {
    message('error', '登录过期，请重新登录！')
    removeToken()
    removeUserName()
    router.push('/')
  } else if (response.data.code === 0) {
    return Promise.resolve(response)
  } else if (response.data.code === -1) {
    message('error', response.data.message)
  } else {
    return Promise.resolve(response)
  }
}, function (error) {
  return Promise.reject(error)
})

export default axios

export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      message('error', '网络出现问题，请刷新后重试！')
      reject(err.data)
    })
  })
}

export function post (url, params, config = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, config)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        message('error', '网络出现问题，请刷新后重试！')
        reject(err)
      })
  })
}
