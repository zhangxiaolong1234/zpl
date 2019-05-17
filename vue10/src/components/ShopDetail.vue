<template>
    <div class="shop-detail">
      <Head head-title="商家详情" go-back="true"></Head>
      <!--活动属性部分 -->
      <section class="activities_container">
        <header>活动属性</header>
        <ul class="actibities_ul">
          <li v-for="item in shopDetail.activities" :key="item.id">
            <span :style='{backgroundColor: "#" + item.icon_color}'>{{item.icon_name}}</span>
            <span>{{item.description}}(APP专享)</span>
          </li>
        </ul>
        <ul class="actibities_ul">
          <li v-for="item in shopDetail.supports" :key="item.id">
            <span :style='{backgroundColor: "#" + item.icon_color}'>{{item.icon_name}}</span>
            <span>{{item.description}}(APP专享)</span>
          </li>
        </ul>
      </section>
      <!--食品监督安全公示部分 -->
      <section class="shop_status_container">
        <router-link :to={} class="shop_status_header">
          <span class="shop_status_title">食品监督安全公示</span>
          <div>
            <span class="iden_detail">企业认证详情</span>
            <Icon type="ios-arrow-forward" />
          </div>
        </router-link>
        <div class="shop_status_detail">
          <div>
            <img src="../img/smile.png" alt="" v-if="shopDetail.status === 1">
            <img src="../img/cry.png" alt="" v-else>
          </div>
          <div class="check_data">
            <p>
              <span>监督检查结果：</span>
              <span v-if="shopDetail.status === 1" class="shop_status_well">良好</span>
              <span v-else class="shop_status_bad">差</span>
            </p>
            <p>
              <span>检查日期：</span>
              <span v-if="date">{{date && date.split('T')[0]}}</span>
            </p>
          </div>
        </div>
      </section>
      <section class="shop_status_info">
        <h3>商家信息</h3>
        <p>{{shopDetail.name}}</p>
        <p>地址：{{shopDetail.address}}</p>
        <p v-if="shopDetail.opening_hours">营业时间：[{{shopDetail.opening_hours[0]}}]</p>
        <p>
          <span>营业执照</span>
          <Icon type="ios-arrow-forward" />
        </p>
        <p>
          <span>餐饮服务许可证</span>
          <Icon type="ios-arrow-forward" />
        </p>
      </section>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Head from "../Header/Head";
    export default {
        name: "ShopDetail",
        components: {Head},
        data() {
          return {
            shopId:'',
            shopDetail:'',
            date:''
          }
        },
        mounted() {
          this.shopId = this.$route.params.shopid;
          Vue.axios.get("https://elm.cangdu.org/shopping/restaurant/"+this.shopId).then((res)=>{
            this.shopDetail = res.data;
            this.date = this.shopDetail.identification.identificate_date
          });
        }
    }
</script>

<style scoped>
  ul,p,h3 {
    margin-bottom: 0;
  }
  .activities_container {
    background-color: #fff;
    margin: 2.4rem 0 .4rem;
    padding-bottom: .6rem;
  }
  .activities_container header {
    font-size: .75rem;
    color: #333;
    line-height: 1.8rem;
    padding-left: .6rem;
    border-bottom: 1px solid #f1f1f1;
    margin-bottom: .3rem;
  }
  .actibities_ul {
    padding: 0 .6rem;
  }
  .actibities_ul li {
    margin-bottom: .2rem;
  }
  .actibities_ul li span:first-child {
    color: #fff;
    font-size: .45rem;
    padding: .1rem;
    border: 1px;
    border-radius: .1rem;
    margin-right: .2rem;
  }
  .actibities_ul li span:nth-child(2) {
    font-size: .55rem;
    color: #666;
  }
  .shop_status_container {
    background-color: #fff;
    margin-bottom: .4rem;
  }
  .shop_status_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1.8rem;
    padding: 0 .6rem;
    border-bottom: .025rem solid #f1f1f1;
  }
  .shop_status_title {
    font-size: .75rem;
    color: #333;
  }
  .iden_detail {
    font-size: .7rem;
    color: #bbb;
    vertical-align: middle;
  }
  .ivu-icon-ios-arrow-forward {
    width: .6rem;
    height: .6rem;
    color: #bbb;
  }
  .shop_status_detail {
    display: flex;
    padding: .6rem;
  }
  .shop_status_detail div img {
    width: 2rem;
    height: 2rem;
    margin-right: .6rem;
  }
  .check_data span {
    font-size: .55rem;
    color: #666;
  }
  .check_data .shop_status_well {
    color: #7ed321;
  }
  .shop_status_bad {
    color: red;
  }
  .shop_status_info {
    background-color: #fff;
    margin-bottom: .4rem;
  }
  .shop_status_info h3 {
    line-height: 1.8rem;
    padding: 0 .6rem;
    font-size: .75rem;
    color: #333;
    border-bottom: .025rem solid #f1f1f1;
  }
  .shop_status_info p {
    font-size: .6rem;
    color: #666;
    padding: .7rem .6rem .7rem 0;
    margin-left: .6rem;
    border-bottom: .025rem solid #f5f5f5;
  }
  .shop_status_info p:nth-child(5),.shop_status_info p:nth-child(6) {
    display: flex;
    justify-content: space-between;
  }
</style>
