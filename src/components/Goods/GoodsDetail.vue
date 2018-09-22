<template>
    <div>
        <nav-bar title="商品详情"></nav-bar>
        <div class="outer-swiper">
            <div class="swiper">
                <my-swipe url="getthumimages/87"></my-swipe>
            </div>
        </div>
        <div class="product-desc">
            <ul>
                <li>
                    <span class="product-desc-span">
                        {{goodsInfo.title}}
                    </span>
                </li>
                <li class="price-li">
                    市场价：<s>￥{{goodsInfo.market_price}}</s>
                    销售价：<span>￥{{goodsInfo.sell_price}}</span>
                </li>
                <li class="number-li">购买数量
                <span @click="substract">-</span>
                <span>{{pickNum}}</span>
                <span @click="add">+</span>
                </li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click="insertBall">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <transition name="ball" @after-enter="afterEnter">
        <div class="ball" v-if="isExist"></div>
        </transition>
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号 ：{{goodsInfo.goods_no}}</li>
                <li>库存情况 : {{goodsInfo.stock_quantity}}件</li>
                <li>上架时间 ：{{goodsInfo.add_time | covertTime('YYYY-MM-DD')}}</li>
            </ul>
        </div>
        <mt-button type="primary" size="large" @click="shopPhotoInfo" plain >图文介绍</mt-button>
        <mt-button type="danger" size="large" @click="goodsComment" plain>商品评论</mt-button>
    </div>
</template>
<script>
import EventBus from '@/EventBus'
import GoodsTools from '@/GoodsTools'
export default {
    data(){
        return{
            goodsInfo:{},
            isExist:false,
            pickNum:1
        }
    },
    methods:{
        add(){
            if(this.goodsInfo.stock_quantity<=this.pickNum) return
            this.pickNum++
        },
        substract(){
            if(this.pickNum <= 1) return
            this.pickNum--
        },
      insertBall(){
          this.isExist = true
      },
      afterEnter(){
          this.isExist = false
          EventBus.$emit('addShopcart',this.picknum)
          GoodsTools.add({
              id:this.goodsInfo.id,
              num:this.pickNum
          })
      },
      shopPhotoInfo(){
          //编程 （去哪里）
          this.$router.push({
              name:'photo.info',
              query:{
                  id:this.$route.params.id
              }
          })
      },
      goodsComment(){
          //需要商品ID
          this.$router.push({
              name:'goods.comment',
              query:{
                  id:this.$route.params.id
              }
          })
      }
    },
    created(){
        let imgid = this.$route.params.id
        this.$axios.get('goods/getinfo/'+imgid)
        .then(res=>{
            this.goodsInfo = res.data.message[0]
        })
        .catch(err=>console.log('商品获取失败',err))
    }
}
</script>
<style scoped>
.ball-enter-active{
    animation:bounce-in 1s
}
.ball-leave{
    opacity: 0;
}
@keyframes bounce-in{
    0%{
        transform:translate3d(0,0,0)
    }
    50%{
        transform: translate3d(140px,-50px,0)
    }
    75%{
        transform:translate3d(160px,0px,p)
    }
    100%{
        transform: translate3d(140px,300px,0)
    }
}
.product-desc .product-desc-span{
    color: blue;
    border:200px;
    border-bottom: 1px solid #ccc;
    font:30px;
    bold:200; 
    margin-bottom: 5px;
}
.product-desc .price-li{
    margin: 10px 0 5px 5px;
}
.product-desc .price-li s{
    color:red;
    font:18px;
}
.product-desc .price-li span{
    color:firebrick;
    font:20px;
}
.product-desc .number-li{
    margin: 5px 0 10px 5px;
}
.product-desc .number-li span:nth-child(1){
    border:1px solid #ccc;
    padding: 2px;
    display:inline-block;
    width:20px;
    height:20px;
    line-height: 20px;
    margin: 0 5px 0 5px;
    color:black;
    text-align: center;
}
.product-desc  .number-li span:nth-child(2){
    color:red;
    font:20px;
    margin: 0 5px 0 5px;
    border:1px solid #ccc;
    padding: 2px;
    display:inline-block;
    width:40px;
    height:20px;
    line-height: 20px;
    text-align: center;
}
.product-desc .number-li span:nth-child(3){
    border:1px solid #ccc;
    padding: 2px;
    display:inline-block;
    width:20px;
    height:20px;
    line-height: 20px;
    margin: 0 5px 0 5px;
    color:black;
    text-align: center;
}
.goods a{
    color:black;
}
</style>


