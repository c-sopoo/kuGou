<template>
    <div class="playcon" >
        <!-- 底部支撑块 -->
        <div  style="height: 60px" v-if='bottom == "0"'></div>

        <!-- 歌手封面 -->
        <div class="singer-page" :style="{visibility: flag? 'hidden':'visible','background-image': 'url('+singerPic+')' }">
            <div class="fun-box">
                    <div class="con-group">
                        <p><span class="iconfont icon-zuo" @click='goBack'></span>{{ flieSongName}}</p>
                        <!-- 图片 -->
                        <div class="singer-img">
                            <img :src="singerPic" alt="">
                        </div>
                        <!-- 歌词 -->
                        <div class="lrc-box">
                            <!-- <p v-for='(line,i) in currentLyric.lines' :key='i'>{{line.txt}}</p> -->
                            <p>{{txt}}</p>
                        </div>
                    <!-- 进度条 -->
                    <div class="progress">
                        <span>{{songMin2}}:{{songSec2}}</span>
                        <div class="progress-wrap" ref='progress'>
                            <div class="load-progress"></div>
                            <div class="time-progress" :style="{width:(timeProgressWidth/16)+'rem'}">
                                <span 
                                :style="{left:(timeProgressWidth/16-.625)+'rem'}"
                                @mousedown.prevent='start'
                                @mousemove.prevent='move'
                                @mouseup.prevent='end'
                                ></span>
                            </div>
                        </div>
                        <span>{{songMin}}:{{songSec}}</span>
                    </div>
                    <!-- 控制按钮 -->
                    <div class="control-box">
                        <span class="iconfont icon-shangyishou1" @click='prev'></span>
                        <span class="iconfont" :class='isPlay? "icon-zanting2": "icon-bofang"' @click='playOrPause'></span>
                        <span class="iconfont icon-xiayishou1" @click='next'></span>
                    </div>
                </div>
            </div>
            
           
        </div>

        <!-- 控制器 -->
        <div class="player" :style="{bottom:bottom}" @click='pageShow'>
            <img :src="singerPic" alt="">
            <div class="info">
                <p>{{ flieSongName }}</p>
                <p>{{ fileSingerName }}</p>
            </div>
            <div class="control">
                <span class="iconfont icon-shangyishou" @click='prev'></span>
                <span class="iconfont" :class='isPlay? "icon-zanting": "icon-zanting1"' @click='playOrPause'></span>
                <span class="iconfont icon-xiayishou" @click='next'></span>
            </div>
            <audio :src="audioUrl" ref="audio"></audio>
            <!-- <h1>播放器</h1> -->
        </div>
    </div>
</template>

<script>

