<template>
  <div>
    <input type="checkbox" :id="`input${id}`" class="offscreen" :checked="status" @change="change" />
    <label
      :for="`input${id}`"
      class="switch"
      :class="`switch-${theme}`"
      :onText="onText"
      :off-text="offText"
    ></label>
  </div>
</template>

<script type="text/ecmascript-6">
import uuid from 'uuid'
export default {
  name: "Switcher",
  props: {
    onText: {
      type: String,
      default: "On",
    },
    offText: {
      type: String,
      default: "Off",
    },
    theme: {
      type: String,
      default: "success",
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
        id: uuid().split('-')[0]
    };
  },
  methods: {
    change() {
      this.$emit("update:status", !this.status);
    },
  },
};
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  transition: all 0.3s;

  &::after {
    content: attr(off-text);
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

input[type='checkbox'] {
  display: none;
}

input[type='checkbox']:checked {
  & + .switch::after {
    left: 11px;
    transform: translateX(20px);
    content: attr(onText);
    text-indent: -20px;
    font-size: 12px;
    line-height: 18px;
    color: #FFF;
  }

  & + .switch {
    &.switch-success {
      background-color: #a9cc29;
    }

    &.switch-info {
      background-color: #91cdeb;
    }

    &.switch-danger {
      background-color: #ff2471;
    }

    &.switch-warning {
      background-color: #f39800;
    }

    &.switch-sup {
      background-color: #ffd700;
    }
  }
}

.offscreen {
  position: absolute;
}
</style>

