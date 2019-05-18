<template>
  <div class="service">
    <div id="head_top">
      <a @click="backUp"> <span class="more"> < </span> </a>
      <span class="title">服务中心</span>
    </div>
    <div class="content">
      <div class="content_left">
        <img src="../img/11.png" alt="">
        <p>在线客服</p>
      </div>
      <div class="content_right">
        <img src="../img/22.png" alt="">
        <p>在线客服</p>
      </div>
      <div style="clear:both;"></div>
    </div>
    <p class="hot_t">热门问题</p>
      <ul class="list" v-if="serviceData">
        <li v-for="(item, index) in questionTitle" :key="index" class="question_title" @click="toQuestionDetail(item, index)" >
        <span class="font">{{item}}</span>
        <span class="button"> > </span>
        </li>
      </ul>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import  Vue from  'vue';
  export default {
    name:'Service',
    data(){
      return{
        serviceData: null, //服务信息
        questionTitle: [], //问题标题
        questionDetail: [], //问题详情
      }
    },
    mounted() {
        Vue.axios.get('/v3/profile/explain').then((res) => {
          this.serviceData=res.data;
          for(var key in this.serviceData){
            //console.log(key);
            //console.log(this.serviceData[key]);
            let avoidRepeat = false;
            this.questionTitle.forEach((insertItem) => {
              //防止重复的数据，后台返回的数据有些是重复的
              if (insertItem == this.serviceData[key]) {
                avoidRepeat = true;
              }
            })
            //将标题和内容分别放进数组中
            if (key.indexOf('Caption') !== -1 && !avoidRepeat) {
              this.questionTitle.push(this.serviceData[key]);
            }else if(!avoidRepeat){
              this.questionDetail.push(this.serviceData[key]);
            }
          }

        });


    },
    methods: {
      backUp(){
        this.$router.go(-1);
      },
      toQuestionDetail(item, index){
        this.$router.push({name:'sd',path:'/service/serviceDetail',params:{tit:JSON.stringify(this.questionTitle[index]),det:JSON.stringify(this.questionDetail[index])}});
        // for(var titlea in this.questionTitle){
        //
        //   for(var detaila in this.questionTitle){
        //     this.$router.push({name:"/service/serviceDetail",params:{title:this.questionTitle.stringify(this.questionDetail),det:JSON.stringify(this.questionDetail)}});
        //   }
        // }

      }
    }
  }
</script>

<style scoped>
  .service{
    width: 100%;
    background-color: #fff;
  }
  #head_top{
    width: 100%;
    height: 1.95rem;
    background-color: #3190e8;
    position: fixed;
  }
  .more{
    width: 10%;
    color: #fff;
    height: 1.95rem;
    margin-left:.1rem;
    display:block;
    position: absolute;
  }
  .title{
    width: 100%;
    text-align: center;
    height: 1.95rem;
    line-height:1.95rem ;
    font-size: .8rem;
    color: #fff;
    font-weight: 700;
    display: inline-block;
  }
  .content{
    width: 100%;
    padding-top: 1.95rem;
    border-bottom: 1px solid #f5f5f5;
  }
  .content img{
    width: 1.5rem;
    margin-top:.6rem;
    margin-left: .3rem;
  }
  .content p{
    margin-top: .4rem;
    font-size: .6rem;
    color: #666;
  }
  .content_left{
    width: 49%;
    border-right: 1px solid #f5f5f5;
    float: left;
    padding-left:2.75rem;
  }
  .content_right{
    width: 50%;
    float: right;
    padding-left:2.75rem;
  }
  .hot_t{
    text-align:left;
    font-size: .75rem;
    color: #333;
    line-height: 3rem;
    padding-left: 1.25rem;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 0;
  }
  .question  .list{
    color: #666;
  }
  .list li{
    font-size: .6rem;
    padding: 0 .7rem;
    line-height: 2rem;
    border-bottom: 1px solid #f5f5f5;
  }
  li .font{
    display:inline-block;
    width:13.5rem;
  }
  li .button{
    display:inline-block;
    width: .6rem;
    height: .6rem;
    color:rgb(153, 153, 153);
  }
</style>

