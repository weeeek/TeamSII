import jsonp from 'common/js/jsonp'

export function getAlbumSongList (albummid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg'

  const data = Object.assign({}, {
    albummid: albummid,
    g_tk: '5381',
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: '0',
    platform: 'yqq.json',
    needNewCode: 0
  })

  return jsonp(url, data)
}
