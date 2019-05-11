<template>
  <!--整体容器-->
    <div class="register">

      <!--第一导航栏部分-->
         <div class="zplson1">
           <!--<span class="zpl0"><</span>-->
           <router-link :to="{}"><</router-link>
           <span class="zpl1">密码登录</span>
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

          <mt-field label="验证码">
            <!--<img src="###" height="45px" width="100px">-->
            <!--<span>看不清<br/>-->
              <!--再换一张</span>-->
            <div>
              <img  v-html="captchaCodeImg" :src="captchaCodeImg" height="45px" width="60px">
              <span @click="getCaptchaCode">看不清换一张</span>
            </div>
          </mt-field>
        </section>
      </form>
<!--注册页面-->
      <!--第三部分,温馨提示-->
      <div class="zplson3">
        <div class="zpl5">温馨提示:未注册过的账号,登录时将自动注册</div>
        <div class="zpl6">注册过的用户可凭账号密码登录</div>
      </div>

      <!--第四部分,登录按钮-->
      <button class="btn btn-primary btn-lg"style="width: 15rem" @click="login">登录</button>
      <div class="zpl7">
       <router-link :to="{path:'/reset'}">重置密码?</router-link>
       <div class="zpl8" v-if=" showAlert">
         <div class="el-icon-warning"></div>
         <div v-text="alertText"></div>
         <button style="width: 12rem;background: green" @click="aaa">确认</button>
       </div>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue'
    export default {
        name: "Register",
      data(){
          return{
            // loginWay: false, //登录方式，默认短信登录
            username:'',//用户名
            passWord:'',//密码
            showPassword:false,//是否显示密码
            val:false,//点击滑块
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
            captchaCodeImg: null, //验证码地址
          }
      },
      methods:{
          login(){
            if(this.username == ''&& this.passWord == '' && this.val == '' ){
              this.showAlert = true;
              this.alertText = '请输入账号/密码/验证码';
            }else if(this.username == '' && this.passWord != ''&& this.val != ''){

              this.showAlert = true;
              this.alertText = '请输入账号';
            }else if(this.username != ''&& this.passWord == '' && this.val != ''){
              this.showAlert = true;
              this.alertText = '请输入密码';
            }else if(this.username != ''&& this.passWord != '' && this.val == ''){
              this.showAlert = true;
              this.alertText = '请输入验证码';
            }
          },
        aaa(){
          this.showAlert = !this.showAlert;
        },
        changePassword(){
            this.showPassword = !this.showPassword;
            console.log(this.showPassword);
          },

         getCaptchaCode(){
           //请求验证码
           Vue.axios.post('https://elm.cangdu.org/v1/captchas').then((res)=>{
             this.captchaCodeImg = res.data.code;
             console.log(res.data);
           })
         },

      },
      mounted(){
        //请求验证码
        Vue.axios.post('https://elm.cangdu.org/v1/captchas').then((res)=>{
          this.captchaCodeImg = res.data.code;
          console.log(res.data);
        })
      }
    }
</script>

<style scoped>
.register{
  width:100%;
  height: 100%;
  background:gainsboro;
}
  .zplson1{
    width: 100%;
    height: 10%;
    background:#3190e8;
    font-size: 1rem;
    text-align: center;
    line-height: 3rem;
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
  .zpl1{
    display: block;
    width: 50%;
    height: 100%;
    font-size: 1.3rem;
    color: white;
    float:left;
    /*background: red;*/
    margin-left: 2rem;
    /*line-height: 10px;*/
    /*text-align: center;*/
  }

  section{
    width: 100%;
    /*height: 80%;*/
    margin-top: 0.5rem;
    background: white;
  }
.zpl2{
  padding: 0.7rem;
  border-bottom: 1px solid gray;
  /*background: red;*/
}
.zpl3{
  padding: 0.7rem;
  border-bottom: 1px solid gray;
  /*background: yellow;*/
}
.zpl3-1{
  float: right;
}
.zpl4 a{
  font-size: 0.5rem;
}
  input{
    font-size: 1rem;
    border: none;
  }
  .zpl5{
    font-size: 0.6rem;
    color: red;
    margin-left: 0.5rem;
    margin-top: 0.3rem;
  }
  .zpl6{
    font-size: 0.7rem;
    color: red;
    margin-left: 0.5rem;
    margin: 0.3rem;
  }
  .zpl7{
    font-size: 0.8rem;
    float: right;
    padding: 1rem;
  }
button{
  margin-top: 1rem;
  margin-left: 0.5rem;
}
  .zpl8{
    width: 12rem;
    height: 10rem;
    background: white;
    position: absolute;
    left: 3rem;
    bottom: 10rem;
  }
  .zpl8 button{
    position: absolute;
    right: 0;
    bottom: 0;
  }
</style>
