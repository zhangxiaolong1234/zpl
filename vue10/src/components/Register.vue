<template>
  <!--整体容器-->
    <div class="register">

      <!--第一导航栏部分-->
         <div class="zplson1">
           <!--<span class="zpl0"><</span>-->
           <a @click="backUp"> < </a>
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
      <button class="btn btn-primary btn-lg"style="width: 15rem;background: green" @click="login">登录</button>
      <div class="zpl7">
       <router-link :to="{path:'/reset'}">重置密码?</router-link>
       <div class="zpl8" v-if=" showAlert">
         <img src="../images/images/警告.png" alt="">
         <div v-text="alertText"></div>
         <button style="width: 12rem;background: green" @click="aaa">确认</button>
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
            // loginWay: false, //登录方式，默认短信登录
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
                  if (res.data){
                    console.log(res.data);
                    this.$router.go(-1);
                  }else {
                    this.showAlert = true;
                    this.alertText = res.data.message;
                  }
                console.log(res.data.username);
                this.$router.push({path:"/wode",query:{name:this.username}});
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
  a:active{
    text-decoration: none;
  }
  a:visited{
    text-decoration: none;
  }
.register{
  width:100%;
  height: 100%;
  background:gainsboro;
}
  .zplson1{
    width: 100%;
    height: 3rem;
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
.zpl0{
  width: 100%;
  height: 3rem;
}
input{
  width: 8rem;
}
.zpl00{
  line-height: 2.5rem;
}
img{
  width: 3rem;
  height: 1.5rem;
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
  .zpl000{
    font-size: 0.7rem;
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
    height: 8.5rem;
    background: white;
    position: absolute;
    left: 2.5rem;
    bottom: 8rem;
    text-align: center;
  }
  .zpl8 button{
    color: white;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .zpl8 img{
    width: 35%;
    height: 4rem;
  }
</style>
