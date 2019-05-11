<template>
    <div class="reset">
        <!--第一导航栏部分-->
        <div class="zplson1">
          <router-link :to="{path:'register'}"><</router-link>
          <span class="zpl1">重置密码</span>
        </div>
      <!--表单部分-->
      <form action="###">
        <mt-field  placeholder="账号" v-model="username"></mt-field>
        <mt-field placeholder="旧密码" type="password" v-model="password1"></mt-field>
        <mt-field placeholder="请输入新密码" type="password" v-model="password2"></mt-field>
        <mt-field placeholder="请确认密码" type="password" v-model="password3"></mt-field>
        <!--验证码-->
        <mt-field label="验证码" v-model="value1">
          <img :src="captchaCodeImg" height="45px" width="80px">
          <span @click="yanzhengma">看不清换一张</span>
        </mt-field>
      </form>
      <!--确认修改-->
      <!--第四部分,登录按钮-->
      <button class="btn btn-primary btn-lg"style="width: 15rem" @click="login">登录</button>
        <div class="zpl2" v-if=" showAlert">
          <div class="el-icon-warning"></div>
          <div v-html="alertText"></div>
          <div>
            <button @click="bbb">确认</button>
          </div>
        </div>
    </div>
</template>

<script>
  import Vue from 'vue'
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
        console.log(res.data);
      })
    },
    methods:{
        login(){
            if (this.username == '' && this.password1 != '' && this.password2 != '' && this.password3 != '' && this.value1 != ''){
              this.showAlert = !this.showAlert;
              this.alertText = '请输入正确的账号';
            }else if(this.username != '' && this.password1 == '' && this.password2 != '' && this.password3 != '' && this.value1 != ''){
              this.showAlert = !this.showAlert;
              this.alertText = '请输入正确的密码';
            }else if(this.username != '' && this.password1 != '' && this.password2 == '' && this.password3 != '' && this.value1 != ''){
              this.showAlert = !this.showAlert;
              this.alertText = '新密码不能为空';
            }else if(this.username != '' && this.password1 != '' && this.password2 != '' && this.password3 == '' && this.value1 != ''){
              this.showAlert = !this.showAlert;
              this.alertText = '确认密码不能为空';
            }if(this.username != '' && this.password1 != '' && this.password2 != '' && this.password3 != '' && this.value1 == ''){
            this.showAlert = !this.showAlert;
            this.alertText = '验证码不能为空';
          }else if( this.password2 !=this.password3 ){
            this.showAlert = !this.showAlert;
            this.alertText = '两次密码不一致';
          }else{
            this.showAlert = !this.showAlert;
            this.alertText = '验证码失效';
          }
         },
        bbb(){
          this.showAlert = !this.showAlert;
         },
      yanzhengma(){
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
    background:gainsboro;
  }
  .zplson1{
    width: 100%;
    height: 10%;
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
    height: 10rem;
    background: white;
    position: absolute;
    left: 2rem;
    bottom: 11.5rem;
  }
  .zpl2 button{
    width: 13rem;
    position: absolute;
    right: 0;
    bottom: 0;
    background: blue;
  }
</style>
