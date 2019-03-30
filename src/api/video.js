import getJson from 'common/js/yahooapis'
import {bilibiliConfig} from 'config/common'

export function getVideo (fn, page = 1, pageSize = 20) {
  const url = `https://space.bilibili.com/ajax/member/getSubmitVideos?mid=12444300&pagesize=${pageSize}&page=${page}`
  const data = Object.assign({}, {
    mid: bilibiliConfig.TeamSII,
    page: page,
    pagesize: pageSize
  })
  return getJson(url, data, fn)
}
