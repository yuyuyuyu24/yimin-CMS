import axios from 'axios'
import {
  Loading,
  Message
} from 'element-ui'

let loading = ''

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function closeLoading() {
  loading.close()
}

const service = axios.create({
  withCredentials: true
})

service.interceptors.request.use(config => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  startLoading()
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    closeLoading()
    if (response) {
      return response
    } else {
      return Message({
        type: 'error',
        message: '网路错误，请稍后再试！'
      })
    }
  },
  error => {
    return Promise.reject(error)
  })

export default service
