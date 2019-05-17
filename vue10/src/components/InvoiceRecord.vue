<template>
  <div class="invoiceRecord">
    <!--第一导航栏部分-->
    <div class="zplson1">
      <router-link :to="{path:'/vipcard'}"><</router-link>
      <span class="zpl1">购买记录</span>
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
  .zplson1{
    width: 100%;
    overflow: hidden;
  }
  .zplson1 a{
    width: 10%;
    display: block;
    color: white;
    font-size: 1rem;
    float:left;
    background: #3190e8;
  }
  .zpl1{
    width: 90%;
    font-size: 1rem;
    color: white;
    float:left;
    background: #3190e8;
    text-align: center;
    line-height: 1.5rem;
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

