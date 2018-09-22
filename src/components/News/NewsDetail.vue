<template>
    <div class="tepl">
        <nav-bar :title="title"></nav-bar>
        <div class="news-title">
            <p class="title">{{newsDetail.title}}</p>
            <div>
                <span>{{newsDetail.click}}次点击</span>
                <span>分类：修养身心</span>
                <span>添加时间:{{newsDetail.add_time | covertTime('YYYY年MM月DD日')}}</span>
            </div>
        </div>
        <div class="news-content" v-html="newsDetail.content">新闻详情</div>
    </div>
   
</template>
<script>
export default {
    data(){
        return {
          newsDetail:{},
          title:''
        }
    },
    created(){
        let id = this.$route.query.id
        this.$axios.get('getnew/' + id)
        .then(res=>{
         this.newsDetail = res.data.message[0]
        })
        .catch(err=>console.log(err))
    },
    beforeRouteEnter(to,from,next){
        let title = ''
        if(from.name==null){
            if(to.name==='news.detail')
            title='新闻详情'
        }else if(to.name==='photo.info'){
            title='商品图文介绍'
        }else if(from.name==='news.list'){
            title='新闻详情'
        }else if(from.name==='goods.detail'){
            title='商品图文介绍'
        }
        next(vm=>{
            vm.title=title
        })
    }
}
</script>
<style scoped>
.news-title .title{
    font: 18px;
    color:blue;
}
</style>

