import config from '../utils/common'
import axios from 'axios'

// 获取全部用户
export async function getUsers(api, data) {
  return axios.get(`${config.api}/${api}`, data)
}

// 分页获取用户
export async function pageGetUser(api, data) {
  return axios.post(`${config.api}/${api}`, data)
}

// 根据条件查询订单
export async function queryUser(api, data) {
  return axios.post(`${config.api}/${api}`, data)
}

// 更改用户状态
export async function changeUserStatus(api, data) {
  return axios.post(`${config.api}/${api}`, data)
}
