import config from '../utils/common'
import axios from 'axios'

// 获取七牛云token
export async function qiniutoken(api, data) {
  return axios.post(`${config.api}/${api}`, data)
}

// 上传至七牛云
export async function qiniuUpload(api, data, callback) {
  return axios.post(api, data, {
    onUploadProgress: progressEvent => {
      let complete = progressEvent.loaded / progressEvent.total * 100 | 0
      callback(complete)
    }
  })
}
