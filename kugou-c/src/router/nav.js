// 按需加载nav组件
import Nav from '@/components/Nav/Nav'
import NewSong from '@/views/NewSong/NewSong'
import Rank from '@/views/Rank/Rank'
import Plist from '@/views/Plist/Plist'
import Singer from '@/views/Singer/Singer'
const navs = [{
  path: '/',
  name: 'NewSong',
  meta: {
    title: '新歌'
  },
  components: {
    default: NewSong,
    navBar: Nav
  }
},
{
  path: '/rank',
  name: 'Rank',
  meta: {
    title: '排行'
  },
  components: {
    default: Rank,
    navBar: Nav
  }
},
{
  path: '/plist',
  name: 'Plist',
  meta: {
    title: '歌单'
  },
  components: {
    default: Plist,
    navBar: Nav
  }
},
{
  path: '/singer',
  name: 'Singer',
  meta: {
    title: '歌手'
  },
  components: {
    default: Singer,
    navBar: Nav
  }
}
]

export default navs
