<template>
    <div class="balancecard">
      <div class="zplson1">
        <!-- < 按钮部分-->
        <div id="head_top">
          <router-link :to="{path:'/balance'}"><span class="more"> < </span></router-link>
          <span class="title">余额问题</span>
        </div>
        <ul>
          <li>
          <!--{{item}}-->
          <h3>Q1: 使用余额的条件</h3>
          <p>为了保护账户安全,使用余额前必须先绑定手机号</p>

        </li>
          <li>
            <h3>Q2: 余额可以怎么用？</h3>
            <p>余额可以在饿了么平台上提现，当余额大于等于待支付金额时可以在支持在线支付的商家中进行消费。提现功能将于2016年12月25日00:00全面开放。</p>
          </li>
          <li>
          <h3>Q3:我要如何提现？</h3>
          <p>为了保护账户和资金安全，您在提现前需要输入真实姓名和用该姓名开通的银行卡号、选择开户行，并验证已绑定饿了么账号的手机号。每日只能提现1次，每次限额50元。若提现金额超过50元，点击【提现】时系统会提示您已超额，请您修改提现金额。</p>
          </li>
          <li>
            <h3>Q4:为什么会提现失败？</h3>
            <p>可能原因有：您的姓名、开户行、银行卡号等信息不匹配；您当日的提现次数和金额超过限制；您的账户存在异常，被风控拦截。</p>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  Vue.use(VueAxios, axios)
    export default {
        name: "Balancecard",
    }
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  .balancecard{
    width: 100%;
    height: 100%;
    background: white;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
  }
  .zplson1{
    width: 100%;
    height: 2rem;
    background:#3190e8;
    font-size: 1rem;
    text-align: center;
    line-height: 2rem;
  }
  #head_top{
    width: 100%;
    height: 1.95rem;
    background-color: #3190e8;
  }
  #head_top  .more{
    width: 10%;
    color: #fff;
    height: 1.95rem;
    margin-left:.1rem;
    display:block;
    position: absolute;
  }
  .title{
    width: 100%;
    text-align: center;
    height: 1.95rem;
    line-height:1.95rem ;
    font-size: .8rem;
    color: #fff;
    display: inline-block;
    font-weight: 700;
  }
  .l1 a{
    display: block;
    color: white;
    font-size: 1.3rem;
    float:left;
  }
  .l1 span{
    color: white;
  }
  ul li {
    list-style: none;
    line-height: 1rem;
    text-align: left;
    background: white;
    padding-left: 0.5rem;
    margin-top: 0.5rem;
  }
  ul h3{
    width: 100%;
    font-size: 0.7rem;
    padding-top: 0.5rem;
  }
  ul p{
    font-size: 0.5rem;
    padding-top:0 .5rem;
  }

</style>
