export default {
  // api: 'http://localhost:3000/api',
  // 公告状态
  NOTICE_STATUS: {
    NOTICE_STATUS_USEING: '1',
    NOTICE_STATUS_STOP: '2',
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
  }
}
