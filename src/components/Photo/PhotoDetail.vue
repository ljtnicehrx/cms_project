<template>
    <div>
        <nav-bar title="图文详情"></nav-bar>
        <div class="photo-title">
            <p class="title">{{info.title}}</p>
            <span>发起日期：{{info.add_time | covertTime('YYYY-MM-DD')}}</span>
            <span>{{info.click}}次点击</span>
            <span>分类：名生经济</span>
        </div>
        <!-- <ul> -->
            <!-- <li v-for="img in imgs" :key="img.id">
                <img :src="img.src">
            </li> -->
        <!-- </ul> -->
        <vue-preview :slides="imgs"></vue-preview>
        <div class="photo-desc">
            <p v-html="info.content"></p>
        </div>
        <comment :cid="$route.query.id"></comment>
    </div>
</template>
<script>
export default {
    data(){
     return{
         info:{},
         imgs:[]
     }
    },
    created(){
        let id = this.$route.query.id
        this.$axios.get('getimageInfo/'+id)
        .then(res=>{
           this.info = res.data.message[0]
        })
        .catch(err=>console.log('图文详情获取有误',err))
        this.$axios.get('getthumimages/'+id)
        .then(res=>{
            this.imgs = res.data.message
            this.imgs.forEach(img=>{
                img.msrc  = img.src;
                img.h = 400;
                img.w = 600;
            })
        })
        .catch(err=>console.log('获取图片失败了',err))
    }
    
}
</script>
<style scoped>
.title{
    color:blue;
    font: 16px;
}
ul img{
    margin: 5px 0 0 0;
}
/* .img{
    float:left;
} */
</style>

