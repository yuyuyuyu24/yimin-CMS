import config from '../utils/common'
import { get, post } from '../utils/axios'

// 获取全部轮播图
export async function getSwiper(api, data) {
  return get(`${config.api}/${api}`, data)
}

// 创建轮播图
export async function newSwiper(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 删除轮播图
export async function delSwiper(api, data) {
  return post(`${config.api}/${api}`, data)
}
