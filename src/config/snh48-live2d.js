import { server } from 'config/common'
import axios from 'axios'

export function live2dCofnig () {
  return axios.get(`${server}live2dCofnig.json`).then((res) => {
    return res.data
  })
}
