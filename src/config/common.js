export const commonParams = {
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

export const options = {
  param: 'jsonpCallback',
  prefix: 'jp'
}

export const ERR_OK = 0

export const performanceConfig = {
  url: 'http://www.snh48.com/ticketsinfo.php?act=choose'
}

// export const modianApi = 'https://mapi.modian.com/v45/user/build_product_list'
export const modianApi = 'https://me.modian.com/ajax/create_pro_list'

export const yahhoapisBase = 'https://query.yahooapis.com/v1/public/yql'
export const yahhoapisFormate = 'json'

export const bilibiliConfig = {
  TeamSII: '12444300'
}

export const weiboConfig = {
  uid: '5266139275',
  album_id: '4023271615997409'
}

export const musicApi = {
  migu: {
    getPlayInfo: 'http://music.migu.cn/v3/api/music/audioPlayer/getPlayInfo?copyrightId=',
    getLyric: 'http://music.migu.cn/v3/api/music/audioPlayer/getLyric?copyrightId=',
    getSongPic: 'http://music.migu.cn/v3/api/music/audioPlayer/getSongPic?songId=1113500073'
  }
}

export const playMode = {
  sequence: 0,
  loop: false
}
