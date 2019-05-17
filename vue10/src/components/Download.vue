<template>
    <div class="download">
      <!--第一导航栏部分-->
      <div id="head_top">
        <routerLink :to="{path:'/wode'}" class="more"> < </routerLink>
        <span class="title">下载</span>
      </div>
      <div class="zpl2">
        <img src="../images/images/elmlogo.jpeg" alt="">
        <p>下载饿了吗App</p>
      </div>
      <div class="zpl3" @click="xiazai">下载</div>
      <!--弹框部分-->
      <div class="zpl4" v-if="app1">
        <img src="../images/images/警告.png" alt="">
        <p>IOS用户请前往AppStore下载</p>
        <button style="width: 100%;background:#4cd964;margin-top: 1rem" @click="queren">确认</button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Download",
      data(){
          return{
            app1:false,//点击下载会弹出的框
          }
      },
      methods:{
          xiazai(){
            this.app1 = true;
          },
        queren(){
            this.app1 = false;
        },
      },
    }
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  .download{
    width: 100%;
    height: 100%;
    background: white;
  }
  #head_top{
    width: 100%;
    height: 1.95rem;
    background-color: #3190e8;
  }
  .more{
    width: 10%;
    color: #fff;
    font-size: 1rem;
    height: 1.95rem;
    line-height: 1.95rem;
    padding-left:.3rem;
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
  .zplson1 a{
    width: 10%;
    display: block;
    color: white;
    font-size: 1rem;
    float:left;
    background: #3190e8;
  }
  .zpl1{
    width: 90%;
    font-size: 1rem;
    color: white;
    float:left;
    background: #3190e8;
    text-align: center;
    line-height: 1.5rem;
  }
  .zpl2{
    width: 50%;
    height: 8rem;
    margin:2rem 4rem;
    border-radius: 10%;
  }
  .zpl2 img{
    width: 100%;
    height: 8rem;
    border-radius: 10%;
  }
  .zpl2 p{
    font-size: 0.7rem;
    text-align: center;
    margin-top: 0.5rem;
  }
  .zpl3 {
    background-color: #4cd964;
    font-size: .7rem;
    color: #fff;
    text-align: center;
    margin: 0 .7rem;
    line-height: 1.8rem;
    border-radius: .2rem;
    margin-top: .5rem;
  }
  .zpl4{
    width: 60%;
    background: white;
    font-size: 0.7rem;
    text-align: center;
    position: absolute;
    bottom:11rem;
    left: 3rem;
  }
  .zpl4 img{
    width: 50%;
    margin-top: 0.5rem;
  }
</style>
