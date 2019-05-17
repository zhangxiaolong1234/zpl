<template>
    <div class="vipDescription">
      <div id="head_top">
        <routerLink :to="{path:'/vipcard'}" class="more"> < </routerLink>
        <span class="title">我的优惠</span>
      </div>
      <div class="p1">
        尊敬的用户，随着会员体系逐渐完善，自2016年10月10日起，饿了么会员权益将做如下优化： 购卡后31天内，累积享有30单减免配送费服务（每日最多3单，每单最高减免4元）。 注：已购买的会员服务不受影响，当前会员服务失效前无法购买新卡。
      </div>
      <div class="tex">
        <h3>Q1: 特权介绍</h3>
        <ul>
          <li>身份标识：饿了么会员服务有效期内，享有专属皇冠标识。</li>
          <li> 减免配送费： 饿了么会员卡自绑定账户之日起31天内，在「蜂鸟专送」标识商家下单，享有30次减免配送费特权，每日最多减免3单，每单最高可减4元。</li>
          <li>更多特权，敬请期待！</li>
        </ul>
        <h3>Q2: 资费介绍</h3>
        <li> 饿了么会员卡：20元</li>
        <h3>Q3: 使用说明</h3>
        <li>当用户满足以下任一条件，会员服务自动失效：
          自绑定之日起超过31天；
          在31天内累计使用减免配送费的蜂鸟订单数量达到30单；</li>
        <h3>Q4: 购卡说明</h3>
        <li>在线购买：饿了么App>我的>饿了么会员卡</li>
        <h3>Q5: 温馨提示</h3>
        <li>用户在当前会员服务失效前，无法购买新卡。</li>
        <li>请认准饿了么官方渠道，任何从其他第三方途径获得的会员卡，饿了么不保证其可用性。</li>
      </div>

    </div>
</template>

<script>
    export default {
        name: "vipDescription"
    }
</script>

<style scoped>
  .vipDescription{
    background-color: #fff;
    padding-bottom: 1rem;
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
  .p1{
    width: 70%;
    margin:1rem auto 0;
    color: #333;
    font-size: .6rem;
  }
  h3{
    margin-top: .666667rem;
    margin-bottom: .2rem;
    font-size: .7rem;
    font-weight: 600;
    color: #333;
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
