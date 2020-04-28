import config from '../utils/common'
import { get, post } from '../utils/axios'

// 获取全部商品
export async function getGoods(api, data) {
  return get(`${config.api}/${api}`, data)
}

// 分页获取商品
export async function pageGetGoods(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 根据条件查询商品
export async function queryGoods(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 下架 || 上架商品
export async function lowerGoods(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 获取商品详情
export async function getGoodsDetail(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 创建商品
export async function newGoods(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 编辑商品
export async function upGoodsData(api, data) {
  return post(`${config.api}/${api}`, data)
}