import { MessageBox } from 'mint-ui';
import {mapGetters,mapState}  from 'vuex'
import Lyric from 'lyric-parser'
export default {
    data() {
        return {
            singerPic:'',
            singerName:'',
            songName: '',
            fileName: '',
            audioUrl: '',
            fileSingerName:'',
            flieSongName:'',
            isPlay: false,
            bottom: '-5rem',
            flag:true,
            timeLength:'',
            timeLength2:0,
            timer1:null,
            timer2:null,
            timeProgressWidth:0,
            lyric:'',
            currentLyric: null||'',  // 设置一个歌词维护属性
            currentLineNum: 0,
            txt:''
        }
    },
    computed: {
        ...mapState(['songlists','hash']),
        ...mapGetters(['index']),
        songMin() {
            return Number.parseInt(this.timeLength/60) 
        },
        songSec() {
            let seconds = Number.parseInt(this.timeLength%60)
            return seconds>=10? seconds: '0'+seconds
        },
        songMin2() {
            return Number.parseInt(this.timeLength2/60)
        },
        songSec2() {
            let seconds2 = Number.parseInt(this.timeLength2%60)
            return seconds2 >=10? seconds2: '0'+seconds2
        }
    },
    watch: {
        hash: async function() {
            console.log(this.hash)
            console.log('hash变化')//根据hash变化发送请求
            // http://m.kugou.com/api/v1/song/get_song_info?cmd=playInfo&hash=8A0F1F3693181287FEF64CC11B6FF03
      // 发起 axios请求

    //歌词
    //   http://m.kugou.com/app/i/krc.php?cmd=100&keyword=%E8%96%9B%E4%B9%8B%E8%B0%A6%20-%20%E8%AE%A4%E7%9C%9F%E7%9A%84%E9%9B%AA&hash=10332C58914B9C5FCAAAB60B9531D739&timelength=261000&d=0.4270580353546505

            //清除歌词定时器
            // debugger
            

            let {data} = await this.$axios.get('api/v1/song/get_song_info',{
                params:{cmd: 'playInfo',hash: this.hash}})
            console.log(data)

            

            if(data.error == '需要付费') {
                MessageBox('错误提示', '因版权问题无法播放此歌曲');
                return;
            }

            this.singerPic = data.imgUrl.replace(/{size}/,400)
            this.singerName = data.singerName
            this.songName = data.songName
            this.fileName = data.fileName
            this.audioUrl = data.url
            this.timeLength = data.timeLength

            let str = data.fileName.replace(/\s*/g,'')//去空格
            let index = str.indexOf('-')
            // console.log(index)
            this.fileSingerName = str.substring(0,index)
            this.flieSongName = str.substring(index+1)
            // console.log(this.fileSingerName)
            // console.log(this.flieSongName)
            // console.log(data.fileName.replace(/\s*/g,''))
            // console.log(this.index)

        let res = await this.$axios.get('app/i/krc.php',{
                        params: {
                            cmd:100,
                            keyword:this.fileName,
                            hash: this.hash,
                            timelength:this.timeLength*1000
                        }
                    })
        this.lyric = res.data

        this.currentLyric = new Lyric(this.lyric,this.handleLyric) //this.handleLyric回调函数
                console.log(this.currentLyric)
        if(!this.isPlay) {
            this.currentLyric.play()
            console.log('歌词播放中')
        }else {
            this.currentLyric.stop()
            console.log('歌词暂停中')
        }
        // play() 原生dom元素
        // 虽然你已经把音频信息放置到audio的src中啦 但是音乐需要时间加载
        // 音频还没有加载完毕 你直接调用play无法播放
        // 有一个事件可以判断当前音频加载完毕了 loadeddata
        // console.log('----')
        // console.log(this.$refs.audio)//$refs ref 获取DOM元素
        let this_ = this
        // let timer = null
            this.$refs.audio.addEventListener('loadeddata', function() {
                // console.log(this)
                console.log('歌曲加载成功')
                // console.log(this.duration)
                this.play()//audio  play()方法
                this_.isPlay = true;
                this_.bottom = '0' 
                // this_.timeLength2 = 0;
                // this_.currentLyric.play()
                this_.setTimer()
            })
            // console.log(this.$refs.progress.offsetWidth)
            // let s = 
            this.$refs.audio.addEventListener('timeupdate',function() {
                this_.timeLength2 = this.currentTime
                this_.timeProgressWidth = this.currentTime*(this_.$refs.progress.offsetWidth/this.duration)
                
            })

        immediate:true
        deep:true
        }
    },
    methods: {
        handleLyric({lineNum, txt}){
            this.currentLineNum = lineNum
            // console.log(this.currentLineNum)
            this.txt = txt
            console.log(txt)
        },
        start(ev) {
            console.log('12134354')
            
        },
        move(ev) {
            console.log(ev)
            
            
            
        },
        end() {

        },
        setTimer() {
            // if(this.timer){
            //     clearInterval(this.timer)
            // }
            if(!this.timer1) {
                this.timer1 = setInterval(()=> {
                    this.timeLength--
                    // this.timeLength2++
                    if(this.timeLength == 0) {
                        clearInterval(this.timer1)
                        this.timer1 = null;
                    }
                    console.log(this.timeLength)
                },1000)
            }
        },
        pageShow() {
            // console.log(event.target)
            if(event.target.nodeName !== 'SPAN'){
                this.flag = false
            }
        },
        goBack() {
            this.flag = true
        },
        prev() {
            console.log('上一首')
            this.isPlay = false
            this.$refs.audio.pause()
            this.currentLyric.stop()
            if(this.index -1 >=0) {
                return this.$store.commit('updateHash',{hash: this.songlists[this.index -1].hash})
            }
        },
        playOrPause() {
            if(this.isPlay) {//说明在播放
                console.log('暂停')
                this.$refs.audio.pause()//点击之后就暂停
                // this.currentLyric.stop()
                clearInterval(this.timer1)
                this.timer1 = null;
                // this.timeLength2 = 0
            }else {//说明当前是暂停状态
                this.$refs.audio.play()//点击之后就播放
                // this.currentLyric.play()
                this.setTimer()
                console.log('pppp'+this.timer1)
                console.log('播放')
            }
            this.isPlay = !this.isPlay
        },
        next() {
            console.log('下一首')
            this.isPlay = false
            this.$refs.audio.pause()
            this.currentLyric.stop()
            if(this.index+1 <= this.songlists.length) {
                return this.$store.commit('updateHash',{hash: this.songlists[this.index +1].hash})
            }
        }
        
    },


}
</script>

