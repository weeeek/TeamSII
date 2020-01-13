<template><svg @click="click" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" :width="width" :height="height" preserveAspectRatio="xMinYMin" class="jam jam-close-circle"><path :fill="fillColor" d='M11.414 10l2.829 2.828a1 1 0 0 1-1.415 1.415L10 11.414l-2.828 2.829a1 1 0 1 1-1.415-1.415L8.586 10 5.757 7.172a1 1 0 0 1 1.415-1.415L10 8.586l2.828-2.829a1 1 0 0 1 1.415 1.415L11.414 10zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z' /></svg></template>
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
