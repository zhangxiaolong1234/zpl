<template>
  <div class="detail_page">
    <div id="head_top">
      <router-link :to="{path:'/service'}" class="more"> < </router-link>
      <span class="question_title">{{getServiceTitle}}</span>
    </div>
    <div class="detail">{{getServiceDetail}}</div>
  </div>
</template>
<script>
  import  Vue from  'vue';
    export default {
        name: "ServiceDetail",
      computed:{

        getServiceTitle(){

          let title=JSON.parse(this.$route.params.tit);
          return title;
        },
        getServiceDetail(){
          let detail=JSON.parse(this.$route.params.det);
          return detail;
        }
      }

    }
</script>
<style scoped>
  #head_top{
    width: 100%;
    height: 1.95rem;
    background-color: #3190e8;
    position: fixed;
  }
  .question_title{
    width: 100%;
    text-align: center;
    height: 1.95rem;
    line-height:1.95rem ;
    font-size: .8rem;
    color: #fff;
    font-weight: 700;
    display: inline-block;
  }
  .more{
    width: 10%;
    color: #fff;
    height: 1.95rem;
    margin-left:.1rem;
    display:block;
    position: absolute;
  }
  .detail{
    padding-top: 1.95rem;
  }
</style>
