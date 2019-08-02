import { server } from 'config/common'
import axios from 'axios'

export function live2dCofnig () {
  return axios.get(`${server}live2dCofnig.json?r=${Math.random() * 10000000000000000}`).then((res) => {
    return res.data
  })
}
