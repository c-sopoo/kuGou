<template>
  <div class="rank-cell">
     <!-- 排行榜中的组件 -->
     <mt-cell
        :title="item.specialname|| item.rankname"
        :to="{name:Path,params:{rankid: ($route.path=='/rank')?item.rankid :item.specialid}}"
        is-link
        class="cell"
        v-for="item in lists"
        :key="item.rankid || item.specialid"
        >
        <slot></slot>
        <img class="rank-img" slot="icon" :src="item.imgurl | filterImg" width="74" height="74">
    </mt-cell>
    
  </div>
</template>

<script>
import Vue from 'vue';
import { Cell } from 'mint-ui';

Vue.component(Cell.name, Cell);


export default {
  props: {
    "lists": Array
  },
  data() {
    return {
      Path:'RankInfo',
      Params:''
    }
  },
  watch: {
    $route: {
      handler() {
        // console.log(this.$route)
        if(this.$route.path == '/rank') {
          this.Path = 'RankInfo'
          // this.Params = item.rankid
        }else {
          this.Path = 'Plistlist'
          // this.Params = item.specialid
        }
        
      },
      immediate: true
    }
  },
  
}



</script>

<style>
  .rank-cell .cell {
    height: 100px;
  }
  .rank-img {
    margin-top: 13px;
  }
  .rank-cell .cell .mint-cell-text {
        font-size: 14px;
        display: inline-block;
        width: 180px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
  }

</style>