<template>
    <div class="hbdescription">
      <!--第一导航栏部分-->
      <div id="head_top">
        <a class="more"  @click="backUp"> < </a>
        <span class="title">红包说明</span>
      </div>
      <div class="tex">
        <!--<p>{{num1}}</p>-->
        <h3>Q1: 怎么获得红包？</h3>
        <ul>
          <li>通过邀请好友获得</li>
          <li>在下单返红包的商家下单获得</li>
          <li>抢微信朋友分享的红包获得</li>
        </ul>
        <h3>Q2: 红包可以做什么？</h3>
        <li>可以抵扣在线支付时的实际支付金额。</li>
        <h3>Q3: 红包的门槛金额按照什么金额计算？</h3>
        <li>红包的的门槛金额按照（选购菜品折后价＋餐盒费）的金额作为计算门槛，即购物车显示的金额（7.3以上版本）。假设红包满30可用，只要选购的菜品现价（折后价）＋餐盒费超过30，就可以使用红包。</li>
        <h3>Q4: 一个红包能拆开多次使用吗？</h3>
        <li></li>
        <h3></h3>
        <li>不能，一个红包只能一次性使用，不能分开使用。</li>
        <h3>Q5: 下单的时候使用了红包，但是后来订单取消了，红包还会返还吗？</h3>
        <li>会的，订单无效后红包会自动返还到您的账户里。</li>
        <h3>Q6: 红包兑换码怎样兑换成红包，怎样查看红包？</h3>
        <li>在个人中心 > 我的红包 > 兑换红包，输入兑换码进行兑换。</li>
        <h3>Q7: 邀请好友了，为什么没获得红包？</h3>
        <li>先检查下您是否在同一设备上进行的邀请？或者被邀请人是否通过您发给对方的链接进行注册？而非自己复制链接注册的。同一设备上邀请或没有按照点击发送的链接邀请都是无效邀请。如果您是正常邀请没获得红包，可以致电客服进行查实。</li>
        <h3>Q8: 预订早餐、预订午餐的红包怎么使用？在哪里查询？</h3>
        <li>预订早餐、预订午餐的红包暂时不支持直接点外卖使用，并且当前点外卖的红包也暂时不支持在预订早餐、预订午餐时使用。</li>
        <li>预订早餐、预订午餐的红包从APP首页点击“预订早餐”按钮进入后在右上角的个人中心中查找预订早餐、预订午餐的红包。</li>
        <h3>Q9: 互斥红包怎么使用？</h3>
        <li>互斥红包不与其他优惠活动（包含但不限于：新用户专享、满X元减X元、满X元赠XX）同时使用。</li>
        <h3>Q10: 返红包活动， 红包领取规则是什么?</h3>
        <li>同一个手机号一天限领取三个。</li>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue'
    export default {
        name: "hbDescription",
      data(){
          return{
            num1:'',//获取到红包说明的数据
          }
      },
      mounted(){
        Vue.axios.get('https://elm.cangdu.org/v3/profile/explain')
          .then((res)=>{
            this.num1 = res.data.hongbaoContent;
            //console.log(this.num1);
        })
          .catch((err)=>{
          console.log('请求错误',err);
        })
      },
      methods:{
        backUp(){
          this.$router.go(-1);
        }
      }
    }
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  .hbdescription{
    width: 100%;
    background: #fff;
    position: absolute;
    left:0;
    top: 0;
    z-index: 2;
  }
  #head_top{
    width: 100%;
    height: 1.95rem;
    background-color: #3190e8;
  }
  #head_top .more{
    width: 10%;
    color: #fff;
    font-size: 1rem;
    height: 1.95rem;
    line-height: 1.95rem;
    padding-left:.3rem;
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
    font-weight: 700;
    display: inline-block;
  }
  h3{
    margin-top: .666667rem;
    margin-bottom: .2rem;
    font-size: .7rem;
    color: #333;
    font-weight: 400;
  }
  li{
    color: #666;
    font-size: .6rem;
    margin-bottom: .2rem;
    list-style: none;
  }
  .tex{
    margin-left: 1rem;
  }
</style>
