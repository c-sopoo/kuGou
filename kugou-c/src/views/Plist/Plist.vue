<template>
    <div>
        <rank-common :lists='plist'></rank-common>
    </div>
</template>

<script>
import RankCommon from '@/views/common/RankCommon/RankCommon'
export default {
    data() {
        return {
            plist: []
        }
    },
    components: {
        RankCommon
    },
    async created() {
        let {data} = await this.$axios.get('plist/index&json=true')
        console.log(data)
        this.plist = data.plist.list.info
    },
}
</script>

<style lang="">
    
</style>