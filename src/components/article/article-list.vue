<template>
  <div id="article-container">
    <div class="block">
      <!-- 欢迎投稿，投稿请<a class="link" href="https://weibo.com/u/5266139275">@SNH48 TeamSII应援会</a>，或者发布于<a class="link" target="_blank" href="https://weibo.com/p/100808ece29cf744f4d14b450f0c12999e767b/super_index">“SNH48 TeamSII”超级话题</a> -->
      文章打开后如遇错误码:100098，请先登录微博
    </div>
    <div class="block">
      <v-collapse-wrapper v-for="a in articleDatas" :key="a.name">
        <div class="header" v-collapse-toggle>
          <span :class="{ member: a.member }">{{ a.name }}</span>
          <a
            target="_blank"
            :href="a.author.link"
            :class="{ member: a.member }"
            >{{ a.author.name }}</a
          >
        </div>
        <div class="content" v-collapse-content>
          <ol>
            <li v-for="(item, i) in a.articles" :key="i">
              <a
                target="_blank"
                :href="item.url"
                @click="MQSend(mqType.article, a.name + item.title)"
                >{{ item.title }}</a
              >
            </li>
            <li v-if="!a.finish">未完待续...</li>
          </ol>
        </div>
      </v-collapse-wrapper>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getArticleData } from "config/articleData";
import { mqMixin } from "common/js/mixin";

export default {
  name: "ArticleList",
  created() {
    getArticleData().then((res) => {
      this.articleDatas = res;
    });
  },
  data() {
    return {
      articleDatas: [],
    };
  },
  mixins: [mqMixin],
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.v-collapse-toggler {
  color: #333;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  color: #fa7d3c;
  cursor: pointer;

  span {
    font-weight: bolder;
  }

  .member {
    color: #87cefa;
  }

  a {
    font-weight: bolder;
    color: #fa7d3c;
    float: right;

    &.member {
      color: #87cefa;
    }
  }

  li {
    list-style: none;
  }
}

.v-collapse-content {
  padding: calc(2em - 26px) 15px;
  border-top: 0 solid #ddd;
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  display: none;
  transition: all 0.6s;
  line-height: 2em;
}

.v-collapse-content-end {
  display: block;
}

@media screen and (min-width: 1024px) {
  #article-container {
    padding-bottom: 15px;
  }

  .v-collapse-toggler {
    padding: 15px;

    span {
      font-size: 20px;
    }

    .member {
      font-size: 20px;
    }

    a {
      font-size: 18px;
    }

    li {
      a {
        font-size: 16px;
      }
    }
  }
}

@media screen and (max-width: 1024px && min-width 550px) {
  #article-container {
    padding-bottom: 10px;
  }

  .v-collapse-toggler {
    padding: 10px;

    span {
      font-size: 18px;
    }

    .member {
      font-size: 18px;
    }

    a {
      font-size: 16px;
    }

    li {
      a {
        font-size: 14px;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  #article-container {
    padding-bottom: 5px;
  }

  .v-collapse-toggler {
    padding: 5px;

    span {
      font-size: 14px;
    }

    .member {
      font-size: 14px;
    }

    a {
      font-size: 12px;
    }

    li {
      a {
        font-size: 10px;
      }
    }
  }
}
</style>
