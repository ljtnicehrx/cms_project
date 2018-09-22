<template>
  <div>
    <div class="pay-detail">
      <ul>
        <li class="p-list" v-for="(goods,index) in shopcart" :key="goods.id">
          <mt-switch v-model="isSelected"></mt-switch>
          <img :src="goods.thumb_path">
          <div class="pay-calc">
            <P></P>
            <div class="calc">
              <span>￥{{goods.sell_price}}</span>
              <span @click="substract">-</span>
              <span>{{goods.num}}</span>
              <span @click="add">+</span>
              <a href="javascript:;" @click="del(index)">删除</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="show-price">
      <div class="show-1">
        <p>总计（不含运费）：</p>
        <span>已经选择商品{{payment.count}}件 商品总价{{payment.price}}元</span>
      </div>
      <div class="show-2">
        <mt-button type="danger" size="large">去结算</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import GoodsTools from '@/GoodsTools'
export default {
  computed:{
    payment(){
      let count = 0
      let price = 0
      this.shopcart.forEach(goods=>{
        if(isSlected){
          count += goods.num
        price += goods.num*goods.sell_price
        }
      })
      return {
        count,price
      }
    }
  },
  beforeRouteLeave(to,from,next){
    if(confirm('亲，真的要离开吗')){
      //保存当前剩余
      let obj ={}
      this.shopcart.forEach(goods=>{
        obj[goods.id] = goods.num
      })
      GoodsTools.saveGoods(obj)
      next()
    }else{
      next(false)//取消导航事件
    }
  },
   data(){
    return{
      shopcart:[],
      isSlected:false,
      num:0
    }
  },
  created(){
     let goodsList = GoodsTools.getGoodsList();
     let ids = Object.keys(goodsList).join(',');
     this.$axios.get('goods/getshopcarlist/'+ids)
     .then(res=>{
       this.shopcart = res.data.message
       this.shopcart.forEach(goods=>{
         if(goodsList[goods.id]){
           goods.num = goodsList[goods.id]
         }
         goods.isSlected = true
       })
     })
     .catch(err=>console.log('购物车数据异常',err))
  },
   methods:{
     add(){
       goods.num++
     },
     substract(){
       goods.num--
     },
     del(index){
       this.shopcart.splice(index,1)
     }
   }

}
</script>

