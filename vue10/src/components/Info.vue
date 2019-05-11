<template>
  <div class="info">
    <!--第一导航栏部分-->
    <div class="zplson1">
      <router-link :to="{path:'/wode'}"><</router-link>
      <span class="zpl1">账户信息</span>
    </div>
    <!--上传头像部分-->
      <div class="zpl2">
        <div>
          <input type="file">
          <router-link :to="{}" class="zpl3">></router-link>
        </div>
        <div class="zpl4">用户名
          <router-link :to="{}">></router-link>
        </div>
        <div class="zpl5">收货地址
          <router-link :to="{}">></router-link>
        </div>
      </div>
    <div class="a">账号绑定</div>
    <div class="zpl6 el-icon-mobile-phone">手机
      <router-link :to="{}">></router-link>
    </div>
    <div class="a">安全设置</div>
    <div class="zpl7">登录密码
      <router-link :to="{}">修改></router-link>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Info"
    }
</script>

<style scoped>
  .info{
    width:100%;
    height: 100%;
    background:gainsboro;
    position: absolute;
    letf:0;
    right: 0;
    bottom: 0;
    z-index: 2;
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
    height:25%;
  }
  .zpl2 div{
    width: 100%;
    height: 33%;
    background:white;
    border-bottom: 1px solid grey;
  }
  .zpl3{
    position: absolute;
    top: 4.3rem;
    right:1rem;
  }
  .zpl4{
    font-size: 0.6rem;
    line-height: 2.5rem;
    padding-left: 0.5rem;
  }
  .zpl4 a{
    position: absolute;
    top: 6rem;
    right:1rem;
  }
  .zpl5{
    font-size: 0.6rem;
    line-height: 2.5rem;
    padding-left: 0.5rem;
  }
  .zpl5 a{
    position: absolute;
    top:8.5rem;
    right:1rem;
  }
  .zpl6{
     font-size: 0.6rem;
     line-height: 2.5rem;
    padding-left: 0.5rem;
   }
  .zpl6 a{
    position: absolute;
    top:12rem;
    right:1rem;
  }
  .zpl6{
    width: 100%;
    height:8%;
    background: ghostwhite;
  }
  .zpl7{
    font-size: 0.6rem;
    line-height: 2.5rem;
    padding-left: 0.5rem;
  }
  .zpl7 a{
    position: absolute;
    top:15rem;
    right:1rem;
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
