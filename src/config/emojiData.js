import { server } from 'config/common'
import axios from 'axios'

export function getEmojiData () {
  return axios.get(`${server}emojiData.json`).then((res) => {
    return Promise.resolve(res.data)
  })
}

