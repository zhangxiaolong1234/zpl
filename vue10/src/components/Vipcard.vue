<template>
  <div class="vipcard">
    <!--第一导航栏部分-->
    <div id="head_top">
      <routerLink :to="{path:'/wode'}" class="more"> < </routerLink>
      <span class="title">会员中心</span>
    </div>
    <!--显示用户名 -->
    <div class="zpl2">
      <p class="a">为账户<span class="zpl3"> {{userName}} </span>购买会员</p>
    </div>
    <!--会员特权-->
    <div class="zpl4">
      <div class="zpl5">
        <p>会员特权</p>
        <router-link :to="{path:'/vipdescription'}">会员说明></router-link>
      </div>
    </div>
    <!--减免配送费-->
    <div class="zpl6">
      <div class="zpl7">
        <div class="zpl8"> <img src="../images/images/sheng.jpeg" alt=""></div>
        <div class="zpl9">
          <span>减免配送费</span>
          <p>每月减免30单，每日可减免3单，每单最高减4元</p>
          <p>蜂鸟专送专享</p>
        </div>
      </div>
      <div class="zpl7">
        <div class="zpl8"> <img src="../images/images/jifen.jpeg" alt=""></div>
        <div class="zpl9">
          <span>减免配送费</span>
          <p>每月减免30单，每日可减免3单，每单最高减4元</p>
          <p>蜂鸟专送专享</p>
        </div>
      </div>
    </div>
    <div class="zpl10">
      <div class="zpl11">开通会员</div>
      <div class="zpl12">
        <p>1个月 <span> ¥20</span> </p>
        <div class="zpl13">
          <router-link :to="{path:'/payment'}">购买</router-link>
        </div>
      </div>
    </div>
    <div class="zpl14">
      <p>兑换会员</p>
      <router-link :to="{path:'/usecart'}">使用卡号卡密 ></router-link>
    </div>
    <div class="zpl14">
      <p>购买记录</p>
      <router-link :to="{path:'/invoiceRecord'}">开发票 ></router-link>
    </div>
  </div>
</template>

<script>
  import  Vue from  'vue';
  export default {
    name: "Vipcard",
    data(){
      return{
        userName:''
      }
    },
    mounted(){
      Vue.axios.get('https://elm.cangdu.org/v1/user').then((res)=>{
        this.userName=res.data.username;
        this.$store.state.username = this.userName;
      });
    }
  }
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  .vipcard{
    width: 100%;
    height: 100%;
    background: #f1f1f1;
    overflow-y: hidden;
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
  .zpl11{
    width: 90%;
    font-size: 1rem;
    line-height: 2rem;
    border-bottom: 1px #eee solid;
    margin-bottom: .5rem;
  }
  .zpl2{
    font-size:0.7rem;
    padding:0.3rem ;
  }
  .a{
    font-size: .6rem;
    color: #666;
    line-height:1.6rem;
    padding-left: .5rem;
  }
  .zpl3{
    color: #000;
    font-weight: 700;
    font-size: 0.7rem;
  }
  .zpl4{
    background: white;
  }
  .zpl5{
    width: 100%;
    overflow: hidden;
    /*background: red;*/
    padding:0.3rem 0.6rem;

  }
  .zpl5 p{
    float: left;
    font-size: 0.7rem;
    color: #000;
  }
  .zpl5 a{
    float: right;
    font-size: 0.6rem;
    color: darkgray;
  }
  .zpl6{
    width: 100%;
    background: white;
  }
  .zpl7{
    width: 100%;
    overflow: hidden;
    margin: 0.2rem;
    border-top: 0.01rem solid #eee;
    padding-top: .5rem;
    padding-bottom: .5rem;
  }
  .zpl8{
    width: 25%;
    float: left;

  }
  .zpl9{
    width: 70%;
    /*background: greenyellow;*/
    float: left;
    font-size: 0.5rem;
  }
  .zpl9 p{
    color: darkgrey;
  }
  .zpl8 img{
    width: 39%;
    margin: 0.7rem;
  }
  .zpl9 span{
    font-size: 0.6rem;
  }
  .zpl10{
    width: 100%;
    background:white;
    padding: 0.5rem;
  }
  .zpl11{
    font-size: 0.6rem;
  }
  .zpl12{
    width: 100%;
    overflow: hidden;

  }
  .zpl12 p{
    float: left;
    font-size: 0.8rem;
    line-height: 1.4rem;
  }
  .zpl12 span{
    color: orange;
  }
  .zpl13{
    width: 20%;
    height: 1.5rem;
    float: right;
    background: white;
    font-size: 0.7rem;
    text-align: center;
    line-height: 1.5rem;
    color: orange;
    border: 0.05rem solid orange;
    border-radius: 8%;
  }
  .zpl13 a{
    color:orange ;
  }
  .zpl14{
    width: 100%;
    line-height: 2.5rem;
    font-size: 0.7rem;
    padding:0 1rem;
    background-color: white;
    margin-top: 0.4rem;
    overflow: hidden;
  }
  .zpl14 p{
    float: left;
  }
  .zpl14 a{
    float: right;
    color: darkgrey;
  }
</style>


