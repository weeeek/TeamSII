<template>
  <div class="block">
    <range-slider class="slider" min="0" max="1" step="0.1" v-model="sliderValue"></range-slider>
    {{sliderValue}}
  </div>
</template>

<script>
import RangeSlider from "vue-range-slider";
// you probably need to import built-in style
import "vue-range-slider/dist/vue-range-slider.css";

export default {
  data() {
    return {
      sliderValue: 0.5
    };
  },
  components: {
    RangeSlider
  }
};
</script>

<style lang="stylus">
.slider {
  /* overwrite slider styles */
  width: 200px;
}
</style>