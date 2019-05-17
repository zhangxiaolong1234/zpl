<template>
  <div class="HbExchange">
    <!--第一导航栏部分-->
    <div id="head_top">
      <router-link :to="{path:'/benefit'}"><span class="more"> < </span></router-link>
      <span class="title">兑换红包</span>
    </div>
    <!--第二部分,输入的兑换码-->
    <div class="content">
      <input type="text" placeholder="请输入兑换码" v-model="exchange" @input="reg" class="input1"></div>
    <div class="cont">
      <input type="text" placeholder="验证码" v-model="yanZheng" @input="reg" maxlength="4" class="input2">
      <p class="yanzheng">
        <!--定义属性, 让src路径 = 数据库传过来的验证码,在展示出来-->
        <img :src="imgCode" v-html="imgCode"  height="50rem" width="55rem">
        <!--<span @click="view">看不清</span>-->
        <span @click="view">换一张</span>
      </p>
    </div>
    <div class="zpl6">
      <!--兑换-->
      <input type="text" placeholder="兑换" :disabled="disabled" @click="aaa" :class="{green:isgreen}" class="btn">
    </div>

    <div class="zpl7" v-if="isshow">
      <img src="../images/images/警告.png" alt="">
      <div>{{vtext}}</div>
      <button style="width: 12rem;background: #4cd964" @click="hidden">确认</button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  Vue.use(VueAxios, axios)
  export default {
    name: "Exchange",
    data(){
      return{
        imgCode:null,//定义空变量,存储验证码
        isshow:false,//用于显示/隐藏弹框
        vtext:null,//用于展示弹框中的文字
        exchange:null,//双向绑定兑换码
        yanZheng:null,//双向绑定验证码
        isgreen:false,//按钮显示颜色为绿色
        user_id:null,//数据库存储的用户名的id
        disabled:true,//刚开始禁止点击兑换按钮
      }
    },
    mounted(){
      //请求验证码
      this.view();
      this.user_id = sessionStorage.user_id;
    },
    methods:{
      //    获取验证码
      view(){
        //请求验证码
        Vue.axios.post('https://elm.cangdu.org/v1/captchas').then((res)=>{
          this.imgCode = res.data.code;
          // console.log(res.data);
        })
      },
      //  点击确认按钮,隐藏弹框
      hidden(){
        this.isshow = false;
        console.log("111");
      },
      aaa(){
        this.isshow = true;
        this.vtext = '无效的兑换码';
      },
      reg(){
        var isreg = /^\d{4}$/;
        var forreg = /^\d+$/
        if(forreg.test(this.exchange) && isreg.test(this.yanZheng)){
          this.disabled = false;
          this.isgreen = true;
        }else{
          this.isgreen = false;
          this.disabled = true;
        }
      },
      voucher(){
        //  点击兑换按钮的时候,获取兑换码
        Vue.axios.post('https://elm.cangdu.org/v1/users/:user_id/hongbao/exchange',{
          user_id:this.user_id,
          exchange_code:this.exchange,
          captcha_code:this.yanZheng,
        }).then((res)=>{
          this.isshow = true;
          this.vtext = res.data.message;
          console.log(res.data);
        }).catch((err)=>{
          console.log('请求错误',err);
        })
      }
    },
  }
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  .HbExchange{
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
  .content{
    width: 100%;
  }
  .input1{
    width: 90%;
    display: inline-block;
    margin: 1rem 5% 1rem 5%;
  }
  input{
    font-size:.8rem;
    color: #666;
    border: none;
    padding: .5rem 0 .5rem .3rem;
  }
  .input2{
    margin: 0rem 2% 0rem 5%;
    display: block;
    float: left;
  }
  p{
    margin: 0;
  }
  .yanzheng{
    width: 31%;
    height: 2.4rem;
    background-color: #fff;
    display:block;
    float: left;
  }
  .yanzheng span{
    font-size: .6rem;
  }
  .btn{
    color:#fff ;
    width: 90%;
    display: inline-block;
    margin: 1rem 5% 1rem 5%;
    background-color: #5555;
  }
  .zpl7{
    width: 12rem;
    height: 8.5rem;
    background: white;
    position: absolute;
    left: 2.5rem;
    bottom: 12rem;
    text-align: center;
  }
  .zpl7 button{
    color: white;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .zpl7 img{
    width: 35%;
    height: 4rem;
  }
</style>
