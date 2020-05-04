<template>
  <div class="block-check" :class="{'active': status}">
    <input
      ref="ckb"
      type="checkbox"
      :id="`check-${id}`"
      class="offscreen"
    />
    <label :for="`check-${id}`" class="check" :class="theme" @click="switchChange()">{{ text }}</label>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'BlockCheck',
  props: {
    id: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'check-default'
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    switchChange () {
      console.log('1', !this.status)
      this.$emit('update:status', !this.status)
      this.$nextTick(() => {
        this.$emit('statusChange')
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.block-check {
  display: inline-block;

  input[type=checkbox] {
    display: none;
  }

  .check {
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
    transition: all 0.3s;

    &::after {
      position: absolute;
      width: 18px;
      height: 18px;
      border-radius: 18px;
      background-color: white;
      top: 1px;
      left: 1px;
      transition: all 0.3s;
      text-indent: 22px;
      font-size: 12px;
      line-height: 18px;
      color: white;
    }
  }

  .check-default {
    background-color: #fff;
    border-color: #ccc;
    color: #333;

    &:hover {
      background-color: #e6e6e6;
      border-color: #adadad;
    }
  }

  .check-info {
    color: #fff;
    background-color: #5bc0de;
    border-color: #46b8da;

    &:hover {
      font-weight: bolder;
      background-color: #31b0d5;
      border-color: #269abc;
    }
  }
}

input[type='checkbox']:checked {
  & + .check::after {
    left: 11px;
    transform: translateX(20px);
    text-indent: -20px;
    font-size: 12px;
    line-height: 18px;
    color: #FFF;
  }
}

.active .check {
  background-color: #87cdeb;
  color: rgba(255,255,255,1)
  font-weight: bold
  text-shadow: 0 0 5px black
}

.offscreen {
  position: absolute;
}
</style>

