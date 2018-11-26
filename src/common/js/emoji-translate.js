export function emojiTranslate (str) {
  function contains () {
    if (str.includes('[微笑]')) {
      str = str.replace('[微笑]', `<img src="//s1.hdslb.com/bfs/seed/bplus-common/emoji-assets/xiaodianshi1/weixiao.png" style="display: inline-block; width: 19px; height: 19px; vertical-align: text-bottom;">`)
      return true
    } else {
      return false
    }
  }

  while (contains(str)) { }
  return str
}
