import {
  Loading,
  Message
} from 'element-ui'

let loading = ''

export function startLoading() {
  loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

export function closeLoading() {
  loading.close()
}

export function message() {
  return Message({
    showClose: true,
    message: '网络出现问题，请稍后再试',
    type: 'error',
    duration: 3000
  })
}
