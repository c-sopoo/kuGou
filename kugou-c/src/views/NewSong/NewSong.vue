<template>
    <div>
        <mt-swipe :auto="4000" class="banner">
            <mt-swipe-item v-for='item in banners' :key='item.id'>
                <img :src="item.imgurl" :alt="item.title">
            </mt-swipe-item>
        </mt-swipe>

        <!-- 歌曲列表 -->
        <song-list :songList='songLists'></song-list>
    </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui';

import SongList from '@/views/common/SongList/SongList'

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
    data() {
        return {
            banners:[],
            songLists:[]
        }
    },
    async created() {
        let {data} = await this.$axios.get('?json=true')
        // console.log(data)
        this.banners = data.banner;
        this.songLists = data.data
    },
    components: {
        SongList
    }
}
</script>

<style lang="less" scoped>
    /deep/ .banner {
        height: 120px;
        img{
            width: 100%;
            display: block;
        }
    }
    /deep/ .mint-swipe-indicators {
        bottom: 2px;
    }
</style>