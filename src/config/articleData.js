import { server } from 'config/common'
import axios from 'axios'

export function getArticleData () {
  return axios.get(`${server}articleData.json?r=${Math.random() * 10000000000000000}`).then((res) => {
    return Promise.resolve(res.data)
  })
}
