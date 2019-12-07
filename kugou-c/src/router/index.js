import Vue from 'vue'
import Router from 'vue-router'

// import Nav from '@/components/Nav/Nav'
import navs from './nav'
import Search from '@/views/Search/Search'
import NavSearch from '@/components/Nav/NavSearch'
import SingerList from '@/views/Singer/SingerList/SingerList'
import SingerInfo from '@/views/Singer/SingerInfo/SingerInfo'

// 获取当前的push方法
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  // 改写push方法 每次返回相同的一个push方法
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  routes: [
    ...navs,
    {
      path: '/search',
      name: 'Search',
      components: {
        default: Search,
        navBar: NavSearch
      }
    },
    {
      path: '/singer/list/:id',
      name: 'SingerList',
      components: {
        default: SingerList,
        navBar: NavSearch
      }
    },
    {
      path: '/singer/info/:singerId',
      name: 'SingerInfo',
      components: {
        default: SingerInfo,
        navBar: NavSearch
      }
    }
  ]
})
