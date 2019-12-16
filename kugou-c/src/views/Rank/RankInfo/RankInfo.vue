<template>
<<<<<<< HEAD
    <div class="rankinfo">
        <div >
=======
    <div class="plistlist">
        <div class="bg">
            <img :src="imgUrl | filterImg" alt="">
            <p><span class="iconfont icon-zuo" @click='goBack'></span>{{ rankname}}</p>
            
>>>>>>> 31f7cb3795f307f9e14a5fd0a8e0a084f8016deb
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
<<<<<<< HEAD
            singerName:''
=======
            rankname:''
>>>>>>> 31f7cb3795f307f9e14a5fd0a8e0a084f8016deb
        }
    },
    components: {
        SongList
    },
    computed: {
<<<<<<< HEAD
        
    },
    async created() {
=======
        filterImg() {
            return this.imgUrl.replace(/{size}/,400)
        }
    },
    async created() {
        console.log(this.$route.params.rankid)
>>>>>>> 31f7cb3795f307f9e14a5fd0a8e0a084f8016deb
        let {data} = await this.$axios.get(`rank/info/${this.$route.params.rankid}?json=true`)
        console.log(data)
        this.songs = data.songs.list
        this.imgUrl = data.info.imgurl
<<<<<<< HEAD
        this.singerName = data.info.singername
    },
}
</script>
<style lang="">
    
=======
        this.rankname = data.info.rankname
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    },
}
</script>
<style lang="less">
    .plistlist {
        .bg {
            height: 10.9375rem;
            background: pink;
            text-align: center;
            position: relative;
            // padding-top: .625rem;
            p {
                position: absolute;
                top: 0;
                left: 0;
                height: 1.875rem;
                text-align: center;
                font-size: 1rem;
                width: 100%;
                line-height: 1.875rem;
                color: #fff;
                span {
                    position: absolute;
                    left: .3125rem;
                    font-size: 1.25rem;
                }

            }
            img {
                // display: block;
                width: 100%;
                // height: 320px
                margin-top: -50px;

            }
        }
    }
>>>>>>> 31f7cb3795f307f9e14a5fd0a8e0a084f8016deb
</style>