<template>
    <div class="singer">
        <div class="singerlist">
            <mt-cell class="singer-l"
            v-for='item in singerList'
            :key='item.classid'
            :title="item.classname"
            :to="'/singer/list/' + item.classid"
            is-link
            value="">
            </mt-cell>
        </div>
        
    </div>
</template>

<script>
import Vue from 'vue'
import { Cell } from 'mint-ui';

Vue.component(Cell.name, Cell);
export default {
    data() {
        return {
            singerList:[],
            sin:[]
        }
    },
    async created() {
        let {data} = await this.$axios.get('singer/class&json=true')
        console.log(data)
        this.singerList = data.list
        this.sin = data.list.filter(item =>item.classname.substring(0,2)=='日韩')
        // console.log(this.sin)
    },
}
</script>

<style lang="less" scoped>
    .singer{
        /deep/.mint-cell-text {
            font-size: .875rem;
        }
        /deep/ .singer-l {
            border: 1px solid #e7e5e5;
            margin: .3125rem;
            border-radius: 5px;
        }
    }
</style>