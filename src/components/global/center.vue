<template>
  <div class="center-block flex flex-column">
    <div class="center-column flex">
      <slot class="center-slot"></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
.center-block
    height 100%
    width 100%
    .center-column
    &:before
    &:after
        content ''
        flex-grow 1
        .center-slot
        &:before
        &:after
            content ''
            flex-grow 1
</style>
