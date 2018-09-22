<template>
<div>
<mt-header title="信息管理系统"></mt-header>
<transition name="rv" mode="out-in">  
<router-view class="tmpl"/>
</transition>
<mt-tabbar v-model="selected">
  <mt-tab-item id="home">
    <img @click="changeHash" slot="icon" src="./assets/img/home.png">
    首页
  </mt-tab-item>
  <mt-tab-item id="member">
    <img @click="changeHash" slot="icon" src="./assets/img/member.png">
    会员
  </mt-tab-item>
  <mt-tab-item id="shopcart">
    <img @click="changeHash" slot="icon" src="./assets/img/shopcart.png">
    购物车<mt-badge type="error" size="small">{{num}}</mt-badge>
  </mt-tab-item>
  <mt-tab-item id="search">
    <img @click="changeHash" slot="icon" src="./assets/img/search.png">
    查找
  </mt-tab-item>
</mt-tabbar>
</div>
</template>
<script>
import EventBus from '@/EventBus.js'
import GoodsTools from '@/GoodsTools.js'
export default {
  data () {
    return {
      selected: ' ',
      num:0
    }
  },
  created(){
    this.num = GoodsTools.getTotalCount()
     EventBus.$on('addShopcart',data=>{
            this.num++
        })
  },
  methods:{
   changeHash(){
     this.$nextTick(function(){
       this.$router.push({
        name:this.selected
      })
    //  console.log(this.selected)     
     })
   }
  },
  watch: {
    // selected (newV, oldV) {
    //   this.$router.push({
    //     name:newV
    //   })
    // }
  }
}
</script>
<style scoped>
.mint-tabbar{
  position: fixed;
  bottom:0px;
}
.rv-enter-active, .rv-leave-active{
  transition: opicaty .5s
}
.rv-enter, rv-leave-to{
  opicaty:0
}
</style>
