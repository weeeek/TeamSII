import { server } from 'config/common'
import axios from 'axios'

export function getEmojiData () {
  return axios.get(`${server}emojiData.json?r=${Math.random() * 10000000000000000}`).then((res) => {
    return Promise.resolve(res.data)
  })
}

