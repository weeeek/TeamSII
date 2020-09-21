<template>
  <div class="global-header">
    <keep-alive>
      <router-link tag="div" class="logo" to="/"></router-link>
    </keep-alive>
    <QrCode
      class="app-qrcode"
      code="http://47.97.248.244/static/images/TeamSIIApp.png"
      icon="http://47.97.248.244/static/images/s-icon-80.jpg"
    ></QrCode>
    <div class="header-container">
      <div class="header-control">
        <h1 class="title">{{ title }}</h1>
        <button
          class="btn-3d"
          onclick="window.open(`https://weibo.com/p/100808ece29cf744f4d14b450f0c12999e767b/super_index`)"
        >微博超级话题</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import QrCode from 'components/plugin/qrcode'
export default {
  components: {
    QrCode
  },
  name: 'GlobalHeader',
  data () {
    return {
      title: 'SNH48 Team SII 资源中心'
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/3dButton';

.global-header {
  position: relative;

  .header-container {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    background-color: white;

    .header-control {
      h1 {
        font-weight: bolder;
      }
    }

    .title {
      width: 100%;
    }
  }

  .logo {
    position: absolute;
    background-image: url('http://47.97.248.244/static/images/flag.jpg');
  }

  .app-qrcode {
    position: absolute;
    background-repeat: no-repeat;

    &[lazy='loaded'] {
      background-size: cover;
    }
  }
}

@media screen and (min-width: 1366px) {
  .global-header {
    height: 220px;

    .header-container {
      height: 110px;

      .header-control {
        width: calc(100% - 220px);
        margin-left: 220px;
        padding: 10px 10px 10px 0;

        h1 {
          font-size: 32px;
        }

        button {
          font-size: 20px;
          line-height: 20px;
          height: 40px;
          margin-top: 6px;
        }
      }
    }

    .logo {
      left: 20px;
      bottom: 20px;
      z-index: 2;
      width: 180px;
      height: 180px;
      border: 3px solid #FFF;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }

    .app-qrcode {
      right: 20px;
      bottom: 20px;
      z-index: 2;
      width: 180px;
      height: 180px;
      border: 3px solid #FFF;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
  }
}

@media screen and (max-width: 1366px) {
  .global-header {
    height: 110px;

    .header-container {
      height: 65px;

      .header-control {
        width: calc(100% - 110px);
        margin-left: 110px;
        padding: 5px 5px 5px 0;

        h1 {
          margin: 4px 0;
          font-size: 16px;
        }

        a {
          margin: 0;
          padding: 0 0.3em;
          line-height: 25px;
        }

        button {
          font-size: 14px;
          line-height: 14px;
          height: 24px;
        }
      }
    }

    .logo {
      left: 10px;
      bottom: 10px;
      z-index: 2;
      background-size: cover;
      width: 90px;
      height: 90px;
      border: 3px solid #FFF;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }

    .app-qrcode {
      right: 10px;
      bottom: 10px;
      z-index: 2;
      background-size: cover;
      width: 90px;
      height: 90px;
      border: 3px solid #FFF;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
  }
}

@media screen and (max-width: 450px) {
  .app-qrcode {
    visibility: hidden;
    display: none;
  }
}

@media screen and (max-width: 320px) {
  .global-header {
    .header-container {
      .header-control {
        h1 {
          margin: 4px 0;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
