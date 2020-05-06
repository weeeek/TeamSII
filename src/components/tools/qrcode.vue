<template>
  <div class="block">
      <QrCode code="http://47.97.248.244/static/images/siteQrcode.jpg" icon="http://47.97.248.244/static/images/s-icon-80.jpg"></QrCode>
  </div>
</template>

<script>
import QrCode from 'components/plugin/qrcode'

export default {
  components: {
    QrCode
  }
}
</script>
