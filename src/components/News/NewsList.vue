<template>
    <div>
        <nav-bar title="新闻列表" />
        <div class="demo">
            <ul>
                <li v-for="news in NewsList" :key="news.id">
                    <router-link :to="{name:'news.detail',query:{id:news.id}}" >
                        <img :src="news.img_url" alt="">
                        <div>
                            <div class="content">
                                <span class="title">{{news.title}}</span>
                                <div class="news-desc">
                                    <p class="click">点击数：{{news.click}}</p>
                                    <p class="time">发表时间：{{news.add_time | covertTime('YYYY-MM-DD')}}</p>
                                </div>
                            </div>
                        </div>
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
          NewsList:[]
        }
    },
    created(){
        this.$axios.get('getNewsList')
        .then(res=>{
         this.NewsList = res.data.message;
        })
        .catch(err=>console.log("新闻列表异常",err))
    }
}
</script>
<style scoped>
.demo li{
    width: 100%;
    height:100px;
    /* line-height: 50px; */
    margin: 10px;
    padding: -20;
    overflow: hidden;
    border-bottom: 1px solid #ffffff;
    text-align: left;
}
.demo ul{
    margin: 0;
    padding: 0;
}
.demo a{
    text-decoration: none;
    font: 8px;
    color: #555555;
}
.demo img{
    height: 80px;
    width: 100px;
    float: left;
    margin: 0;
}
.title{
    
    overflow: hidden;
}
.news-desc{
    bottom: 2px;
}
.click{
    float: left;
    margin: 3px 5px 1px 0px;
    color: blue;
}
.time{
    float: left;
    color:blue;
    margin:3px 5px 1px 0px;
} 
</style>

