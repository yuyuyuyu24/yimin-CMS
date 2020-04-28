import config from '../utils/common'
import { post } from '../utils/axios'

// 登录接口
export async function login(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 获取admin信息
export async function getAdminDetail(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 修改admin头像

export async function editAdminHead(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 修改admin背景图

export async function editAdminBg(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 修改admin商家自述

export async function editAdminWord(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 修改admin联系电话1

export async function editAdminPhoneOne(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 修改admin联系电话2

export async function editAdminPhoneTwo(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 更改营业状态
export async function changeBusiness(api, data) {
  return post(`${config.api}/${api}`, data)
}
