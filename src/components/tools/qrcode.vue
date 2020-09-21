<template>
  <div class="block">
    <div style="width: 180px; height: 180px; display: inline-block;">
      <QrCode code="http://47.97.248.244/static/images/TeamSIIApp.png" icon="http://47.97.248.244/static/images/s-icon-80.jpg"></QrCode>
    </div>
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
