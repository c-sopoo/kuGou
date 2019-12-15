<template>
  <div class="songlists">
    <!-- 点击列表中 任意一项 就会得到当前的歌曲信息（hash） 
    歌曲列表
    -->
     <mt-cell :title="item.filename" class="cell-title" 
      v-for="item in songList" 
      :key="item.hash"
      @touchstart.native="playSong(item)" 
      >
        <img slot="icon" src="../../../assets/imgs/download_icon_2.png" width="15" height="15" class="icon-img">
      </mt-cell>
  </div>
</template>

<script>
import Vue from 'vue'
import { Cell } from 'mint-ui';
Vue.component(Cell.name, Cell);
export default {
  props:{
    'songList': Array
  },
  // 一旦外面 传递过来 songlists  就应该把当前的songlists 传递给vuex
  watch:{
    songList(){
      console.log("=======触发啦===",this.songList);
      this.$store.commit('updateSongLists',{songlists:this.songList})
    }
  },
  methods: {
    playSong(item){
      // 把当前的歌曲的hash传递给vuex
      console.log(item);
      this.$store.commit('updateHash',{hash:item.hash})
    }
  }
}
</script>

<style>
  .songlists .icon-img {
    float: right;
  }
  .songlists .mint-cell-text {
    font-size: .875rem;
    display: inline-block;
    width: 250px;
    /* background-color: blue; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
</style>