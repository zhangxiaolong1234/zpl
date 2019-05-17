<template>
    <div class="foodDetail_container">
      <Head go-back="true" :head-title="name"></Head>
      <section class="header_img">
        <img :src="'//elm.cangdu.org/img/'+image_path" alt="" class="food_img">
        <div class="cover"></div>
      </section>
      <p class="desc">{{description}}</p>
      <section class="detail_container">
        <div>
          <p>{{name}}</p>
          <div class="rating_sale">
            <span>评分</span>
            <Rate disabled v-model="valueDisabled" />
            <span>{{rating}}</span>
          </div>
          <p>
            <span>月售{{month_sales}}单</span>
            <span class="price">售价￥{{price}}</span>
            <span class="price">起</span>
          </p>
          <p class="comment">
            <span>评论数 {{rating_count}}</span>
            <span>好评率 {{satisfy_rate}}%</span>
          </p>
        </div>
      </section>
    </div>
</template>

<script>
    import Head from "../Header/Head";
    export default {
        name: "FoodDetail",
      components: {Head},
      data() {
          return {
            name:null,
            image_path:null,
            description:null,
            month_sales:null,
            rating:null,
            rating_count:null,
            satisfy_rate:null,
            price:null,
            shopId:null,
            valueDisabled:5,
            ratings:null
          }
      },
      created() {
          this.name = this.$route.query.name;
          this.image_path = this.$route.query.image_path;
          this.description = this.$route.query.description;
          this.month_sales = this.$route.query.month_sales;
          this.rating = this.$route.query.rating;
          this.rating_count = this.$route.query.rating_count;
          this.satisfy_rate = this.$route.query.satisfy_rate;
          this.price= this.$route.query.price;
          this.shopId = this.$route.query.shopId;
      }
    }
</script>

<style scoped>
  p {
    margin-bottom: 0;
  }
  .header_img .food_img{
    width: 100%;
  }
  .desc {
    font-size: .6rem;
    color: #666;
    margin-top: .5rem;
    line-height: .8rem;
    bottom: .2rem;
    padding: 0 .4rem;
  }
  .detail_container {
    padding: .5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .detail_container p:first-of-type {
    font-size: .7rem;
    color: #333;
    margin-bottom: .2rem;
  }
  .rating_sale {
    display: flex;
    align-items: center;
  }
  .rating_sale span:first-of-type {
    font-size: .6rem;
    color: #666;
    margin-right: .2rem;
  }
  .ivu-rate-disabled {
    width: 4.5rem;
    height: .4rem;
    font-size: .6rem;
  }
  .rating_sale span:nth-of-type(2) {
    font-size: .55rem;
    color: #f60;
    margin-left: .2rem
  }
  .detail_container p:nth-of-type(2) {
    font-size: 0;
    margin-top: .3rem;
  }
  .detail_container p:nth-of-type(2) span:first-of-type {
    font-size: .6rem;
    color: #666;
    margin-right: .4rem;
  }
  .detail_container .price {
    font-size: .6rem;
    color: #f60;
    margin-right: .2rem;
  }
  .detail_container .comment {
    font-size: .6rem;
    color: #666;
  }
</style>
