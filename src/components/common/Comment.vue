<template>
    <div class="tmpl">
       <div class="photo-bottom">
           <ul class="comment">
               <li class="photo-comment">
                   <div>
                       <span>发表评论</span>
                       <span><a href="">返回</a></span>
                   </div>
               </li>
               <li class="text-comment">
                   <textarea class="text" v-model="newComment"></textarea>
               </li>
                <li>
                    <mt-button size="large" type="primary" @click="sendMsg">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
           </ul>
           <ul class="commetn-list">
             <li v-for="(msg,index) in msgs" :key="index">
             {{msg.user_name}}:{{msg.content}} {{msg.add_time | relativeTime}}               
             </li>
           </ul>
           <mt-button size="large" type="danger" plain @click="loadMore">加载更多</mt-button>
       </div>
    </div>
</template>
<script>
export default {
    name:'comment',
    props:['cid'],
    data(){
     return {
         msgs:[],
         page:1,
         newComment:''
     }
    },
    created(){
         this.page = this.$route.query.page ||'1'
         this.loadMore()
    },
    methods:{
        // firstLoad(){
        //     this.$axios.get(`getcomments/${this.cid}?pageindex=${this.page}`)
        //  .then(res=>{
        //     if(res.data.message.length=== 0){
        //         this.$toast("没有数据了")
        //     }
        //      this.msgs=res.data.message
        //      this.page++
        //  })
        //  .catch(err=>console.log('评论获取失败',err))
        // },
        loadMore(page){
            this.$axios.get(`getcomments/${this.cid}?pageindex=${this.page}`)
         .then(res=>{
            if(res.data.message.length=== 0){
                this.$toast("没有数据了")
            }
            if(page){
                this.msgs = this.msgs.concat(res.data.message)
            }else{
                this.msgs = res.data.message
            }
            //  this.msgs=this.msgs.concat(res.data.message)
             this.page++
         })
         .catch(err=>console.log('评论获取失败',err))
        },
        sendMsg(){
            //判断评论是否为空
            if(this.newComment.trim()==''){
                this.$toast('评论信息不能为空！')
            }
            //获取评论信息
            this.$axios.post('postcomment/'+this.cid,'content='+this.newComent)
            .then(res=>{
                this.newComment=''
                this.page = 1
                this.loadMore()
            })
            .catch(err=>console.log('获取评论失败',err))
        }
    }
}
</script>
<style scoped>
.text-comment textarea{
    width:100%;
    text-align: left;
    margin: 0 0 2px 0;
    /* padding: 0; */
    /* left: 0; */
}
.tmpl .photo-bottom .text{
    left:0;
}
.photo-comment > div span:nth-child(1){
    float: left;
    font-weight: bold;
    margin-left: 5px;
}
.photo-bottom .comment{
    padding: 0;
}
.photo-bottom .comment-list li{
    padding: 0;
}
.photo-comment > div span:nth-child(2){
    float: right;
}
.photo-comment{
    height: 30px;
    line-height:30px;
    margin-bottom:5px;
}
.comment-list li{
border-bottom: 1px solid rgba(0,0,0,.2);
padding-bottom: 5px;
margin-bottom: 5px;
padding-left: 5px;
}
</style>

