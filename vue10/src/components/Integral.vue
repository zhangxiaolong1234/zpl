<template>
  <div class="balance">
    <!--余额显示-->
    <div class="zplson1">
      <!-- < 按钮部分-->
      <div class="l1">
        <router-link :to="{path:'/wode'}"><</router-link>
        <span class="zpl1">我的积分</span>
      </div>
      <div class="l2">
        <div class="l3">
          <p>当前积分</p>
          <router-link :to="{path:'/integralcard'}" class="el-icon-question">积分说明</router-link>
          <router-view></router-view>
        </div>
        <div class="l4"><span>0</span> <span>分</span></div>
        <div class="l5">积分兑换商品</div>
      </div>
    </div>
    <div class="zplson2">
      <div>最近30天积分记录</div>
      <div class="el-icon-user-solid"></div>
      <div>最近30天无积分记录</div>
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
        name: "Integral",
      data(){
          return{
            read:null,
          }
      },
    }
</script>

<style scoped>
  .balance{
    width: 100%;
    height: 100%;
    background: gainsboro;
  }
  .zplson1{
    width: 100%;
    height: 55%;
    background:#3190e8;
    font-size: 1rem;
    text-align: center;
    line-height: 3rem;
  }
  .zplson2{
    width: 100%;
    /*height: 60%;*/
    background:#f5f5f5;
    font-size: 1rem;
    text-align: center;
    line-height: 3rem;
  }
  .l1 a{
    width: 10%;
    /*height: 100%;*/
    display: block;
    color: white;
    font-size: 1.3rem;
    float:left;
  }
  .l1{
    width: 100%;
    /*height: 25%;*/
    /*background:  pink;*/
    border-bottom: 1px solid white;
  }
  .l1 span{
    color: white;
  }
  .l2{
    width: 90%;
    height: 60%;
    background: white;
    margin-top: 1rem;
    margin-left: 1rem;
    border-radius: 3%;
  }
  .l3{
    width: 100%;
    height: 20%;
    /*background: orangered;*/
  }
  .l3 p{
    font-size: 0.6rem;
    position: absolute;
    top:3rem;
    left: 1.5rem;
  }
  .l3 a{
    font-size: 0.6rem;
    text-decoration: none;
    position: absolute;
    top: 4.2rem;
    right: 1.5rem;
  }
  .l4{
    font-size: 2rem;
    position: absolute;
    top: 5rem;
    left: 1.5rem;
  }
  .l4 span{
    font-size: 1rem;
  }
  .l5 {
    width: 80%;
    background: #fe6d47;
    position: absolute;
    top: 8rem;
    left: 1.8rem;
    margin-top: 0.5rem;
    line-height:2rem;
    border-radius: 4%;
  }
</style>
