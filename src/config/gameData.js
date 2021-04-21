import { server } from 'config/common'
import axios from 'axios'

export function getpianoNotes () {
  return axios.get(`${server}pianoNotes.json`).then((res) => {
    return Promise.resolve(res.data)
  })
}
