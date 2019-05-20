<template>
    <div class="HbRecommend">
      <div id="head_top">
        <router-link :to="{path:'/benefit'}"><span class="more"> < </span></router-link>
        <span class="title">推荐有奖</span>
      </div>
      <img class="banner" src="../images/images/activity.png" alt="">
      <!--微信 QQ 图标-->
      <div class="zpl3">
        <div class="zpl4">
          <img src="../images/images/weixin.png" alt="" class="a" @click="show">
          <p class="b">邀请微信好友</p>
        </div>
        <div class="zpl5">
          <img src="../images/images/qq.png" alt="" class="a" @click="show">
          <p class="b">邀请QQ好友</p>
        </div>
        <div class="zpl6">
          <img src="../images/images/fenxiang.png" alt="" class="a" @click="show">
          <p class="b">面对面邀请</p>
        </div>
      </div>
      <!--累计收益--成功邀请-->
      <div class="zpl7">
        <div class="zpl8">
          <p>累计收益</p>
          <span class="zpl10">0</span>
          <span>元</span>
        </div>
        <div class="zpl9">
          <p>成功邀请</p>
          <span class="zpl11">0</span>
          <span>人</span>
        </div>
      </div>
      <!--收益明细-->
      <div class="zpl12">
        <p>-收益明细-</p>
        <img src="../images/images/qianbao.png" alt="">
        <p class="zpl14">还不赶紧去邀请好友</p>
      </div>
      <!--弹框-->
      <div class="zpl13" v-if="showAlert">
        <img src="../images/images/警告.png" alt="">
        <div v-text="alertText"></div>
        <button style="width: 12rem" @click="hide">确认</button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "HbRecommend",
      data(){
        return{
          showAlert:false,//控制弹框显隐
          alertText:null,//控制弹框内容
        }
      },
      methods:{
        show(){
          this.showAlert = true;
          this.alertText = '请在饿了吗APP中打开';
        },
        hide(){
          this.showAlert = false;
        },
      },
    }
</script>

<style scoped>
  .HbRecommend{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
  }
  #head_top{
    width: 100%;
    height: 1.95rem;
    background-color: #3190e8;
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
  .banner{
    width: 100%;
  }
  .zpl2 img{
    width: 100%;
    height: 6rem;
  }
  @keyframes tipMove{
    0%   { transform: scale(1) }
    35%  { transform: scale(.8) }
    70%  { transform: scale(1.1) }
    100% { transform: scale(1) }
  }
  .zpl3{
    width: 100%;
    background: white;
    margin-top: 0.3rem;
    overflow: hidden;
    padding: 0.3rem;
  }
  button{
    width: 90%;
    height: 2.2rem;
    line-height: 1.3rem;
    font-size: .7rem;
    color: #fff;
    background-color: #4cd964;
    border-radius: .15rem;
    text-align: center;
    margin-top: 1rem;
    outline: none;
    border: 0;
  }
  .zpl4,.zpl5,.zpl6{
    width: 33%;
    float: left;
    font-size: 0.5rem;
    text-align: center;
    background: white;
  }
  .a{
    width: 50%;
  }
  .b{
    margin-top: 0.5rem;
  }
  .zpl7{
    width: 100%;
    /*background: red;*/
    overflow: hidden;
    margin-top: 0.3rem;
  }
  .zpl8,.zpl9{
    width: 50%;
    float: left;
    text-align: center;
    font-size: 0.6rem;
    padding: 0.2rem;
  }
  .zpl8{
    border-right: 0.01rem solid darkgray;
  }
  .zpl10{
    font-size: 1rem;
    color: orangered;
  }
  .zpl11{
    font-size: 1rem;
    color: darkgray;
  }
  .zpl12{
    font-size: 0.7rem;
    text-align: center;
    margin-top: 0.6rem;
  }
  .zpl12 img{
    width: 10%;
    margin: 0.8rem 0 0.3rem 0;
  }
  .zpl13{
    width: 12rem;
    height: 8.5rem;
    background: white;
    font-size: 0.7rem;
    border-radius: .3rem;
    position: absolute;
    left: 2.5rem;
    bottom: 15rem;
    text-align: center;
    animation: tipMove .4s ;
  }
  .zpl13 button{
    font-size: 1rem;
    color: white;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .zpl13 img{
    width: 35%;
    margin-bottom: 0.5rem;
  }
  .zpl14{
    color:darkgray;
  }
</style>
