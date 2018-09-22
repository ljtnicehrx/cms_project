<template>
<div>
<my-swipe url="getlunbo"></my-swipe>
<div class="grid">
<my-ul>
  <my-li v-for="(grid,index) in grids" :key="index">
    <router-link :to="grid.router" class="a">
    <span :class="grid.className"></span>
    <span id="title">{{grid.title}}</span>
    </router-link>
  </my-li>
</my-ul>  
</div>
</div>
</template>
<script>
export default {
  data () {
    return {
      imgs:[],//轮播图数据
      grids:[
        {
          className:'cms-news',
          title:'新闻资讯',
          router:{
            name:'news.list'
          }

        },
        {
          className:'cms-photo',
          title:'图文共享',
           router:{
            name:'photo.list',
            params:{categoryId:0}
          }
        },
        {
          className:'cms-news',
          title:'商品展示',
           router:{
            name:'goods.list',
            query:{id:1}
          }
        },
        {
          className:'cms-photo',
          title:'留言反馈',
           router:{
            name:'news.list'
          }
        },
        {
          className:'cms-news',
          title:'搜索资讯',
           router:{
            name:'news.list'
          }
        },
        {
          className:'cms-photo',
          title:'联系我们',
           router:{
            name:'news.list'
          }
        },
      ]
    }
  },
  //创建组件的生命周期 可以操作数据
  created(){
    
  }
}
</script>
<style scoped>
.grid li{
  list-style: none;
  width: 33.3%;
  height: 100px;
  float: left;
  text-align: center;
  line-height: 100px;
  margin:0;
  /* display: flex; */
}

.grid .a{
   text-decoration-line: none;
   text-decoration-style: none;
}
.grid #title{
  /* align-items: flex-end; */
  /* bottom: 2px; */
  position: relative;
  /* left:2px; */
  /* top:180px; */
  bottom:0;
  left: 10;
}
.cms-news {
  background-image: url('../../assets/img/news.png');
  background-repeat: round;
  height:40px;
  width:50px;
  display:inline-block;
}
.cms-photo {
  background-image: url('../../assets/img/picshare.png');
  background-repeat: round;
  height:40px;
  width:50px;
  display:inline-block;
}
</style>

