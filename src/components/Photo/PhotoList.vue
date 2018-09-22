 <template>
     <div>
         <nav-bar title="图文共享"></nav-bar>
         <div class="photo-header">
             <ul>
                 <li v-for="c in category" :key="c.id">
                     <a href="javascript:;" @click="loadImgsBycaategoryId(c.id)" class="title">{{c.title}}</a>
                 </li>
             </ul>
         </div>
         <div class="photo-list">
             <ul>
                 <li v-for="img in imgs" :key="img.id" class="pic">
                     <router-link :to="{name:'photo.detail',query:{id:img.id}}">
                         <img v-lazy="img.img_url">
                         <p class="group">
                             <span>{{img.title}}</span>
                             <br>
                             <span class="zhaiyao">{{img.zhaiyao}}</span>
                         </p>
                     </router-link>
                 </li>
             </ul>
         </div>
     </div>
 </template>
 <script>
 export default {
     data(){
         return {
             imgs:[],
             category:[]
         }
     },
     beforeRouteUpdate(to,from,next){
    // console.log(to)
    this.loadImgById(to.params.categoryId)
    next()
     },
     created(){
         //获取路由参数ID
             let categoryId = this.$route.params.categoryId
             this.loadImgById(categoryId) 
             this.$axios.get('/getimgcategory')
             .then(res=>{
                 this.category = res.data.message
                 this.category.unshift({
                     id:0,
                     title:'全部'
                 })
             })
             .catch(err=>console.log('分类信息有误',err))
     },
     methods:{
         loadImgsBycaategoryId(categoryId){
             this.$router.push({
                 name:'photo.list',
                 params:{
                     categoryId
                 }
             });
         },
         loadImgById(id){
                 //通过URL拼接参数发请求
         this.$axios.get('getimages/'+ id)
         .then(res=>{
             this.imgs = res.data.message
             //判断图片imgs.length=0
             if(this.imgs.length==0){
                 this.$toast({
                     message:'no more pictures',
                     duration:5000,
                     position:top
                 })
             }
         })
         .catch(err=>console.log('图片获取失败',err))
         }
     }
     
 }
 </script>
 <style scoped>
 img[lazy=loading]{
     height: 300px;
     width: 100%;
     margin: auto;

 }
 .photo-list .zhaiyao{
  /* position:absolute; */
  bottom: 0;
  /* opacity: 0.6; */
  /* display: none; */
  overflow: hidden;
  width:100%;
  height: 100px;
  color: black;
 }
 /* .photo-list .group{
     position: relative;
     display: inline-block;
 }
 .photo-list .group:hover .zhaiyao{
    display: block;
    width: 100%;
    text-align: center;
 } */
 .photo-list .pic{
     list-style: none;
     margin: 0 auto;
 }
 .photo-header .title{
     float: left;
     overflow: hidden;
     margin-right: 5px;
 }
 </style>
 
 