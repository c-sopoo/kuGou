<template>
    <div class="rank">
        <rank-common :lists='rankList'></rank-common>
    </div>
</template>

<script>

import RankCommon from '@/views/common/RankCommon/RankCommon'
export default {
    data() {
        return {
            rankList:[]
        }
    },
    components: {
        RankCommon
    },
    async created() {
        let {data} = await this.$axios.get('rank/list&json=true')
        // console.log(data)
        this.rankList = data.rank.list
        console.log(this.rankList)
    },
}
</script>

<style lang="">
    
</style>