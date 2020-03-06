import config from '../utils/common'
import axios from 'axios'

// 获取全部公告
export async function getNotice(api, data) {
  return axios.get(`${config.api}/${api}`, data)
}

// 更新公告数据
export async function updateNotice(api, data) {
  return axios.post(`${config.api}/${api}`, data)
}

// 停用公告
export async function lowerNotice(api, data) {
  return axios.post(`${config.api}/${api}`, data)
}

// 使用公告
export async function upperNotice(api, data) {
  return axios.post(`${config.api}/${api}`, data)
}
