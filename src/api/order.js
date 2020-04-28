import config from '../utils/common'
import { get, post } from '../utils/axios'

// 获取全部订单
export async function getAllOrder(api) {
  return get(`${config.api}/${api}`)
}

// 分页获取订单
export async function pageGetOrder(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 根据商品id批量查询数据
export async function batchQuery(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 根据条件查询订单
export async function queryOrders(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 根据条件查询订单
export async function changeOrderStatus(api, data) {
  return post(`${config.api}/${api}`, data)
}
