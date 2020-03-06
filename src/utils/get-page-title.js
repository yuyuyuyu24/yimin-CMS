import defaultSettings from '@/settings'

const title = defaultSettings.title || '清真伊民肉业后台管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
