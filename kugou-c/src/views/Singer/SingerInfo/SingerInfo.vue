<template>
    <div class="songslist">
        <div class="bg">
            <span></span>
        </div>
    </div>

</template>

<script>

import SongList from '@/views/common/SongList/SongList'
export default {
    data() {
        return {
            songs:[]
        }
    },
    components: {
        SongList
    }
}
</script>

<style lang="">
    
</style>