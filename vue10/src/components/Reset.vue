<template>
    <div class="reset">
        <!--第一导航栏部分-->
        <div class="zplson1">
          <a @click="backUp"> < </a>
          <!--<router-link :to="{path:'register'}"><</router-link>-->
          <span class="zpl1">重置密码</span>
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
      <button class="btn btn-primary btn-lg"style="width: 15rem;background: green" @click="login">确认修改</button>
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
              if(res.data){
                this.showAlert = !this.showAlert;
                this.alertText = '修改密码成功';
              }else{
                this.showAlert = !this.showAlert;
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
          //请求验证码
          Vue.axios.post('https://elm.cangdu.org/v1/captchas').then((res)=>{
            this.captchaCodeImg = res.data.code;
            console.log(res.data);
            console.log(res);
          })
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
  a:active{
    text-decoration: none;
  }
  a:visited{
    text-decoration: none;
  }
  .reset{
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
    margin-bottom: 1rem;
  }
  .zplson1 a{
    width: 10%;
    height: 100%;
    display: block;
    color: white;
    font-size: 1.3rem;
    float:left;
  }
  .zpl1{
    display: block;
    width: 50%;
    height: 100%;
    font-size: 1.3rem;
    color: white;
    float:left;
    margin-left: 2rem;
  }
  button{
    margin-top: 1rem;
    margin-left: 0.5rem;
  }
  .zpl2{
    width: 13rem;
    height: 8rem;
    background: white;
    position: absolute;
    left: 1.7rem;
    bottom: 9rem;
    text-align: center;
  }
  .zpl2 button{
    width: 13rem;
    position: absolute;
    right: 0;
    bottom: 0;
    background: green;
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
    border-bottom: 1px solid gray;
  }
  .zpl3 input{
    width: 100%;
    height: 2rem;
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
  .zpl000{
    font-size: 0.7rem;
  }
</style>
