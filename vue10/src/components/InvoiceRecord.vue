<template>
  <div class="invoiceRecord">
    <!--第一导航栏部分-->
    <div  id="head_top">
      <router-link :to="{path:'/vipcard'}"><span class="more"> < </span></router-link>
      <span class="title">购买记录</span>
    </div>
    <img src="../images/images/no-log.png" alt="">
    <p>没有购买记录</p>
  </div>
</template>

<script>
  export default {
    name: "InvoiceRecord"
  }
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  .invoiceRecord{
    width: 100%;
    height: 100%;
    background: white;
    overflow-y: hidden;
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
    font-weight: 700;
    display: inline-block;
  }
  .zplson1 a{
    width: 10%;
    display: block;
    color: white;
    font-size: 1rem;
    float:left;
    background: #3190e8;
  }
  img{
    padding: 1rem 1rem;
  }
  p{
    text-align: center;
    font-size: 0.6rem;
    color: darkgray;
  }
</style>

