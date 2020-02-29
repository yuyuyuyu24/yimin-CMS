export default {
  // 肉的类型
  MEAT_TYPE: {
    MEAT_TYPE_CATTLE: 'M',
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
