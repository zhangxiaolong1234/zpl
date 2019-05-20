<template>
  <!--整体容器-->
  <div class="register">

    <!--第一导航栏部分-->
    <div id="head_top">
      <a @click="backUp"> <span class="more"> < </span> </a>
      <span class="title">密码登录</span>
    </div>
    <!--第二部分,输入框部分-->
    <!--开始判断点击的是登录还是注册-->

    <form action="###">
      <section>
        <div class="zpl2"> <input type="text" placeholder="账号" v-model="username"></div>

        <div class="zpl3">
          <input v-if="!showPassword" type="password" placeholder="密码" v-model="passWord">
          <input v-else type="text" placeholder="密码" v-model="passWord">
          <div @click="changePassword" class="zpl3-1" >
            <el-switch
              v-model="val"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </div>
        </div>

        <!--<mt-field>-->
        <!--<img src="###" height="45px" width="100px">-->
        <!--<span>看不清<br/>-->
        <!--再换一张</span>-->
        <div class="zpl0">
          <div class="zpl00">
            <input type="text" placeholder="验证码" v-model="yanZhengMa">
            <img  v-html="captchaCodeImg" :src="captchaCodeImg" height="20rem" width="50rem">
            <span class="zpl000" @click="getCaptchaCode">看不清换一张</span>
          </div>
        </div>
        <!--</mt-field>-->
      </section>
    </form>
    <!--注册页面-->
    <!--第三部分,温馨提示-->
    <div class="zplson3">
      <div class="zpl5">温馨提示:未注册过的账号,登录时将自动注册</div>
      <div class="zpl6">注册过的用户可凭账号密码登录</div>
    </div>

    <!--第四部分,登录按钮-->
    <button class="btn  btn-lg" @click="login">登录</button>
    <div class="zpl7">
      <router-link :to="{path:'/reset'}">重置密码?</router-link>
      <!--弹框-->
      <div class="zpl8" v-if=" showAlert">
        <img src="../images/images/警告.png" alt="">
        <div v-text="alertText"></div>
        <button @click="aaa">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  Vue.use(VueAxios, axios)

  export default {
    name: "Register",
    data(){
      return{
        username:'',//用户名
        passWord:'',//密码
        yanZhengMa:'',//验证码
        showPassword:false,//是否显示密码
        val:false,//点击滑块
        showAlert: false, //显示提示框组件
        alertText: null, //提示的内容
        captchaCodeImg: null, //验证码地址
        obj:{},//用于判断存储密码虽然输入,但是输入的值不正确
      }
    },
    methods:{
      backUp(){
        this.$router.go(-1);
      },
      login(){
        if(this.username == ''&& this.passWord == '' && this.yanZhengMa == '' ){
          this.showAlert = true;
          this.alertText = '请输入账号/密码/验证码';
        }else if(this.username == '' && this.passWord != ''&& this.yanZhengMa != ''){

          this.showAlert = true;
          this.alertText = '请输入账号';
        }else if(this.username != ''&& this.passWord == '' && this.yanZhengMa != ''){
          this.showAlert = true;
          this.alertText = '请输入密码';
        }else if(this.username != ''&& this.passWord != '' && this.yanZhengMa == ''){
          this.showAlert = true;
          this.alertText = '请输入验证码';
        } else if(this.username != "" &&
          this.passWord != "" &&
          this.yanZhengMa != ""){
          // 向后台发送请求,获取后台数据,并保存到数据库内
          Vue.axios.post('https://elm.cangdu.org/v2/login',{
            'username':this.username,
            'password':this.passWord,
            'captcha_code':this.yanZhengMa,
          }).then((res)=>{
            if (res.data.message=='密码错误'){
              this.showAlert = true;
              this.alertText = '密码错误';
            }else if(res.data.message=='验证码不正确'){
              this.showAlert = true;
              this.alertText = '验证码不正确';
            }else {
              this.$store.commit("recordUserInfo",res.data);
              this.$store.commit('setUserName',this.username);
              //console.log( this.$store.state.username);
              this.$router.go(-1);
            }
          }).catch((err)=>{
            console.log('请求错误',err);
          });
        }

      },
      aaa(){
        this.showAlert = !this.showAlert;
        //请求验证码
        Vue.axios.post('https://elm.cangdu.org/v1/captchas').then((res)=>{
          this.captchaCodeImg = res.data.code;
          // console.log(res.data);
        })
      },
      changePassword(){
        this.showPassword = !this.showPassword;
        console.log(this.showPassword);
      },

      getCaptchaCode(){
        //请求验证码
        Vue.axios.post('https://elm.cangdu.org/v1/captchas').then((res)=>{
          this.captchaCodeImg = res.data.code;
          // console.log(res.data);
        })
      },
    },
    mounted(){
      //请求验证码
      Vue.axios.post('https://elm.cangdu.org/v1/captchas').then((res)=>{
        this.captchaCodeImg = res.data.code;
        // console.log(res.data);
      });

    },
  }
</script>

<style scoped>
  @keyframes allShow{
    0%   { opacity: 0 }
    100% {opacity: 1}
  }
  .register{
    width:100%;
    height: 100%;
    background:#f5f5f5;
    animation: allShow 1s ease-in-out;
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
  }
  .title{
    width: 77%;
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
    height: 100%;
    display: block;
    color: white;
    font-size: 1.3rem;
    float:left;
    /*background: blue;*/
  }

  section{
    width: 100%;
    /*height: 80%;*/
    margin-top: 0.5rem;
    background: white;
  }
  .zpl2{
    padding:0.3rem 0 0.3rem 0.8rem;
    border-bottom: 2px solid #f5f5f5;
    /*background: red;*/
  }
  .zpl3{
    padding:0.3rem 0 0.3rem 0.8rem;
    border-bottom: 2px solid #f5f5f5;
    /*background: yellow;*/
  }
  .zpl0{
    width: 100%;
    height: 3rem;
  }
  input{
    width: 8rem;
  }
  .zpl00{
    padding-left: .8rem;
    line-height: 2.5rem;
  }
  .zpl00 input{
    width: 7rem;
  }
  img{
    width: 3rem;
    height: 1.5rem;
  }
  .zpl3-1{
    float: right;
    padding-right: 1rem;
  }
  .zpl4 a{
    font-size: 0.5rem;
  }
  input{
    font-size: .7rem;
    border: none;
  }
  .zpl5{
    font-size: 0.6rem;
    color: red;
    margin-left: 0.5rem;
    margin-top: 0.3rem;
  }
  .zpl000{
    font-size: 0.7rem;
  }
  .zpl000 input{
    width: 5rem;
  }
  .zpl6{
    font-size: 0.7rem;
    color: red;
    margin-left: .5rem;
    margin:.3rem;
  }
  .zpl7{
    font-size: 0.8rem;
    float: right;
    padding: 1rem;
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
    margin-left: 5%;
    margin-top: 1rem;
    outline: none;
    border: 0;

  }
  .zpl8{
    width: 12rem;
    height: 8.5rem;
    background: white;
    position: absolute;
    left: 2.5rem;
    bottom: 8rem;
    text-align: center;
  }
  .zpl8 button{
    width: 100%;
    margin: 0;
    margin-top: 1rem;
  }
  .zpl8 img{
    width: 35%;
    height: 4rem;
  }
</style>
