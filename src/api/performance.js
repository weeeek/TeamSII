import getJson from 'common/js/yahooapis'
import {performanceConfig} from 'config/common'

export function getPerformance (fn) {
  const url = performanceConfig.url
  const data = Object.assign({}, {
    data: getYearMonth(),
    team: 1
  })
  return getJson(url, data, fn)
}

export function getYearMonth () {
  let now = new Date()
  return now.getFullYear() + `-` + (now.getMonth() + 1)
}
