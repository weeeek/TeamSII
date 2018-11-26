import getJson from 'common/js/yahooapis'
import {weiboConfig} from './config'

export function getPhotos (fn, count = 30, page = 1) {
  const url = 'http://photo.weibo.com/photos/get_all'
  const data = Object.assign(weiboConfig, {
    count: count,
    page: page
  })
  return getJson(url, data, fn)
}
