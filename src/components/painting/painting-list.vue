<template>
  <div>
    <div class="block">欢迎投稿，投稿请<a class="link" href="https://weibo.com/u/5266139275">@SNH48 TeamSII应援会</a></div>
    <div class="waterfall">
      <!-- <div v-for="(item) in photos" :key="item.photo_id">
        <a :href="`http://photo.weibo.com/${item.uid}/photos/detail/photo_id/${item.photo_id}/album_id/${item.alubum_id}`" target="_blank">
          <div class="img-content" :style="`background:url(${item.pic_host}/small/${item.pic_name})`"></div>
          <div class="photo-date">{{ item.timestamp | formatDate }}</div>
        </a>
      </div> -->
      <a :href="getWeibo(item.weibo)" target="_blank" class="fallitem" v-for="(item) in photos" :key="item.url" :title="getAuthor(item.author)">
        <!-- <div class="img-content-sm" :style="`background:url(${item.url})`"></div> -->
        <img :src="item.url"/>
        <!-- <div class="fallcover" v-if="item.author.length > 0">
          <div class="img-author text-ellipsis">{{ item.author }}</div>
        </div> -->
      </a>
    </div>
  </div>
</template>

<script type="ecmascript-6">
  // import {formatDate} from 'common/js/date'
  import {paintingConfig} from 'api/config'

  export default {
    data () {
      return {
        photos: paintingConfig.list
      }
    },
    methods: {
      getAuthor (author) {
        return author ? '作者：' + author : ''
      },
      getWeibo (weibo) {
        return weibo || 'javascript:void(0)'
      }
    }
  }
</script>

<style scoped>

</style>
