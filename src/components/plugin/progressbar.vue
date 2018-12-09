<template>
    <div class="progress-outer">
        <div class="progress" :class="{'progress-striped active': animate}">
            <div class="progress-bar" :class="type && 'progress-bar-' + type" role="progressbar" :aria-valuenow="value" :aria-valuemin="0" :aria-valuemax="max" :style="{width: (percent < 100 ? percent : 100) + '%'}">{{valueText}}</div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props:{
            value:{
                type:Number,
                required:true
            },
            max:{
                type:Number,
                default:100
            },
            type:{
                type:String,
                default:'info'
            },
            animate:{
                type:Boolean,
                default:false
            }
        },
        computed:{
            percent () {                
                return parseFloat(this.value * 100 / this.max);
            },
            valueText () {
                return this.percent + '%'
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@keyframes progress-bar-strips
    0%
        background-position 40px 0    
    100%
        background-position 0 0
.progress-bra-info
    background-color #5bc0de
.progress-bra-success
    background-color #5cb85c
.progress-bra-danger
    background-color #ec971f
.progress-bra-warning
    background-color #f0ade4
.progress
    height 20px    
    width 100%
    margin-bottom 10px
    float left
    overflow hidden
    border-radius 4px
    -webkit-box-shadow inset 0 1px 2px rgba(0,0,0,.1)
    box-shadow inset 0 1px 2px rgba(0,0,0,.1)
    .progress-bar
        min-width 5em
        height 100%
        font-size 12px
        line-height 20px
        color #FFF
        text-align center
        border-radius 4px
        -webkit-box-shadow inset 0 -1px 0 rgba(0,0,0,.15)
        box-shadow inset 0 -1px 0 rgba(0,0,0,.15)
        -webkit-transiton width .6s ease-in-out
        -o-transiton width .6s ease-in-out        
        transiton width .6s ease-in-out
        .progress-striped
            background-image linear-gradient(45deg,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)
            background-size 40px 40px
    .active
        .progress-bar{
            -webkit-animation progress-bar-strips 2s ease-in-out infinite
            -o-animation progress-bar-strips 2s ease-in-out infinite
            animation progress-bar-strips 2s ease-in-out infinite 
        }
</style>