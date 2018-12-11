<template>
    <!-- <div class="progress-outer">
        <div class="progress" :class="{'progress-striped active': animate}">
            <div class="progress-bar" :class="type && 'progress-bar-' + type" role="progressbar" :aria-valuenow="value" :aria-valuemin="0" :aria-valuemax="max" :style="{width: (percent < 100 ? percent : 100) + '%'}">{{valueText}}</div>
        </div>
    </div> -->
    <div class="progress" :class="{'progress-striped': animate}" :title="valueText">
        <div class="progress-bar progress-bar-danger" :style="`width: ${calcWidth(25)}%`" v-if="value >= 0"></div>
        <div class="progress-bar progress-bar-warning" :style="`width: ${calcWidth(50)}%`" v-if="value >= 25"></div>
        <div class="progress-bar progress-bar-info" :style="`width: ${calcWidth(75)}%`" v-if="value >= 50"></div>
        <div class="progress-bar progress-bar-success" :style="`width: ${calcWidth(100)}%`" v-if="value >= 75"></div>        
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
            animate:{
                type:Boolean,
                default:true
            }
        },
        methods:{
            calcWidth(step){
                if(this.value >= step)
                    return 25;
                else
                    return parseFloat((this.value - step + 25) * 100 / 100);
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

<style>
    @keyframes progress-bar-stripes{
        0%{
            background-position: 0 0;
        }
        100%{
            background-position: 40px 0;
        }
    }
    .progress-bar-info{
        background-color: #91ccea;
    }
    .progress-bar-success{
        background-color: #5cb85c;
    }
    .progress-bar-danger{
        background-color: #d9534f;
    }
    .progress-bar-warning{
        background-color: #f0ad4e;
    }
</style>

<style scoped lang="stylus" rel="stylesheet/stylus">
.progress
    height: 20px;    
    overflow: hidden;
    background-color: #f5f5f5;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
    box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
    .progress-bar
        float: left;        
        height: 100%;
        font-size: 12px;
        line-height: 20px;
        color: #fff;
        text-align: center;
        -webkit-box-shadow: inset 0 -1px 0 rgba(0,0,0,.15)
        box-shadow: inset 0 -1px 0 rgba(0,0,0,.15)
        -webkit-transiton width .6s ease-in-out
        -o-transiton width .6s ease-in-out        
        transiton width .6s ease-in-out
    &.progress-striped    
        .progress-bar
            background-image: -webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
            background-image: -o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
            background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
            -webkit-background-size: 40px 40px;
            background-size: 40px 40px;
            -webkit-animation: progress-bar-stripes 2s linear infinite;
            -o-animation: progress-bar-stripes 2s linear infinite;
            animation: progress-bar-stripes 2s linear infinite;
</style>