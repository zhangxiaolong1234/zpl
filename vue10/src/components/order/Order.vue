<template>
    <div class="order_container">
      <Head head-title="订单列表" go-back="true"></Head>
      <ul class="order_list_ul">
        <li v-for="(item,index) in orderMessage" :key="index" class="order_list_li">
          <img :src="'http://elm.cangdu.org/img/'+item.imgPath" alt="商家图片" class="order_img">
          <section class="order_item_right">
            <section @click="showDetail(item)">
              <header class="order_item_right_header">
                <section class="order_header">
                  <h4>
                    <span class="ellipsis">{{item.shopName}}</span>
                    <img src="../../img/left_jt.png" alt="" class="right_jt">
                  </h4>
                </section>
                <p class="order_status">等待支付</p>
              </header>
              <section class="order_basket">
                <p class="order_number">{{item.quantity}}件商品</p>
                <p class="order_price">￥{{item.totalPrice}}</p>
              </section>
            </section>
            <div class="order_again">
              <button class="btn btn-danger order_delete" @click="deleteOrder(index)">删除订单</button>
              <router-link :to="{path:'shop',query:{geohash:item.geohash,id:item.shopId}}" class="buy_again">再来一单</router-link>
            </div>
          </section>
        </li>
      </ul>
      <Footer></Footer>
    </div>
</template>

<script>

    import Head from "../../Header/Head";
    import Footer from "../Footer";
    export default {
        name: "Order",
        components: {Footer, Head},
        data() {
            return {
              orderMessage:null
            }
        },
        mounted() {
          this.orderMessage = this.$store.state.orderMessage;
          // console.log(this.orderMessage);
        },
        methods: {
          showDetail(item) {
            this.$router.push({path:'/order/orderDetail',query:{item}});
          },
          deleteOrder(index) {
            // console.log(index);
            this.orderMessage.splice(index,1);
          }
        }
    }
</script>

<style scoped>
  ul,p,h4 {
    margin-bottom: 0;
  }
  .order_list_ul {
    padding-top: 1.95rem;
  }
  .order_list_li {
    background-color: #fff;
    display: flex;
    margin-bottom: .5rem;
    padding: .6rem .6rem 0;
  }
  .order_img {
    width: 3rem;
    height: 3rem;
    margin-right: .4rem;
  }
  .order_item_right {
    flex: 5;
    padding-bottom: 1rem;
  }
  .order_item_right_header {
    display: flex;
    justify-content: space-between;
    padding-bottom: .5rem;
  }
  .order_header h4 {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: .75rem;
    color: #333;
    line-height: 1rem;
    width: 9rem;
  }
  .ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .right_jt {
    width: 1rem;
    height: 1rem;
    margin-right: .2rem;
  }
  .order_status {
    font-size: .6rem;
    color: #333;
  }
  .order_basket {
    display: flex;
    justify-content: space-between;
    line-height: 2rem;
    border-bottom: 0.025rem solid #f5f5f5;
  }
  .order_number {
    width: 9rem;
    font-size: .6rem;
    color: #666;
  }
  .order_price {
    font-size: .6rem;
    color: #f60;
    font-weight: bold;
  }
  .order_again {
    text-align: right;
    line-height: 1.6rem;
  }
  .order_delete {
    padding: .1rem .2rem;
    font-size: .7rem;
    outline: none;
  }
  .buy_again {
    font-size: .65rem;
    color: #3190e8;
    border: 0.025rem solid #3190e8;
    padding: .1rem .2rem;
    border-radius: .15rem;
  }
</style>
