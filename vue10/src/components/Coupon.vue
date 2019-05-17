<template>
    <div class="coupon">
      <div id="head_top">
        <a @click="backUp"> <span class="more"> < </span> </a>
        <span class="title">我的优惠</span>
      </div>
      <div class="tex">
        <h3>Q1: 什么是商家代金券？</h3>
        <li>商家代金券是指由商家自己发放代金券，只限在指定的商家使用，可根据条件抵扣相应金额。</li>
        <h3>Q2: 怎么获得商家代金券？</h3>
        <li>进入有「进店领券」或「下单返券」标示的商家即有机会获得代金券。</li>
        <li>「下单返券」需要在指定商家完成满足返券金额要求的订单后才会返还，代金券可在下次下单时使用。</li>
        <h3>Q3: 商家代金券使用条件</h3>
        <li>商家代金券仅限在指定商家使用</li>
        <li>商家代金券仅限在线支付使用</li>
        <li>每个订单只能使用一张商家代金券，不可与其他代金券叠加使用</li>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Coupon",
      methods:{
        backUp(){
          this.$router.go(-1);
        }
      }
    }
</script>


<style scoped>
  .coupon{
    width: 100%;
    height: 100%;
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
