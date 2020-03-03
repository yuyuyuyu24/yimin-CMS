import qs from 'qs'
import request from '../utils/request'
// import config from '../utils/common'

// 获取全部商品
export async function getGoods(data = {}) {
  return request({
    method: 'get',
    url: `/api/goods/getGoods`,
    data: qs.stringify(data)
  })
}
