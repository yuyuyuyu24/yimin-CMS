import config from '../utils/common'
import { post } from '../utils/axios'

// 获取七牛云token
export async function qiniutoken(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 上传至七牛云
export async function qiniuUpload(api, data, callback) {
  return post(api, data, {
    onUploadProgress: progressEvent => {
      let complete = progressEvent.loaded / progressEvent.total * 100 | 0
      callback(complete)
    }
  })
}

