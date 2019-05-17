<template>
    <div class="orderDetail_container">
      <Head head-title="订单详情" go-back="true"></Head>
      <!--订单详情的中心部分-->
      <section class="orderDetail_header">
        <img :src="'http://elm.cangdu.org/img/'+this.detailList.imgPath" alt="商家图片" class="order_img">
        <p>等待支付</p>
        <router-link class="order_again" :to="{path:'/shop',query:{geohash:this.detailList.geohash,id:this.detailList.shopId}}">再来一单</router-link>
      </section>
      <!--订单列表-->
      <section class="food_list">
        <router-link class="food_list_header" :to="{path:'/shop',query:{geohash:this.detailList.geohash,id:this.detailList.shopId}}">
          <div class="shop_name">
            <img :src="'http://elm.cangdu.org/img/'+this.detailList.imgPath" alt="商家图片">
            <span>{{this.detailList.shopName}}</span>
          </div>
          <img src="../../img/left_jt.png" alt="" class="jt">
        </router-link>
        <ul class="food_list_ul">
          <li>
            <p class="food_name ellipsis">{{this.detailList.name}}</p>
            <div class="quantity_price">
              <span>×{{this.detailList.quantity}}</span>
              <span>￥{{this.detailList.price}}</span>
            </div>
          </li>
        </ul>
        <div class="delivery_fee">
          <span>配送费</span>
          <span>{{this.detailList.packing_fee}}</span>
        </div>
        <div class="payment">实付{{this.detailList.totalPrice}}</div>
      </section>
      <!--配送信息-->
      <section class="order_detail_type">
        <header>配送信息</header>
        <section class="item_style">
          <p class="item_left">送达时间：</p>
          <div class="item_right">
            <p>21:52</p>
          </div>
        </section>
        <section class="item_style">
          <p class="item_left">送达地址：</p>
          <div class="item_right">
            <p>{{this.detailList.choosedAddress.address}}</p>
            <p>{{this.detailList.choosedAddress.address_detail}}</p>
          </div>
        </section>
        <section class="item_style">
          <p class="item_left">配送方式：</p>
          <div class="item_right">
            <p>蜂鸟专送</p>
          </div>
        </section>
      </section>
      <!--订单信息-->
      <section class="order_detail_type">
        <header>订单信息</header>
        <section class="item_style">
          <p class="item_left">订单号：</p>
          <div class="item_right">
            <p>41010085{{this.detailList.orderTime}}0002</p>
          </div>
        </section>
        <section class="item_style">
          <p class="item_left">支付方式：</p>
          <div class="item_right">
            <p>在线支付</p>
          </div>
        </section>
        <section class="item_style">
          <p class="item_left">下单时间：</p>
          <div class="item_right">
            <p>{{this.detailList.orderTime}}</p>
          </div>
        </section>
      </section>
    </div>
</template>

<script>
    import Head from "../../Header/Head";
    export default {
        name: "OrderDetail",
      components: {Head},
      data() {
          return {
            detailList:null
          }
        },
        mounted() {
          this.detailList = this.$route.query.item;
          console.log(this.detailList);
        }
    }
</script>

<style scoped>
  p,ul {
    margin-bottom: 0;
  }
  .ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  /*订单详情的容器*/
  .orderDetail_header {
    padding-top: 2.95rem;
    padding-bottom: 1rem;
    width: 100%;
    background-color: #fff;
    text-align: center;
  }
  .order_img {
    width: 3rem;
    height: 3rem;
    display: inline-block;
    border-radius: 50%;
  }
  .orderDetail_header p {
    font-size: .9rem;
    color: #333;
    font-weight: bold;
    margin-top:.3rem;
  }
  .order_again {
    margin-top: 1.5rem;
    border: 0.025rem solid #3190e8;
    padding: .15rem .4rem;
    border-radius: .1rem;
    font-size: .6rem;
    color: #3190e8;
  }
  /*订单的列表*/
  .food_list {
    margin-top: .5rem;
    background-color: #fff;
  }
  .food_list_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .2rem .5rem;
    border-bottom: 1px solid #f5f5f5;
  }
  .shop_name img {
    width: 1.2rem;
    height: 1.2rem;
    vertical-align: middle;
    margin-right: .2rem;
  }
  .shop_name span {
    font-size: .75rem;
    color: #333;
    font-weight: bold;
  }
  .jt {
    width: 1rem;
    height: 1rem;
  }
  .food_list_ul li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .5rem;
    line-height: 2rem;
  }
  .food_name {
    font-size: .6rem;
    color: #666;
    flex: 4;
  }
  .quantity_price {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .quantity_price span:first-of-type {
    font-size: .6rem;
    color: #ccc;
  }
  .quantity_price span:nth-of-type(2) {
    font-size: .6rem;
    color: #666;
  }
  .delivery_fee {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .5rem;
    line-height: 2rem;
    border-top:1px solid #f5f5f5;
  }
  .delivery_fee span {
    font-size: .6rem;
    color: #666;
  }
  .payment {
    font-size: .6rem;
    color: #fb6b23;
    border-top: 1px solid #f5f5f5;
    font-weight: bold;
    line-height: 2rem;
    text-align: right;
    padding-right: .5rem;
  }
  .order_detail_type {
    background-color: #fff;
    margin-top: 0.5rem;
  }
  .order_detail_type header {
    font-size: .75rem;
    color: #333;
    padding: .5rem;
    border-bottom: 1px solid #f5f5f5;
  }
  .item_style {
    display: flex;
    padding: .5rem;
  }
  .item_style {
    font-size: .65rem;
    color: #666;
    line-height: 1rem;
  }
</style>
