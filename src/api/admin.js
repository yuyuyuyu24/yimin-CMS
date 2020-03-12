import config from '../utils/common'
import axios from 'axios'

// 登录接口
export async function login(api, data) {
  return axios.post(`${config.api}/${api}`, data)
}

// 获取admin信息
export async function getAdminDetail(api, data) {
  return axios.post(`${config.api}/${api}`, data)
}

// 修改admin头像

export async function editAdminHead(api, data) {
  return axios.post(`${config.api}/${api}`, data)
}

// 修改admin背景图

export async function editAdminBg(api, data) {
  return axios.post(`${config.api}/${api}`, data)
}

// 修改admin商家自述

export async function editAdminWord(api, data) {
  return axios.post(`${config.api}/${api}`, data)
}

// 修改admin联系电话1

export async function editAdminPhoneOne(api, data) {
  return axios.post(`${config.api}/${api}`, data)
}

// 修改admin联系电话2

export async function editAdminPhoneTwo(api, data) {
  return axios.post(`${config.api}/${api}`, data)
}
