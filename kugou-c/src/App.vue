<template>
  <div id="app">
    <div class="header">
      <mt-header title="下载酷狗" class="top">
        <router-link to="/" slot="left" class="logo">
          <img src="./assets/imgs/logo.png" alt="">
        </router-link>
        <mt-button icon="search" slot="right" @click.native="gotoSearch"></mt-button>
      </mt-header>

    </div>
      <!-- 导航栏,路由视图 -->
      <div class="nav">
        <router-view name='navBar'></router-view>
      </div>
      

    <div class="container">
      <router-view></router-view>
    </div>
    <!-- 播放器组件 -->
    
      <player></player>
    
    
  </div>
</template>

<script>
import Vue from 'vue'
import Player from '@/components/Player/Player'
import { Header,Button } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
export default {
  name: 'App',
  methods: {
    gotoSearch(){
      this.$router.push({
        name: 'Search'
      })
    }
  },
  components: {
    Player
  }
}
</script>

<style lang='less' scoped>
  #app{
    // height: 1000px;
    background: #fff
  }
  .header { 
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    .logo {
      img {
        display: block;
        width: 6.375rem;
        height: 1.5rem
      }
    }
    /deep/.top  {
      .mint-header-title{
        border: 1px solid #fff;
        height: 1.625rem;
        width: 5.125rem;
        border-radius: 5px;
        flex: 0 0 auto;
        line-height: 1.625rem;
        margin-left: .625rem;
      }
    }
    
    
  }
  .container {
    margin-top: 3px;
  }
  .nav {
    margin-top: 40px;
  }
  .playerbox {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  
</style>
