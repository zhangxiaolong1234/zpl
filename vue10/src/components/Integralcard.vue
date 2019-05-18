<template>
    <div class="integralcard">
      <div class="zplson1">
        <!-- < 按钮部分-->
        <div  id="head_top">
          <router-link :to="{path:'/integral'}"><span class="more"> < </span></router-link>
          <span class="title">积分问题</span>
        </div>
        <ul>
          <li>
            <h3>Q1: 怎么获得积分？</h3>
            <p>在线支付的订单将获得订单积分奖励：</p>
            <p>积分将在用户完成评价后获得。</p>
            <p>可获得积分=订单金额×10（即1元=10点积分）。</p>
            <p>订单金额指实际付款金额，不包含活动优惠金额。</p>
            <p>每位用户每天最多可以获得2000积分，体验商家的订单和评价不会增加积分。</p>
          </li>
          <li>
            <h3>Q2: 积分用来做什么？</h3>
            <p>可以在积分商城兑换各种礼品。</p>
          </li>
          <li>
            <h3>Q3: 礼品兑换很多天了还没有收到，该怎么办？</h3>
            <p>礼品从兑换日起，3个工作日（周末不算）内处理发货，发货后，通常会在3个工作日左右送达。</p>
          </li>
          <li>
            <h3>Q4: 礼品兑换中的手机充值卡兑换，怎么样进行充值，充值之前会和我电话确认嘛？</h3>
            <p>不会，手机充值卡兑换，是直接充值到您填写的手机号上，充值之前不会和您电话确认，所以您在填写电话的时候，请确认电话是否正确。</p>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Integralcard"
    }
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  .integralcard{
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
    text-align: center;
    font-weight: 700;
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
