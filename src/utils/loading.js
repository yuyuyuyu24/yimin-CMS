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

export function message(type, message) {
  return Message({
    showClose: true,
    message: message || '服务错误！请记录出现问题的页面以及引发问题的操作，并联系开发人员。',
    type: type || 'warning',
    duration: 5000
  })
}
