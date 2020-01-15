<template><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" @click="click" :width="width" :height="height" preserveAspectRatio="xMinYMin" class="jam jam-chevrons-square-down"><path :fill="fillColor" d='M4 0h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm6 10.958l2.121-2.121a1 1 0 0 1 1.415 1.414l-2.829 2.828a1 1 0 0 1-1.414 0l-2.829-2.828a1 1 0 0 1 1.415-1.414L10 12.957zm0-5l2.121-2.121a1 1 0 0 1 1.415 1.414l-2.829 2.828a1 1 0 0 1-1.414 0L6.464 7.251A1 1 0 1 1 7.88 5.837L10 7.957z' /></svg></template><script type="text/ecmascript-6">
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
