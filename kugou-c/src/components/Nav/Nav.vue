<template>
    <div class="nav">
        <mt-navbar v-model="selected">
            <mt-tab-item
            v-for='item in navs'
            :key='item.name'
            :id="item.name"
            @click.native="gotoFun(item)">
            {{item.meta.title}}</mt-tab-item>
        </mt-navbar>
    </div>
</template>

<script>
import  navs from '@/router/nav.js'

import Vue from 'vue'
import { Navbar, TabItem } from 'mint-ui';
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
export default {
    data() {
        return {
            selected:'NewSong',
            navs
        }
    },
    watch:{
    // 使用watch监听属性 来监听路由的变化 触发selected改变
    $route:{
      handler(){
        // console.log(this.$route);
        this.selected = this.$route.name
        // console.log(this.selected)  // Singer Rank Plist NewSong
        
      },
      immediate:true
    }
  },
    methods: {
        gotoFun(item){
        // console.log(item);
        //调用方法发起路由跳转
        this.$router.push({
          name: item.name
        });
        }
    },
}
</script>

<style lang="less" scoped>
    .nav {
           /deep/ .mint-tab-item-label{
                font-size: 1rem;
        }
    }
</style>