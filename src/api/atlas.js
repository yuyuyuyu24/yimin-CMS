import config from '../utils/common'
import { get, post } from '../utils/axios'

// 获取全部图集
export async function getAtlas(api, data) {
  return get(`${config.api}/${api}`, data)
}

// 获取商品详情
export async function getAtlasDetail(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 创建图集
export async function newAtlas(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 编辑商品
export async function upAtlasData(api, data) {
  return post(`${config.api}/${api}`, data)
}
