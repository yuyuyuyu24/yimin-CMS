export default {
  api: 'https://api.ymry.xyz:3000/api',
  // api: 'https://localhost:3000/api',
  // 这是七牛云空间的外链默认域名
  QI_NIU_UPLOAD: 'http://www.ymry.xyz',
  // 七牛云的上传地址，根据自己所在地区选择，我这里是华南区
  QI_NIU_DIMAIN: 'https://up-z1.qiniup.com',
  // 公告状态
  NOTICE_STATUS: {
    NOTICE_STATUS_USEING: 1,
    NOTICE_STATUS_STOP: 2,
    NOTICE_STATUS_FUN: function(val) {
      const arr = {}
      arr[this.NOTICE_STATUS_USEING] = '使用中'
      arr[this.NOTICE_STATUS_STOP] = '停用'
      if (val && arr[val]) {
        return arr[val]
      } else {
        return arr
      }
    }
  },
  // 公告类型
  NOTICE_TYPE: {
    NOTICE_TYPE_ALERT: '1',
    NOTICE_TYPE_PAGE: '2',
    NOTICE_TYPE_STATUS: function(val) {
      const arr = {}
      arr[this.NOTICE_TYPE_ALERT] = '弹窗公告'
      arr[this.NOTICE_TYPE_PAGE] = '首页公告'
      if (val && arr[val]) {
        return arr[val]
      } else {
        return arr
      }
    }
  },
  // 肉的类型
  MEAT_TYPE: {
    MEAT_TYPE_CATTLE: 'B',
    MEAT_TYPE_SHEEP: 'S',
    MEAT_TYPE_CHICKEN: 'C',
    MEAT_TYPE_OTHER: 'O',
    MEAT_TYPE_STATUS: function(val) {
      const arr = {}
      arr[this.MEAT_TYPE_CATTLE] = '牛肉'
      arr[this.MEAT_TYPE_SHEEP] = '羊肉'
      arr[this.MEAT_TYPE_CHICKEN] = '鸡产品'
      arr[this.MEAT_TYPE_OTHER] = '其他'
      if (val && arr[val]) {
        return arr[val]
      } else {
        return arr
      }
    }
  },
  // 商品状态
  GOODS_STATUS: {
    GOODS_STATUS_NROMAL: 1,
    GOODS_STATUS_SOLDOUT: 2,
    GOODS_STATUS_LOWERSHELF: 3,
    GOODS_STATUS_FUN: function(val) {
      const arr = {}
      arr[this.GOODS_STATUS_NROMAL] = '正常'
      arr[this.GOODS_STATUS_SOLDOUT] = '已售罄'
      arr[this.GOODS_STATUS_LOWERSHELF] = '已下架'
      if (val && arr[val]) {
        return arr[val]
      } else {
        return arr
      }
    }
  },
  // 配送方式
  DELIVERY_TYPE: {
    DELIVERY_TYPE_DELIVERY: 'delivery',
    DELIVERY_TYPE_SELF: 'self',
    DELIVERY_TYPE_FUN: function(val) {
      const arr = {}
      arr[this.DELIVERY_TYPE_DELIVERY] = '配送'
      arr[this.DELIVERY_TYPE_SELF] = '自提'
      if (val && arr[val]) {
        return arr[val]
      } else {
        return arr
      }
    }
  },
  //  订单状态
  ORDER_STATUS: {
    ORDER_STATUS_DZF: '1',
    ORDER_STATUS_YZFDFH: '2',
    ORDER_STATUS_YWC: '3',
    ORDER_STATUS_YGB: '4',
    ORDER_STATUS_FUN: function(val) {
      const arr = {}
      arr[this.ORDER_STATUS_DZF] = '待支付'
      arr[this.ORDER_STATUS_YZFDFH] = '已支付待发货'
      arr[this.ORDER_STATUS_YWC] = '已完成'
      arr[this.ORDER_STATUS_YGB] = '已关闭'
      if (val && arr[val]) {
        return arr[val]
      } else {
        return arr
      }
    }
  },
  //  用户状态
  USER_STATUS: {
    USER_STATUS_ZC: '1',
    USER_STATUS_JY: '2',
    USER_STATUS_FUN: function(val) {
      const arr = {}
      arr[this.USER_STATUS_ZC] = '正常'
      arr[this.USER_STATUS_JY] = '禁用'
      if (val && arr[val]) {
        return arr[val]
      } else {
        return arr
      }
    }
  },
  //  评论状态
  COMMENT_STATUS: {
    COMMENT_STATUS_ZC: '1',
    COMMENT_STATUS_SC: '2',
    COMMENT_STATUS_FUN: function(val) {
      const arr = {}
      arr[this.COMMENT_STATUS_ZC] = '正常'
      arr[this.COMMENT_STATUS_SC] = '已删除'
      if (val && arr[val]) {
        return arr[val]
      } else {
        return arr
      }
    }
  },
  ENCODE(id) {
    return id * 24
  },
  UNENCODE(id) {
    return id / 24
  }
}
