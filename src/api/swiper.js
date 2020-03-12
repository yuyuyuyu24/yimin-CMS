import config from '../utils/common'
import axios from 'axios'

// 获取全部轮播图
export async function getSwiper(api, data) {
  return axios.get(`${config.api}/${api}`, data)
}

// 创建轮播图
export async function newSwiper(api, data) {
  return axios.post(`${config.api}/${api}`, data)
}

// 删除轮播图
export async function delSwiper(api, data) {
  return axios.post(`${config.api}/${api}`, data)
}