<style lang="less" scoped>
.playcon {
    width: 100%;
    height: 100%;
    // background: pink;
    
}   
.singer-page {
    width: 100%;
    height: 100%;
    background: cornflowerblue;
    position:  fixed;
    top: 41px;
    z-index: 10;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    
    &::after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;top: 0;
        background: inherit;
        // opacity: .9;
        filter: blur(12px);
        z-index: 2;

    }
    .fun-box {
        width: 100%;
        height: 100%;
        position: absolute;
        background: rgba(0,0,0,0.6);
        z-index: 5;

    }
    .con-group {
        width: 100%;
        z-index: 10;
        position: absolute;
    }
    p {
        height: 2.625rem;
        text-align: center;
        line-height: 2.625rem;
        color: #fff;
        position: relative;
        font-size: 1rem;
        span {
            position: absolute;
            left: .5rem;
            font-size: 1.25rem;
        }
    }
    .singer-img {
        width: 9.375rem;
        height: 9.375rem;
        margin: 15px auto 0;
        background: #000; 
        img {
            width: 100%;
            height: 100%;
        }
    }
    .lrc-box {
        height: 3.375rem;
        margin-top: .625rem;
        // background: #fff;
        overflow: hidden;
        p {

        }
    }
    .progress {
        height: 2.5rem;
        padding: .75rem .625rem;
        // background: #000;
        display: flex;
        align-items: center;
        .progress-wrap {
            width: 13.875rem;
            height: .1875rem;
            margin: 0 10px;
            background: rgb(92, 92, 92);
        }
        .time-progress {
            background: #1784d8;
            height: 100%;
            position: relative;
            &>span {
                display: inline-block;
                width: .625rem;
                height: .625rem;
                border-radius: 50%;
                background: #1784d8;
                position: absolute;
                // top: 0;
                margin-top: -0.25rem;
            }
        }
    }
    .control-box {
        text-align: center;
        // line-height: 2.875rem;
        span {
            vertical-align: middle;
            margin: 0 .75rem;
            color: #fff;
            font-weight: lighter;
            &:nth-child(1),&:nth-child(3) {
                font-size: 2rem;
            }
            &:nth-child(2) {
                font-size: 2.8125rem;
            }
        }
    }
    
    

}
    .player {
        width: 100%;
        position: fixed;

        height: 3.75rem;
        // background: pink;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 .625rem;
        box-sizing: border-box;
        justify-content: space-between;
        background-color: #000;
        img {
            width: 3.3125rem;
            height: 3.3125rem;
        }
        .info {
            margin-left: .3125rem;
            width: 9.25rem;
            p {
                overflow: hidden;
                width: 100%;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .control {
            // width: 3.75rem;
            span {
                font-size: 1.5rem;
            }
        }
    }
</style>