<template>
    <div class="balance">
      <!--余额显示-->
      <div class="zplson1">
        <!-- < 按钮部分-->
          <div class="l1">
            <router-link :to="{path:'/wode'}"><</router-link>
            <span class="zpl1">我的余额</span>
          </div>
        <div class="l2">
            <div class="l3">
              <p>当前余额</p>
              <router-link :to="{path:'/balance/balancecard',}" class="el-icon-question"
>余额说明</router-link>
             <!--<Balancecard></Balancecard>-->
              <router-view></router-view>
            </div>
            <div class="l4"><span>0.00</span> <span>元</span></div>
            <div class="l5">提现</div>
        </div>
      </div>
      <div class="zplson2">
          <div>交易明细</div>
        <div class="el-icon-user-solid"></div>
          <div>暂无明细记录</div>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import Balancecard from './Balancecard'
  //小图标
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';

  Vue.use(ElementUI);
    export default {
        name: "Balance",
      data(){
          return{

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
    height: 50%;
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
    /*height: 7%;*/
    background: #cccccc;
    position: absolute;
    top: 8rem;
    left: 1.8rem;
    line-height:2rem;
    border-radius: 4%;
  }
  /*.zpl1{*/
    /*width: 50%;*/
    /*height: 100%;*/
    /*font-size: 1rem;*/
    /*color: white;*/
    /*float:left;*/
    /*margin-left: 40px;*/
  /*}*/
  /*.l2{*/
    /*width: 100%;*/
    /*height: 90%;*/
    /*background: red;*/
  /*}*/
</style>
