<template>
    <div>
      <!--头部组件-->
      <Head signin-up="msite">
        <router-link :to="{path:'/searchMaster'}" class="link-search" slot="search">
          <Icon type="ios-search" />
        </router-link>
        <router-link :to="{path:'/home'}" slot="msite-title" class="msite-title">
          <span class="changecity">{{msitetitle}}</span>
        </router-link>
      </Head>
      <nav class="msite_nav">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide food_types_container" v-for="(item, index) in foodTypes" :key="index">
              <router-link :to="{path: '/food', query: {geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
                <figure>
                  <img :src="imgBaseUrl + foodItem.image_url">
                  <h2>{{foodItem.title}}</h2>
                </figure>
              </router-link>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </nav>
      <!--商品列表-->
      <div class="shop_list_container">
        <header class="shop_header">
          <Icon type="ios-home" />
          <span class="shop_header_title">附近商家</span>
        </header>
        <ShopList v-if="hasGetData" :geohash="geohash"></ShopList>
      </div>
      <Footer></Footer>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Head from '../Header/Head';
    import Swiper from 'swiper';
    import Footer from './Footer';
    import {mapMutations} from 'vuex';
    import ShopList from '../common/ShopList';
    export default {
        name: "Msite",
      components: {ShopList, Footer, Head},
      data() {
          return {
            // city传递过来的数据
            geohash: '',
            msitetitle:'请选择地址是...',
            //食品分类列表
            foodTypes:[],
            //是否获取地理位置
            hasGetData:false,
            imgBaseUrl:'https://fuss10.elemecdn.com'
          }
        },
        async beforeMount() {
          if(!this.$route.query.geohash){
            await Vue.axios.get('/v1/cities?type=guess').then((res)=>{
              this.address = res.data;
            });
            this.geohash = this.address.latitude + ',' + this.address.longitude;
          }else {
            this.geohash = this.$route.query.geohash;
          }
          this.$store.commit('saveGeohash',this.geohash);
          // console.log(this.geohash);
          Vue.axios.get('/v2/pois/'+this.geohash).then((res)=>{
            this.msitetitle = res.data.name;
          })
          this.hasGetData = true;
        },
        mounted() {
          Vue.axios.get('/v2/index_entry').then((res)=>{
            let resLength = res.data.length;
            let resArr = res.data;
            let foodArr = [];
            for(let i = 0,j = 0;i < resLength;i+=8,j++){
                foodArr[j] = resArr.splice(0,8);
            }
            this.foodTypes = foodArr;
          }).then(()=>{
            new Swiper('.swiper-container', {
              loop: true,
              pagination: {
                el: '.swiper-pagination',
              }
            })
          })
        },
        methods: {
          ...mapMutations (['SAVE_GEOHASH']),
          getCategoryId(url) {
            let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''));
            if (/restaurant_category_id/gi.test(urlData)) {
              return JSON.parse(urlData).restaurant_category_id.id
            } else {
              return ''
            }
          }
        }
    }
</script>

<style scoped>
  h4,h5 {
    margin-bottom: 0;
    line-height: 0;
  }
  .ivu-icon-ios-search {
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    top:.5rem;
    left: 1rem;
    color: #fff;
  }
  .changecity {
    position: absolute;
    top: 20%;
    left: 20%;
    width: 50%;
    font-size: .8rem;
    color: #fff;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .msite_nav {
    padding-top: 1.1rem;
    background-color: #fff;
    border-bottom: .025rem solid #e4e4e4;
    height: 10.5rem;
  }
  .swiper-container {
    text-align: center;
    margin-top: 1.9rem;
  }
  .food_types_container {
    flex-wrap: wrap;
    display: flex;
  }
  .link_to_food {
    width: 25%;
    display: flex;
    justify-content: center;
  }
  .link_to_food img {
    margin-bottom: .3rem;
    width: 1.8rem;
    height: 1.5rem;
  }
  .link_to_food h2{
    text-align: center;
    font-size: .55rem;
    color: #666;
  }
  .msite_nav .swiper-container .swiper-pagination {
    bottom: .8rem;
  }
  .shop_list_container {
    margin-top: .4rem;
    border: .025rem solid #e4e4e4;
    background-color: #fff;
  }
  .ivu-icon-ios-home {
    margin-left: .6rem;
    color: #999;
    font-size: .8rem;
  }
  .shop_header_title {
    color: #999;
    font: .55rem/1.6rem Microsoft YaHei;
  }
  .shop_list_container {
    background-color: #fff;
    margin-bottom: 2rem;
    list-style: none;
  }
</style>
