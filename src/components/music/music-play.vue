<template>
    <div>
        <div></div>
        <audio :src="this.src"></audio>
    </div>
</template>

<script type="text/ecmascript-6">
    import {musicApi} from 'api/config'
    export default {
        name: `MusicList`,
        props: {
            copyrightId: {
                type: String,
                default: ""
            },
            songId: {
                type: String
            },
            type: {
                type: String,
                default: 'M'
            }
        },
        methods: {
            getPlayInfo () {
                if(this.type === 'M')
                    return musicApi.getPlayInfo + this.copyrightId
            },
            getLyric () {                
                if(this.type === 'M')
                    return musicApi.getLyric + this.copyrightId
            },
            getSongPic () {                
                if(this.type === 'M')
                    return musicApi.getSongPic + this.songId
            }
        },
        data () {
            return {
                src: '',
                lyrics: []
            }
        }
    }
</script>