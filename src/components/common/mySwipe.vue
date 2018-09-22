<template>
    <mt-swipe :auto="4000">
  <mt-swipe-item v-for="(img,index) in imgs" :key="index">
    <img :src="img.img||img.src">
  </mt-swipe-item>
</mt-swipe>
</template>
<script>
export default {
    name:"my-swipe",
    props:['url'],
    data(){
        return{
             imgs:[],
        }
    },
    created(){
        this.$axios.get(this.url)
    .then(res=>{
      this.imgs=res.data.message
    //   console.log(res.data.message)
    })
    .catch(err=>console.log('轮播图获取异常',err))
    }
}
</script>
<style scoped>
.mint-swipe{
  height:200px;
  width: 100%;
  display: block;
  /* position: absolute; */
}
img{
  width:100%;
  /* align-items: flex-start; */
  top:0;
  left:0;
  height:200px;
  padding: 0 0 20 0;
}
</style>

