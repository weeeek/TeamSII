import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

export function getOrimuse (orimuse, fn) {
  const url = debug ? '/api/orimuse' : ''

  return axios.get(url, {
    headers: {
      referer: 'http://www.orimuse.com',
      host: 'www.orimuse.com'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
    // status: 10 预售
    // status: 20 结束
  })
}
