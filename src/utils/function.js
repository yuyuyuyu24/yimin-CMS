export function setCookie(name, value, esp) {
  var exp = new Date()
  exp.setTime(exp.getTime() + esp * 24 * 60 * 60 * 1000 * 365)
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
