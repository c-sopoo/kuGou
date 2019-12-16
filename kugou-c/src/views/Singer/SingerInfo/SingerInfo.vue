<template>
    <div class="songslist">
        <div class="bg" :style="'background:url('+filterImg+') center no-repeat'">
            <span>{{ singerName }}</span>
        </div>
        <song-list :songList='songs'></song-list>
    </div>

</template>

<script>

import SongList from '@/views/common/SongList/SongList'
export default {
    data() {
        return {
            songs:[],
            imgUrl:'',
            singerName:''
        }
    },
    components: {
        SongList
    },
    computed: {
        filterImg() {
            return this.imgUrl.replace(/{size}/,400)
        }
    },
    async created() {
        let {data} = await this.$axios.get(`singer/info/${this.$route.params.singerId}?json=true`)
        console.log(data)
        this.songs = data.songs.list
        this.imgUrl = data.info.imgurl
        this.singerName = data.info.singername
    },
}
</script>

<style lang="less" scoped>
    .songslist {
        .bg {
            height: 11.625rem;
            &>span {
                display: inline-block;
                height: 100%;
                width: 100%;
                background: rgba(0,0,0,.4);
                font-size: 1.25rem;
                color: #fff;
                font-weight: 500;
                padding-top: .625rem;
                padding-left: .625rem;
            }
        }
    }
</style>