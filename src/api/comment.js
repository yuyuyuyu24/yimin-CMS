import config from '../utils/common'
import axios from 'axios'

// 获取全部评论
export async function getComment(api, data) {
  return axios.get(`${config.api}/${api}`, data)
}

// 分页获取评论
export async function pageGetComment(api, data) {
  return axios.post(`${config.api}/${api}`, data)
}

// 根据条件查询评论
export async function queryComment(api, data) {
  return axios.post(`${config.api}/${api}`, data)
}

// 更改评论状态
export async function changeCommentStatus(api, data) {
  return axios.post(`${config.api}/${api}`, data)
}

