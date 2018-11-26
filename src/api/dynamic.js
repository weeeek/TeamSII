import getJson from 'common/js/yahooapis'
import {bilibiliConfig} from 'api/config'

export function getDynamic (fn) {
  const url = 'https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history'
  const data = Object.assign({}, {
    visitor_uid: 0,
    host_uid: bilibiliConfig.TeamSII,
    offset_dynamic_id: 0
  })
  return getJson(url, data, fn)
}
