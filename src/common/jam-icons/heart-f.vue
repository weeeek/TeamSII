<template><svg @click="click" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -4 24 24" :width="width" :height="height" preserveAspectRatio="xMinYMin" class="jam jam-heart-f"><path :fill="fillColor" d='M9.293 1.55l.707.708.707-.707a5 5 0 1 1 7.071 7.071l-7.07 7.071a1 1 0 0 1-1.415 0L2.222 8.622a5 5 0 1 1 7.07-7.071z' /></svg></template>

<script type="text/ecmascript-6">
export default {
    props: {
        fillColor: {
            type: String,
            default: '#000000'
        },
        width: {
            type: Number,
            default: 24
        },
        height: {
            type: Number,
            default: 24
        }
    },
    methods: {
        click(){
            this.$emit('click')
        }
    }
}
</script>
