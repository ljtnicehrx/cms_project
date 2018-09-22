// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入配置
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Axios from 'axios'
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = 'https://www.sinya.onLine/api/'
//引入自己的css
import './assets/css/global.css'
//引入自己的ul li 组件
import MyUl from '@/components/common/MyUl'
import MyLi from '@/components/common/MyLi'
Vue.component(MyUl.name,MyUl)
Vue.component(MyLi.name,MyLi)
import mySwipe from '@/components/common/mySwipe'
Vue.component(mySwipe.name,mySwipe)
import NavBar from '@/components/common/NavBar'
Vue.component(NavBar.name,NavBar)
import Comment from '@/components/common/Comment'
Vue.component(Comment.name,Comment)
import Moment from 'moment'
Vue.filter('covertTime',function(data,formatStr){
  return Moment(data).format(formatStr)
})
Vue.filter('relativeTime',function(previous){
return Moment(previous).fromNow()
})
Vue.use(MintUI)
Vue.config.productionTip = false
//设置中文
Moment.locale('zh-cn')
//  处理字符串过长的过滤器
Vue.filter('convertStr',function(str,count){
  return str.substring(0,count)+'...'
})

//配置请求拦截器 显示loading
Axios.interceptors.request.use(function(config){
  MintUI.Indicator.open({
    text:'玩命加载中...'
  });
  return config
})
Axios.interceptors.response.use(function(response){
  MintUI.Indicator.close()
  return response;
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
