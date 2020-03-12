import querystring from 'querystring'

export function setCookie(name, value, esp) {
  var exp = new Date()
  exp.setTime(exp.getTime() + esp * 24 * 60 * 60 * 1000)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
}

export function getCookie(name) {
  var aCookie = document.cookie.split('; ')
  for (var i = 0; i < aCookie.length; i++) {
    var aCrumb = aCookie[i].split('=')
    if (name === aCrumb[0]) {
      return unescape(aCrumb[1])
    }
  }
  return null
}

export function delCookie(name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
}

// 把数据库中的string格式的数组转成数组 商品管理
export function changeQuerystring(data) {
  for (let i = 0; i < data.length; i++) {
    data[i].coverList = querystring.parse(data[i].coverList)
    data[i].swiperList = data[i].swiperList.substr(1).substring(0, data[i].swiperList.length - 1)
    data[i].swiperList = data[i].swiperList.split(',')
    let swiperList = []
    for (let j = 0; j < data[i].swiperList.length; j++) {
      swiperList.push(querystring.parse(data[i].swiperList[j]))
    }
    data[i].swiperList = swiperList
    let videoList = []
    if (data.videoList === '') {
      data.videoList = []
    } else {
      videoList.push(querystring.parse(data.videoList))
      data.videoList = videoList
    }
    return data
  }
}

// 把数据库中的string格式的数组转成数组  商品详情
export function changeQuerystringDetail(data) {
  let coverList = []
  coverList.push(querystring.parse(data.coverList))
  data.coverList = coverList

  data.swiperList = data.swiperList.substr(1).substring(0, data.swiperList.length - 1)
  data.swiperList = data.swiperList.split(',')
  let swiperList = []
  for (let j = 0; j < data.swiperList.length; j++) {
    swiperList.push(querystring.parse(data.swiperList[j]))
  }
  data.swiperList = swiperList

  let videoList = []
  if (data.videoList === '') {
    data.videoList = []
  } else {
    videoList.push(querystring.parse(data.videoList))
    data.videoList = videoList
  }
  return data
}

// 把数据库中的string格式的数组转成数组  编辑图集
export function changeQuerystringEditAtlas(data) {
  data.atlasImgs = data.atlasImgs.substr(1).substring(0, data.atlasImgs.length - 1)
  data.atlasImgs = data.atlasImgs.split(',')
  let atlasImgs = []
  for (let j = 0; j < data.atlasImgs.length; j++) {
    atlasImgs.push(querystring.parse(data.atlasImgs[j]))
  }
  data.atlasImgs = atlasImgs

  return data
}

export function funcChina(str) {
  if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
    return false
  }
  return true
}
