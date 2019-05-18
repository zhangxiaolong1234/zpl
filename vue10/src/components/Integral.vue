<template>
  <div class="balance">
    <!-- < 按钮部分-->
    <div id="head_top">
      <router-link :to="{path:'/wode'}"><span class="more"> < </span></router-link>
      <span class="title1">我的积分</span>
    </div>
    <!--余额显示-->
    <div class="zplson1">
      <div class="l2">
        <div class="l3">
          <p>当前积分</p>
          <router-link :to="{path:'/integralcard'}" class="el-icon-question">积分说明</router-link>
          <router-view></router-view>
        </div>
        <div class="l4"><span>0</span> <span>分</span></div>
        <div class="l5" @click="score">积分兑换商品</div>
      </div>
    </div>
    <p class="title">最近30天积分记录</p>
    <div class="zplson2">
      <div class="el-icon-user-solid"></div>
      <div class="title2">最近30天无积分记录</div>
    </div>

    <!--提示框-->
    <div class="fail" v-show="showAlert">
      <img src="../images/images/警告.png" alt="">
      <p>快去下单赚取大量积分</p>
      <button class="btn btn-success btn2" @click="sure">确定</button>
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
            showAlert: false,
          }
      },
      methods:{
          score(){
            this.showAlert = true;
          },
        sure(){
          this.showAlert = false;
        }
      }
    }
</script>

<style scoped>
  .balance{
    width: 100%;
    height: 100%;
    background: #f5f5f5;
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
  .title1{
    width: 77%;
    text-align: center;
    height: 1.95rem;
    line-height:1.95rem ;
    font-size: .8rem;
    color: #fff;
    font-weight: 700;
    display: inline-block;
  }
  .zplson1{
    width: 100%;
    height: 40%;
    background:#3190e8;
    font-size: 1rem;
    text-align: center;
    padding-top: 1rem;
  }
  .zplson2{
    width: 100%;
    background:#f5f5f5;
    font-size: 1rem;
    text-align: center;
    line-height: 3rem;
  }
  .title{
    font-size: .6rem;
    color: #999;
    line-height: 2rem;
    padding-left: .5rem;
  }
  .title2{
    margin-top: .5rem;
    font-size: .7rem;
    color: #666;
  }
  .l1 a{
    width: 10%;
    display: block;
    color: white;
    font-size: 1.3rem;
    float:left;
  }
  .l1 span{
    color: white;
  }
  .l2{
    width: 90%;
    height: 80%;
    background: white;
    margin-left: 1rem;
    border-radius: 3%;
    padding-top: .5rem;
  }
  .l3{
    width: 100%;
    height: 20%;
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
  .fail{
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -6rem;
    margin-left: -6rem;
    width: 12rem;
    animation: tipMove .4s;
    background-color: #fff;
    padding-top: .6rem;
    border: 1px;
    border-radius: .25rem;
    border:1px solid #eee;
  }
  .fail img{
    margin-bottom: .5rem;
  }
  .btn2{
    font-size: .8rem;
    color: #fff;
    font-weight: 700;
    margin-top: .8rem;
    width: 100%;
    height: 1.8rem;
    line-height: .8rem;
    border-top-left-radius: 0;
    border-top-right-radius:0;
  }
</style>
