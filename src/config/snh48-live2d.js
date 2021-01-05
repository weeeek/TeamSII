import { server } from 'config/common'
import axios from 'axios'

export function getLive2dCofnig () {
  return axios.get(`${server}snh48-live2d.json?r=${Math.random() * 10000000000000000}`).then((res) => {
    return res.data
  })
}
