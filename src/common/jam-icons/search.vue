<template>
    <svg @click="click" xmlns="http://www.w3.org/2000/svg" viewBox="-2.5 -2.5 24 24" :width="this.width" :height="this.height" preserveAspectRatio="xMinYMin" class="jam jam-search">
        <path :fill="this.fillColor" d='M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zm6.32-1.094l3.58 3.58a1 1 0 1 1-1.415 1.413l-3.58-3.58a8 8 0 1 1 1.414-1.414z'/>
    </svg>
</template>

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
