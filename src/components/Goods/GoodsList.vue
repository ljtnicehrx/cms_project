<template>
    <div>
        <nav-bar title="商品展示"></nav-bar>
       <mt-loadmore :auto-fill="false" :bottom-method="loadBottom" ref="loadmore" :bottom-all-loaded="isAllLoaded">
            <ul>
            <li class="goods" v-for="goods in goodsList" :key="goods.id"> 
                <router-link :to="{name:'goods.detail',params:{id:goods.id}}">
                    <img :src="goods.img_url">
                    <div class="title" >{{goods.title | convertStr(25)}}</div>
                    <div class="desc">
                        <div class="sell">
                            <span>￥{{goods.sell_price}}</span>
                            <s>￥{{goods.market_price}}</s>
                        </div>
                        <div class="detail">
                            <div class="hot">热卖中</div>
                            <div class="count">剩{{goods.stock_quantity}}件</div>
                        </div>
                    </div>

                </router-link>
            </li>
        </ul>
       </mt-loadmore>
    </div>
</template>
<script>
export default {
    data(){
        return{
          goodsList:[],
          page:1,
          isAllLoaded:false
        }
    },
    created(){
       this.page = this.$route.query.id || '1'
       this.loadByPage(this.page)
    },
    methods:{
        loadByPage(){
            this.$axios.get('getgoods?pageindex='+this.page)
            .then(res=>{
            this.goodsList = res.data.message
            this.page++
       })
             .catch(err=>console.log('获取商品失败',err))
        },
        concatByPage(){
             this.$axios.get('getgoods?pageindex='+this.page)
             .then(res=>{
             if(res.data.messsage.length===0){
               this.$toast('没有更多数据了')
               this.isAllLoaded = true
           }
            this.goodsList = this.goodsList.concat(res.data.message)
            this.$refs.loadmore.onBottomLoaded();
            //通知元素重新定位
           this.page++
       })
       .catch(err=>console.log('获取商品失败',err))
        },
        loadBottom(){
            // console.log('上拉加载被执行了')
            this.concatByPage(this.page)
        }
    }
}
</script>

<style scoped>
.goods{
    margin: 0px 5px 10px 5px;
    padding: 5px 5px;
    border: 1px solid #555;
    width: 160px;
    height: 250px;
    float: left;
    display: block;
    box-shadow: 1px #556;
}
.detail .hot{
    float: left;
    font:16px;
    color: red;
}
.detail .count{
    float: right;
    font:16px;
    color: orange;
}
.goods img{
    border:1px solid #ccc;
    width: 100%;
    height: 150px;
}
/* .desc{ */
    /* background-color: grey; */
/* } */
</style>
