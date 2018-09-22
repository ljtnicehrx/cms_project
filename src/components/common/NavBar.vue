<template>
    <div class="cms-s-header">
        <h2 @click="goback">返回</h2>
        <h1 class='page-title'>{{title}}</h1>
    </div>
</template>
<script>
export default {
    name:'nav-bar',
    props:['title'],
    data(){
        return {
        }
    },
    methods:{
       goback(){
           this.$router.go(-1);
       }

    }
}
</script>
<style>
body{
    margin: 0;
}
.cms-s-header{
    height:40px;
    background-color: #f7f7f7;
    margin: 0px 0 3px 0;
    display:inline-block;
}
.cms-s-header h2{
    height: 40px;
    line-height: 40px;
    display: inline-block;
    float: left;
    margin: 0;
}
.cms-s-header h1{
    float:right;
    height:40px;
    line-height: 40px;
    text-align: center;
    display:inline-block;
    margin-left: 60px;
    margin-top: 0;
}
/* .cms-s-header .page-title{
    margin-left: 25%;
    color: white;
    height:40px;
    line-height: 40px;
    float: left;
    position: absolute;
    margin-bottom: -120px;
} */
</style>


