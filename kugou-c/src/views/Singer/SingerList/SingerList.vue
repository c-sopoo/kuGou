<template>
    <div class="singerlist">
        <mt-cell 
        v-for='item in singerNames'
        :key='item.singerid'
        :title="item.singername"
        :to="{name:'SingerInfo',params:{singerId:item.singerid}}"
        >
            <img slot="icon" :src="item.imgurl | filterImg" width="50" height="50">
        </mt-cell>
    </div>
</template>

<script>
import Vue from 'vue'
import { Cell } from 'mint-ui';

Vue.component(Cell.name, Cell);
export default {
    data() {
        return {
            singerNames:[]
        }
    },
    async created() {
        console.log(this.$route.params)
        let {data} = await this.$axios.get(`singer/list/${this.$route.params.id}?json=true`)
        console.log(data)
        this.singerNames = data.singers.list.info
    },
}
</script>

<style lang="less" scoped>
    .singerlist {
        /deep/.mint-cell-wrapper {
            padding: 10px
        }
    }
</style>