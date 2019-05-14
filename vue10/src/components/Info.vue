<template>
  <div class="info">
    <!--第一导航栏部分-->
    <div class="zplson1">
      <router-link :to="{path:'/wode'}"><</router-link>
      <span class="zpl1">账户信息</span>
    </div>
    <!--上传头像部分-->
      <div class="zpl2">
        <div class="zpl8">
          <input type="file">
          <router-link :to="{}" class="zpl3">></router-link>
        </div>
        <div class="zpl4">
          <span>用户名</span>
          <router-link :to="{}">></router-link>
        </div>
        <div class="zpl5">
          <span>收货地址</span>
          <router-link :to="{}">></router-link>
        </div>
      </div>
    <div class="a">账号绑定</div>
    <div class="zpl6 el-icon-mobile-phone">
      <span>手机</span>
      <router-link :to="{}">></router-link>
    </div>
    <div class="a">安全设置</div>
    <div class="zpl7">
      <span>登录密码</span>
      <router-link :to="{}">修改></router-link>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  //小图标
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';

  Vue.use(ElementUI);
    export default {
        name: "Info"
    }
</script>

<style scoped>
  *{
  padding: 0;
  margin: 0;
  }
  html,body{
  width: 100%;
  height: 100%;
  }
  .info{
    width:100%;
    height: 100%;
    background:gainsboro;
    position: absolute;
    letf:0;
    right: 0;
    bottom: 0;
    z-index: 20;
  }
  .zplson1{
    width: 100%;
    height: 10%;
    background:#3190e8;
    font-size: 0.7rem;
    text-align: center;
    line-height: 3rem;
    margin-bottom: 1rem;
  }
  .zplson1 a{
    width: 10%;
    /*height: 100%;*/
    display: block;
    color: white;
    font-size: 1rem;
    float:left;
    /*background: blue;*/
  }
  .zpl1{
    display: block;
    width: 50%;
    /*height: 100%;*/
    font-size: 1rem;
    color: white;
    float:left;
    margin-left: 2rem;
  }
  .zpl2{
    width: 100%;
    height:30%;
    /*background: red;*/
  }
  .zpl2 div{
    /*width: 100%;*/
    /*height: 33%;*/
    background:white;
    border-bottom: 0.01rem solid grey;
  }
  .zpl3{
    position: absolute;
    top: 4.5rem;
    right:1rem;
    color: grey;
  }
  .zpl4{
    width: 100%;
    height: 33%;
    background:green;
  }
  .zpl5{
    width: 100%;
    height: 33%;
    background:green;
  }
  .zpl8{
    width: 100%;
    height: 34%;
    background:green;
  }
  .zpl4 span{
    font-size: 0.7rem;
    line-height: 2.5rem;
    padding-left: 0.5rem;
  }
  .zpl4 a{
    position: absolute;
    top: 7rem;
    right:1rem;
    color: grey;
  }
  .zpl5 span{
    font-size: 0.7rem;
    line-height: 2.5rem;
    padding-left: 0.5rem;
  }
  .zpl5 a{
    position: absolute;
    top:10rem;
    right:1rem;
    color: grey;
  }
  .zpl6 span{
     font-size: 0.7rem;
     line-height: 2.5rem;
    padding-left: 0.5rem;
   }
  .zpl6 a{
    position: absolute;
    top:14rem;
    right:1rem;
    color: grey;
  }
  .zpl6{
    width: 100%;
    height:8%;
    background: ghostwhite;
  }
  .zpl7 span{
    font-size: 0.7rem;
    line-height: 2.5rem;
    padding-left: 0.5rem;
  }
  .zpl7 a{
    position: absolute;
    top:17rem;
    right:1rem;
    font-size: 0.8rem;
    color: grey;
  }
  .zpl7{
    width: 100%;
    height:8%;
    background: ghostwhite;
  }
  .a{
    font-size: 0.6rem;
    padding-left: 0.5rem;
  }
</style>
