<template>
    <svg @click="click" xmlns="http://www.w3.org/2000/svg" viewBox="-7 -1.5 24 24" :width="this.width" :height="this.height" preserveAspectRatio="xMinYMin" class="jam jam-music-f">
        <path :fill="this.fillColor" d='M7.954 12.87V1.564a1 1 0 0 1 1-1h.028a1 1 0 0 1 1 1V15.63c.197 1.969-1.42 3.99-3.874 4.693-2.69.772-5.368-.333-5.98-2.468-.612-2.135 1.073-4.491 3.764-5.263 1.47-.421 2.935-.283 4.062.277z' />
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
