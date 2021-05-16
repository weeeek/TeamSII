import { server } from 'config/common'
import axios from 'axios'

export function getpianoNotes() {
  return axios.get(`${server}pianoNotes.json`).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getPianoSongFallList() {
  return axios.get(`${server}pianoSongData.json?r=${Math.random() * 10000000000000000}`).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getSongNoteFall(fileName) {
  return axios.get(`${server}SongNoteFall/${fileName}.json?r=${Math.random() * 10000000000000000}`).then(res => {
    return Promise.resolve(res.data)
  })
}