<template>
    <svg @click="click" xmlns="http://www.w3.org/2000/svg" viewBox="-4 -3 24 24" width="24" height="24" preserveAspectRatio="xMinYMin" class="jam jam-pause">
        <path :fill="this.fillColor" d='M2 0h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v14h2V2H2zm10-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v14h2V2h-2z' />
    </svg>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        fillColor: {
            type: String,
            default: '#000000'
        }
    },
    methods: {
        click(){
            this.$emit('click')
        }
    }
}
</script>