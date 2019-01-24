<template>
  <div>
    <div class="block">
      <word-cloud :id="wordsId" :options="wordsOptions"></word-cloud>
      <div class="slogan">{{ slogan }}</div>
    </div>
    <div class="block">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import WordCloud from 'components/plugin/highchart-wordcloud'

  export default {
    name: 'Index',
    components: {
      WordCloud
    },
    data () {
      const text = 'Team SII,Team SII,小品队,社会,模特队,老司机,运动健儿,反应满分,人高马大又很拽,动物园,底气,神魂颠倒,钻石呐喊,我的舞台,无尽旋转,激流之战,化作樱花树,支柱,初日,勇气重生,不眠之夜,梦之河,永恒之光,让梦想闪耀,心的旅程,第48区,Mad World,毒蜘蛛,机尾云,我的存在,战歌,废墟纪元,降落伞,青春的花瓣,马尾与发圈,再爱一回,黑天使,48个秘密,梅洛斯之路,盛夏好声音,新世界,幻,天使的圈套,流着泪微笑,绿光,Mute,开拓者,生命之风,Go away,UZA,好友创可贴,黑白格子裙,mammoth,最后的钟声响起,男友制作秘籍,不想太伟大,初恋小盗,对不起我的宝贝,夜蝶,16人姐妹歌,战役的崛起,冷酷女孩,爱的洄游鱼,期待相遇,暹罗猫,回到那天,睡美人,爱的降临,心型病毒,恋爱禁止条例,傲娇女孩,盛夏的花,遥控器,109,旧球鞋,SNH参上,眼泪深呼吸,必杀技,恋爱中的美人鱼,浪漫单车,天使的尾巴,纯情主义,爱恨的泪,镜中圣女,两年后,生命所谓的意义,Kiss,青春,加油!S队,水手梦,闪耀的你,柠檬的年纪,焕然一新,能做你的女友吗,呜吼吼,再见制服,错过奇迹,王子殿下,献给明天的吻,新的港湾,放手一搏,白色情人节,记忆的拼图,仰望星空,日升日落,新的旅程,雨季之后,遥远的彼岸,不需要浪漫,永不放弃,爱与自尊,Bye Bye Bye,巧克力糖果,青涩的香蕉,记忆迷宫,不曾后悔,森林漫步,亲春闪电,活着真好,爱的毛巾,爱与和平,左右为难,爱情感冒药,时差密码,蒙娜丽莎没有自拍照,地平线,下一站是你,狂欢亚马逊,罗马假日,纽约梦,月光下,潮流冠军,青春号角,破茧,Drop It,Good Time,爱未央,灵魂使者,寒夜,冒险乐园,无尽的世界,天使与恶魔,Burning Up,La La La,虫之诗,自我主张,幸福的压力,樱花书签,爱的幸运曲奇,石头剪刀布,飞翔入手,借口,心电感应,晨光,黑洞,Who is the one,Forever XLVIII,Lost,Hold me tight,解语者,最终回合,无罪无我,Somewhere,噩梦轮回,Restart,预言,彼岸花,重生计划,坐标 121E 31N'
      const test2 = ',正义之手,女王殿下,黑夜女神,钢铁之翼,SPY,巧克力之吻,9 to 9,狼与自尊,就差一点点,My boy,荣誉勋章,梦中的婚礼,Don\'t Touch,Monster,玛丽亚'
      return {
        slogan: '诚挚团结，意志坚定，用汗水浇灌梦想，目标是做好现在的事，We Are The Best Team SII',
        wordsId: 'wordcloud-container',
        wordsOptions: {
          credits: { enabled: false },
          exporting: { enabled: false },
          series: [{
            type: 'wordcloud',
            data: this.initData(text + test2)
          }],
          title: {
            text: ''
          },
          tooltip: {
            enabled: false
          }
        }
      }
    },
    methods: {
      initData (text) {
        return text.split(',').reduce(function (arr, word) {
          var obj = arr.find(function (obj) {
            return obj.name === word
          })
          if (obj) {
            obj.weight += 1
          } else {
            obj = {
              name: word,
              weight: 1
            }
            arr.push(obj)
          }
          return arr
        }, [])
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

#wordcloud-container
  height 400px
  width 100%
  background-color white

.slogan
  text-align center
  font-size 25px
  color #87cefa
  font-family sans-serif
  font-weight 600
</style>
