<template>
    <div class="rankinfo">
        <div >
        </div>
        <song-list :songList='songs'></song-list>
    </div>

</template>

<script>

import SongList from '@/views/common/SongList/SongList'
export default {
    data() {
        return {
            songs:[],
            imgUrl:'',
            singerName:''
        }
    },
    components: {
        SongList
    },
    computed: {
        
    },
    async created() {
        let {data} = await this.$axios.get(`plist/index/${this.$route.params.specialid}?json=true`)
        console.log(data)
        this.songs = data.songs.list
        this.imgUrl = data.info.imgurl
        this.singerName = data.info.singername
    },
}
</script>
<style lang="">
    
</style>