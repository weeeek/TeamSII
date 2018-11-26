<template>
  <div class="block">
    <Timeline :timeline-items="timelineItems" :message-when-no-items="messageWhenNoItems" />
  </div>
</template>

<script type="text/ecmascript-6">
import Timeline from 'components/plugin/timeline'
// import '../../../node_modules/timeline-vuejs/dist/timeline-vuejs.css'

export default {
  components: {
    Timeline
  },
  data () {
    return {
      messageWhenNoItems: 'There are not any items',
      timelineItems: [
        {
          year: {
            from: '',
            to: '2018'
          },
          items: [
            {
              nameMonth: '11月17日 19:00',
              title: '《美丽48区》张语格生日公演',
              description: '出席成员：张语格，陈思，袁丹妮.........',
              typeClass: 'dot-blue',
              url: ''
            },
            {
              nameMonth: '11月3日 14:00',
              title: '《美丽48区》公演普通场',
              description: '出席成员：莫寒，孔肖吟，李宇琪，邵雪聪，袁丹妮，徐晨辰，袁雨桢，刘增艳，徐伊人，孙芮，钱蓓婷，温晶婕',
              typeClass: 'dot-blue',
              url: ''
            },
            {
              nameMonth: '11月1日 19:00',
              title: '超新星运动会',
              description: '出席成员：孙芮，李宇琪',
              typeClass: 'dot-red',
              url: 'https://v.qq.com/x/cover/syf5vvuk9e5jup2/v00286kb0w7.html'
            }
          ]
        }
      ]
    }
  }
}
</script>
