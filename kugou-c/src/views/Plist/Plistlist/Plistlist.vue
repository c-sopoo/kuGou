<template>
    <div class="rankinfo">
        <div class="bg">
            <img :src="imgUrl | filterImg" alt="">
            <p><span class="iconfont icon-zuo" @click='goBack'></span>{{ specialname}}</p>
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
            specialname:'' 
        }
    },
    components: {
        SongList
    },
    watch: {
        $route() {
            console.log(this.$route)
        }
    },
    
    computed: {
        filterImg() {
            return this.imgUrl.replace(/{size}/,400)
        }
    },
    async created() {
        console.log(this.$route)
        let {data} = await this.$axios.get(`plist/list/${this.$route.params.rankid}?json=true`)//:id和rank组件路由相同
        console.log(data)
        this.songs = data.list.list.info
        this.imgUrl = data.info.list.imgurl
        this.specialname = data.info.list.specialname
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        }
        
    },
}
</script>
<style lang="less">
    .rankinfo {
        .bg {
            height: 10.9375rem;
            text-align: center;
            position: relative;
            p {
                height: 1.875rem;
                line-height: 1.875rem;
                color: #fff;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                span {
                    font-size: 1.25rem;
                    color: #fff;
                    position: absolute;
                    left: .3125rem;
                }
            }
            img {
                width: 100%;
                margin-top: -3.125rem;
            }
            
        }
    }
</style>