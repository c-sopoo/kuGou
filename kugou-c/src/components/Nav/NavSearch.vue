<template>
  <div class="navSearch">
    <mt-header title="搜索" >
    <span slot="left">
      <mt-button icon="back" @click.native="gotoBack"  class="icon"></mt-button>
    </span>
  </mt-header>
  </div>
</template>

<script>
import Vue from 'vue'
import { Header, Button } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);

export default {
  methods: {
    gotoBack(){
      // console.log(111);
      // 调用api方法去返回上一次历史记录
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
  
   .navSearch .mint-header {
      background-color: #fff;
      color:#333;
    }
    .navSearch   .icon {
        color: #999;
    }
</style>