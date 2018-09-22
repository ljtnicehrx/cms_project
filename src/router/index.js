import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Member from '@/components/Member/Member'
import Shopcart from '@/components/Shopcart/Shopcart'
import Search from '@/components/Search/Search'
import NewsList from '@/components/News/NewsList'
import NewsDetail from '@/components/News/NewsDetail'
import PhotoList from '@/components/Photo/PhotoList'
import PhotoDetail from '@/components/Photo/PhotoDetail'
import GoodsList from '@/components/Goods/GoodsList'
import GoodsDetail from '@/components/Goods/GoodsDetail'
import GoodsComment from '@/components/Goods/GoodsComment'
//图片预览插件
import VuePreview from 'vue-preview'

//install
Vue.use(VuePreview)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:{
        name:'home'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/member',
      name: 'member',
      component: Member
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: Shopcart
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    //新闻列表
    {
      name:'news.list',
      path:'/news/list',
      component:NewsList
    },
    //新闻详细
    {
      name:'news.detail',
      path:'/news/detail',
      component:NewsDetail
    },
    //图文共享
    {
      name:'photo.list',
      path:'/photo/list/:categoryId',
      component:PhotoList
    },
      //图文详情
    {name:'photo.detail',
    path:'/photo/detail',
    component:PhotoDetail
    },
    //商品展示
    {
      name:'goods.list',
      path:'/goods/list',
      component:GoodsList

    },
    //商品详情
    {
      name:'goods.detail',
      path:'/goods/detail/:id',
      component:GoodsDetail
    },
    //商品图文详情
    {
      name:'photo.info',
      path:'/goods/info/:id',
      component:NewsDetail
    },
    //商品评论详情
    {
      name:'goods.comment',
      path:'/goods/comment',
      component:GoodsComment
    }
  ]
})
