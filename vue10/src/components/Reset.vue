<template>
  <div class="reset">
    <!--第一导航栏部分-->
    <div id="head_top">
      <a @click="backUp"> <span class="more"> < </span> </a>
      <span class="title">重置密码</span>
    </div>
    <!--表单部分-->
    <form action="###">
      <section>
        <div class="zpl3"> <input type="text" placeholder="账号" v-model="username"></div>
        <div class="zpl3"> <input type="text" placeholder="旧密码" v-model="password1"></div>
        <div class="zpl3"> <input type="text" placeholder="请输入新密码" v-model="password2"></div>
        <div class="zpl3"> <input type="text" placeholder="请确认密码" v-model="password3"></div>
        <div class="zpl0">
          <div class="zpl00">
            <input type="text" placeholder="验证码" v-model="value1">
            <img  v-html="captchaCodeImg" :src="captchaCodeImg" height="20rem" width="50rem">
            <span class="zpl000" @click="getCaptchaCode">看不清换一张</span>
          </div>
        </div>
      </section>
    </form>
    <!--确认修改-->
    <!--第四部分,登录按钮-->
    <button class="btn" @click="login">确认修改</button>

    <div class="zpl2" v-if=" showAlert">
      <img src="../images/images/警告.png" alt="">
      <div v-html="alertText"></div>
      <div>
        <button @click="bbb">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  // import { Header } from 'mint-ui';
  // Vue.component(Header.name, Header);
  import Mint from 'mint-ui';

  Vue.use(Mint);

  import 'mint-ui/lib/style.css'

  export default {
    name: "Reset",
    data(){
      return{
        username:'',//用户名
        password1:'',//旧密码
        password2:'',//新密码
        password3:'',//确认新密码
        value1:'',//验证码输入框
        showAlert: false, //显示提示组件
        alertText: null, //提示的内容
        captchaCodeImg:null//验证码
      }
    },
    mounted(){
      //初始化时请求验证码
      Vue.axios.post('https://elm.cangdu.org/v1/captchas').then((res)=>{
        this.captchaCodeImg = res.data.code;
        // console.log(res.data);
      })
    },
    methods:{
      backUp(){
        this.$router.go(-1);
      },
      login(){
        if(this.username == ""){
          this.showAlert = !this.showAlert;
          this.alertText = '请正确输入账号';
        } else if(this.password1 == ""){
          this.showAlert = !this.showAlert;
          this.alertText = '请输入旧密码';
        }else if(this.password2 == ""){
          this.showAlert = !this.showAlert;
          this.alertText = '请输入新密码';
        }else if(this.password3 == ""){
          this.showAlert = !this.showAlert;
          this.alertText = '请输入确认密码';
        }else if(this.password2 != this.password3 ){
          this.showAlert = !this.showAlert;
          this.alertText = '两次输入密码不一致';
        }else if(this.value1 == ''){
          this.showAlert = !this.showAlert;
          this.alertText = '请输入验证码';
        } else{
          //    发送axios请求
          Vue.axios.post('https://elm.cangdu.org/v2/changepassword',{
            //把自定义的变量赋值给数据库的参数
            'username':this.username,
            'oldpassWord':this.password1,
            'newpassword':this.password2,
            'confirmpassword':this.password3,
            'captcha_code':this.value1,
          }).then((res)=>{
            console.log(res.data);
            if(res.data.message=='密码不正确'){
              this.showAlert = !this.showAlert;
              this.alertText = '密码不正确';
            }else if(res.data.message=='验证码不正确'){
              this.showAlert = true;
              this.alertText = '验证码不正确';
            }else{
              this.showAlert = !this.showAlert;
              this.alertText = '修改密码成功';
              this.alertText = this.data.message;
            }
          }).catch((err)=>{
            console.log('请求错误',err);
          })

          // //  判断是否能找到当前用户
          Vue.axios.get('https://elm.cangdu.org/v1/user').then((res)=>{
            if(!this.username){
              this.showAlert = !this.showAlert;
              this.alertText = '未找到当前用户';
            }
            console.log(res.data);
          }).catch((err)=>{
            console.log('请求错误',err);
          })
        }
      },
      bbb(){
        this.showAlert = !this.showAlert;
        if(this.alertText == '修改密码成功'){
          this.$router.go(-1);
        }
      },
      getCaptchaCode(){
        //请求验证码
        Vue.axios.post('https://elm.cangdu.org/v1/captchas').then((res)=>{
          this.captchaCodeImg = res.data.code;
          console.log(res.data);
          console.log(res);
        })
      },
    },
  }
</script>

<style scoped>
  .reset{
    width:100%;
    height: 100%;
    background:#f5f5f5;
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
  }
  button{
    margin-top: 1rem;
    margin-left: 0.5rem;
  }
  .zpl2{
    width: 13rem;
    height: 10rem;
    background: white;
    position: absolute;
    left: 1.7rem;
    bottom: 9rem;
    text-align: center;
    padding-top: 1rem;

  }
  .zpl2 button{
    width: 13rem;
    position: absolute;
    right: 0;
    bottom: 0;
    color: white;
  }
  .zpl2 img{
    width: 35%;
    height: 4rem;

  }
  section{
    width: 100%;
    height: 10.9rem;
    margin-top: 0.5rem;
    font-size: 0.7rem;
    background: white;

  }
  .zpl3{
    border-bottom:2px #f5f5f5 solid ;
  }
  .zpl3 input{
    border: 0;
    width: 100%;
    height: 2rem;
    padding-left: .5rem;
  }
  .zpl0{
    width: 100%;
    height: 3rem;
  }
  input{
    outline: none;
  }
  .zpl00{
    line-height: 2.5rem;
  }
  .zpl00 input{
    border: 0;
    width: 8rem;
    padding-left: .5rem;
  }
  img{
    width: 3rem;
    height: 1.5rem;
  }
  .zpl000{
    font-size: 0.7rem;
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
</style>
