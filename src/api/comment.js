import config from '../utils/common'
import { get, post } from '../utils/axios'

// 获取全部评论
export async function getComment(api, data) {
  return get(`${config.api}/${api}`, data)
}

// 分页获取评论
export async function pageGetComment(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 根据条件查询评论
export async function queryComment(api, data) {
  return post(`${config.api}/${api}`, data)
}

// 更改评论状态
export async function changeCommentStatus(api, data) {
  return post(`${config.api}/${api}`, data)
}

