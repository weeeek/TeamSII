import { server } from 'config/common'
import axios from 'axios'

export const getFilmData = () => {
  return axios.get(`${server}filmData.json?r=${Math.random() * 10000000000000000}`).then((res) => {
    return Promise.resolve(res.data)
  })
}
