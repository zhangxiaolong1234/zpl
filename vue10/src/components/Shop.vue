<template>
    <div class="shop-container" v-show="!showLoading">
      <!--<router-view></router-view>-->
      <nav class="goback" @click="goback">
        <Icon type="ios-arrow-back" />
      </nav>
      <!--头部-->
      <header class="shop_detail_header" :style="{zIndex: showActivities? '14':'10'}">
        <img :src="'http://elm.cangdu.org/img/'+ imgPath" alt="商家图片" class="head_cover_img">
        <section class="description_header">
          <router-link :to="'/shop/shopDetail/'+shopId" class="description_top">
            <section class="description_left">
              <img :src="'http://elm.cangdu.org/img/'+ imgPath" alt="商家图片">
            </section>
            <section class="description_right" v-if="shopDetailData">
              <h4 class="description ellipsis">{{shopDetailData.name}}</h4>
              <p class="description_text">商家配送/{{shopDetailData.order_lead_time}}分钟送达／配送费¥{{shopDetailData.float_delivery_fee}}</p>
              <p class="description_promotion">公告:{{shopDetailData.promotion_info}}</p>
            </section>
            <Icon type="ios-arrow-forward" />
          </router-link>
          <footer class="description_footer" v-if="shopActivities.length" @click="showActivitiesFunc">
            <p class="ellipsis">
              <span class="tip_icon" :style="{backgroundColor:'#' + this.shopActivities[0].icon_color,borderColor:'#' + this.shopActivities[0].icon_color}">{{shopActivities[0].icon_name}}</span>
              <span>{{shopActivities[0].description}}（APP专享）</span>
            </p>
            <p>{{shopDetailData.activities.length}}个活动</p>
            <Icon type="ios-arrow-forward" class="icon2"/>
          </footer>
        </section>
      </header>
      <!--活动详情页面-->
      <section class="activities_details" v-if="showActivities">
        <h2 class="activities_shoptitle">{{shopDetailData.name}}</h2>
        <section class="activities_list">
          <header class="activities_title_style">
            <span>优惠信息</span>
          </header>
          <ul>
            <li v-for="item in  shopDetailData.activities" :key="item.id">
              <span class="activities_icon" :style="{backgroundColor:'#' + item.icon_color,borderColor:'#' + item.icon_color}">{{item.icon_name}}</span>
              <span>{{item.description}}（APP专享）</span>
            </li>
          </ul>
        </section>
        <section class="activities_shopinfo">
          <header class="activities_title_style">
            <span>商家公告</span>
          </header>
          <p>{{shopDetailData.promotion_info}}</p>
        </section>
        <img src="../img/close.png" alt="关闭按钮" @click.stop="showActivitiesFunc" class="close">
      </section>
      <!--商品/评价的头部-->
      <section class="change_show_type" ref="chooseType">
        <div>
          <span :class="{'activity_show': changeShowType == 'food'}" @click="changeShowType='food'">商品</span>
        </div>
        <div>
        <span :class="{'activity_show': changeShowType == 'evaluate'}" @click="changeShowType='evaluate'">评价</span>
      </div>
      </section>
      <!--商品列表-->
      <section class="food_container" v-show="changeShowType == 'food'">
        <div class="menu_container">
          <div class="menu-left" id="wrapper_menu" ref="menuWrapper">
            <ul>
              <a :href="'#'+index" v-for="(item,index) in menuList" :key="index" class="menu_left_li" :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">
                <img :src="getImgPath(item.icon_url)" alt="" v-if="item.icon_url">
                <span>{{item.name}}</span>
                <span class="category_num" v-if="categoryNum[index]&&item.type==1">{{categoryNum[index]}}</span>
              </a>
            </ul>
          </div>
          <!--商铺详情列表-->
          <div class="menu-right" ref="foodsWrapper">
            <ul>
              <li v-for="(item,index) in menuList" :key="index" class="food-list-hook" :id="index">
                <!--每个商铺详情的头部-->
                <header class="menu-right-header">
                  <section class="menu-detail-header-left">
                    <strong class="menu_item_title">{{item.name}}</strong>
                    <span class="menu_item_description">{{item.description}}</span>
                  </section>
                  <span class="menu_detail_header_right" @click="showTitleDetail(index)"></span>
                  <p class="description_tip" v-if="index == TitleDetailIndex">
                    <span>{{item.name}}</span>
                    {{item.description}}
                  </p>
                </header>
                <!--商铺详情的列表-->
                <section class="menu_detail_list" v-for="(foods,foodindex) in item.foods" :key="foodindex">
                  <!--点击跳转商铺的具体详情页面-->
                  <router-link :to="{path:'/shop/foodDetail',query:{image_path:foods.image_path,description:foods.description,month_sales:foods.month_sales,name:foods.name,rating:foods.rating,rating_count: foods.rating_count, satisfy_rate: foods.satisfy_rate, price:foods.specfoods[0].price, shopId}}" tag="div" class="menu_detail_link">
                    <!--商铺的图片-->
                    <section class="menu_food_img">
                      <img :src="'//elm.cangdu.org/img/'+foods.image_path" alt="">
                    </section>
                    <!--商铺的描述-->
                    <section class="menu_food_description">
                      <h3 class="food_description_head">
                        <strong class="foodname">{{foods.name}}</strong>
                        <!--商铺图片的左上角-->
                        <ul v-if="foods.attributes.length" class="attributes_ul">
                          <li v-for="(attribute,foodindex) in foods.attributes" v-if="attribute" :key="foodindex" class="attribute_new" :style="{color: '#' + attribute.icon_color,borderColor:'#' + attribute.icon_color}" :class="{attribute_new: attribute.icon_name == '新'}">
                            <p :style="{color: attribute.icon_name == '新'? '#fff' : '#' + attribute.icon_color}">{{attribute.icon_name == '新'? '新品':attribute.icon_name}}</p>
                          </li>
                        </ul>
                      </h3>
                      <!--商铺描述的内容-->
                      <p class="food_description_content">{{foods.description}}</p>
                      <p class="food_description_sale">
                        <span>月售{{foods.month_sales}}份</span>
                        <span>好评率{{foods.satisfy_rate}}%</span>
                      </p>
                      <p v-if="foods.activity" class="food_activity">
                        <span :style="{color:'#' + foods.activity.image_text_color,borderColor:'#' + foods.activity.icon_color}">{{foods.activity.image_text}}</span>
                      </p>
                    </section>
                  </router-link>
                  <footer class="menu_description_foot">
                    <section class="food_price">
                      <span>￥</span>
                      <span>{{foods.specfoods[0].price}}</span>
                      <span v-if="foods.specifications.length">起</span>
                    </section>
                    <BuyCart :shopId="shopId" :foods="foods" :shopName="shopDetailData.name" :imgPath="imgPath" @showChooseList="showChooseList"></BuyCart>
                  </footer>
                </section>
                <!--购物车列表-->
                <section class="cart_food_list" v-show="showCartList&&cartFoodList.length">
                  <header>
                    <h4>购物车</h4>
                    <div @click="clearCart">
                      <img src="../img/delete.png" alt="">
                      <span class="clear_cart">清空</span>
                    </div>
                  </header>
                  <div class="cart_food_detail">
                    <ul>
                      <li v-for="(item,index) in cartFoodList" :key="index" class="cart_food_li">
                        <div class="cart_list_num">
                          <p class="ellipsis">{{item.name}}</p>
                          <p class="ellipsis">{{item.specs}}</p>
                        </div>
                        <div class="cart_list_price">
                          <span>¥</span>
                          <span>{{item.price}}</span>
                        </div>
                        <section class="cart_list_control">
                          <span @click="removeOutCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                           <img src="../img/reduce.png"/>
                          </span>
                          <span class="span_num">{{item.num}}</span>
                          <span @click="addToCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                            <img src="../img/add.png" alt="">
                          </span>
                        </section>
                      </li>
                    </ul>
                  </div>
                </section>
              </li>
            </ul>
          </div>
        </div>
        <!--底部的列表-->
        <div class="buy_cart_container">
          <section class="cart_icon_num" @click="toggleCarList">
            <div class="cart_icon_container" :class="{cart_icon_activity: totalPrice > 0, move_in_cart:receiveInCart}" ref="cartContainer">
              <span v-if="totalNum" class="cart_list_length">{{totalNum}}</span>
              <img src="../img/cart.png" alt="">
            </div>
            <div class="cart_num">
              <div>¥ {{totalPrice}}</div>
              <div>配送费¥{{deliveryFee}}</div>
            </div>
          </section>
          <section class="gotopay" :class="{gotopay_acitvity: minimumOrderAmount <= 0}">
            <span class="gotopay_button_style" v-if="minimumOrderAmount > 0">还差¥{{minimumOrderAmount}}起送</span>
            <router-link :to="{path:'/confirmOrder', query:{geohash, shopId}}" class="gotopay_button_style" v-else >去结算</router-link>
          </section>
        </div>
      </section>
      <!--评价页面-->
      <section class="eval_container" v-show="changeShowType == 'evaluate'">
        <section>
          <header class="eval_header">
            <section class="eval_header_left">
              <p>{{rating}}</p>
              <p>综合评价</p>
              <p>高于周边商家{{(compare_rating*100).toFixed(1)}}%</p>
            </section>
            <section class="eval_header_right">
              <p>
                <span>服务态度</span>
                <Rate disabled v-model="valueDisabled" />
                <span>{{ratingScoresData.service_score.toFixed(1)}}</span>
              </p>
              <p>
                <span>菜品评价</span>
                <Rate disabled v-model="valueDisabled" />
                <span class="rating_num">{{ratingScoresData.food_score.toFixed(1)}}</span>
              </p>
              <p>
                <span>送达时间</span>
                <span class="delivery_time">{{shopDetailData.order_lead_time}}分钟</span>
              </p>
            </section>
          </header>
          <ul class="tag_list_ul">
            <li v-for="(item, index) in ratingTagsList" :key="index" :class="{unsatisfied: item.unsatisfied, tagActivity: ratingTageIndex === index}" @click="changeTgeIndex(index, item.name)">{{item.name}}({{item.count}})</li>
          </ul>
          <!--评论的列表-->
          <ul class="rating_list_ul">
            <li v-for="(item, index) in ratingList" :key="index" class="rating_list_li">
              <img :src="getImgPath(item.avatar)" class="user_avatar">
              <section class="rating_list_details">
                <header>
                  <section class="username_star">
                    <p class="username">{{item.username}}</p>
                    <p class="star_desc">
                      <Rate disabled v-model="valueDisabled" />
                      <span class="time_spent_desc">{{item.time_spent_desc}}</span>
                    </p>
                  </section>
                  <time class="rated_at">{{item.rated_at}}</time>
                </header>
                <ul class="food_img_ul">
                  <li v-for="(item, index) in item.item_ratings" :key="index">
                    <img :src="getImgPath(item.image_hash)" v-if="item.image_hash">
                  </li>
                </ul>
                <ul class="food_name_ul">
                  <li v-for="(item, index) in item.item_ratings" :key="index" class="ellipsis">
                    {{item.food_name}}
                  </li>
                </ul>
              </section>
            </li>
          </ul>
        </section>
      </section>
      <div class="specs_cover" @click="showChooseList" v-if="showSpecs"></div>
      <div class="specs_list" v-if="showSpecs">
        <header class="specs_list_header">
          <h4 class="ellipsis">{{choosedFoods.name}}</h4>
          <img src="../img/close2.png" alt="" class="specs_cancel" @click="showChooseList">
          <section class="specs_detail">
            <h3 class="specs_details_title">{{choosedFoods.specifications[0].name}}</h3>
            <ul>
              <li v-for="(item,itemIndex) in choosedFoods.specifications[0].values" :class="{specs_activity: itemIndex == specsIndex}" @click="chooseIndex(itemIndex)">{{item}}</li>
            </ul>
          </section>
          <footer class="spec_footer">
            <div class="spec_price">
              <span>￥</span>
              <span>{{choosedFoods.specfoods[specsIndex].price}}</span>
            </div>
            <div class="specs_addto_cart" @click="addSpecs(choosedFoods.category_id, choosedFoods.item_id, choosedFoods.specfoods[specsIndex].food_id, choosedFoods.specfoods[specsIndex].name, choosedFoods.specfoods[specsIndex].price, choosedFoods.specifications[0].values[specsIndex], choosedFoods.specfoods[specsIndex].packing_fee, choosedFoods.specfoods[specsIndex].sku_id, choosedFoods.specfoods[specsIndex].stock)">加入购物车</div>
          </footer>
        </header>
      </div>
      <loading v-show="showLoading"></loading>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapState } from 'vuex'
    import BuyCart from "../common/BuyCart";
    import Loading from "../common/Loading";
    export default {
        name: "Shop",
      components: {Loading, BuyCart},
      data() {
            return {
              showLoading:true,
              valueDisabled:5,
              //传递过来的经纬度
              geohash:'',
              // 传递过来的商铺的id值
              shopId:'',
              //商铺详情
              shopDetailData: null,
              //是否展示活动页面
              showActivities:false,
              imgPath:'',
              shopActivities:'',
              //切换展示商品或评价
              changeShowType: 'food',
              //食品列表
              menuList:[],
              //已选菜单列表的索引值
              menuIndex:0,
              categoryNum: [],
              //展示列表头部的详情
              TitleDetailIndex:null,
              totalPrice:0,
              //购物车的列表
              cartFoodList:[],
              receiveInCart: false,
              showCartList: false,
              choosedFoods:null,
              showSpecs:false,
              specsIndex:0,
              //评价总体分数
              ratingScoresData:null,
              //分数列表
              ratingTagsList:null,
              ratingTageIndex:0,
              ratingList:null,
              rating:'',
              compare_rating:'',
              shopName:'',
            }
        },

        created() {
          this.geohash = this.$route.query.geohash;
          this.shopId = this.$route.query.id;
          this.cartList = this.$store.state.cartList;
          this.hideLoading();
        },
        mounted() {
          //获取商铺的信息
          Vue.axios.get("https://elm.cangdu.org/shopping/restaurant/"+this.shopId).then((res)=>{
            this.shopDetailData = res.data;
            this.rating = this.shopDetailData.rating;
            this.imgPath = this.shopDetailData.image_path;
            this.shopActivities = this.shopDetailData.activities;
            this.shopName = this.shopDetailData.name;
          });
          //获取商品的食品列表
          Vue.axios.get("https://elm.cangdu.org/shopping/v2/menu?restaurant_id="+this.shopId).then((res)=>{
            // console.log(res.data);
            this.menuList = res.data;
          });
          Vue.axios.get("https://elm.cangdu.org/ugc/v2/restaurants/"+this.shopId+'/ratings/scores').then((res)=>{
            // console.log(res.data);
            this.ratingScoresData = res.data;
            this.compare_rating = this.ratingScoresData.compare_rating;
          })
          Vue.axios.get("https://elm.cangdu.org/ugc/v2/restaurants/"+this.shopId+'/ratings/tags').then((res)=>{
            this.ratingTagsList = res.data;
          })
          Vue.axios.get("https://elm.cangdu.org/ugc/v2/restaurants/"+this.shopId+'/ratings').then((res)=>{
            this.ratingList = res.data;
          });
          this.$store.commit('saveShopId',this.shopId);
          this.$store.commit('initCart');
        },
        computed:{
          //配送费
          deliveryFee: function () {
            if (this.shopDetailData) {
              return this.shopDetailData.float_delivery_fee;
            }else{
              return null;
            }
          },
          //还差多少元配送
          minimumOrderAmount: function () {
            if (this.shopDetailData) {
              return this.shopDetailData.float_minimum_order_amount - this.totalPrice;
            }else{
              return null;
            }
          },
          //当前购物车里的信息
          shopCart: function (){
            return {...this.$store.state.cartList[this.shopId]};
          },
          //购物车里商品的总数量
          totalNum: function (){
            let num = 0;
            this.cartFoodList.forEach(item => {
              num += item.num
            })
            return num
          },
        },
        methods: {
          showActivitiesFunc() {
            this.showActivities = !this.showActivities;
          },
          showTitleDetail(i) {
            if(this.TitleDetailIndex == i) {
              this.TitleDetailIndex = null;
            }else {
              this.TitleDetailIndex = i;
            }
          },
          chooseMenu(index) {
            this.menuIndex = index;
          },
          //初始化购物车的类型
          initCategoryNum() {
            let newArr = [];
            let cartFoodNum = 0;
            this.totalPrice = 0;
            this.cartFoodList = [];
            this.menuList.forEach((item,index)=>{
              if(this.shopCart&&this.shopCart[item.foods[0].category_id]) {
                let num = 0;
                Object.keys(this.shopCart[item.foods[0].category_id]).forEach(itemid=>{
                  Object.keys(this.shopCart[item.foods[0].category_id][itemid]).forEach(foodid=>{
                    let foodItem = this.shopCart[item.foods[0].category_id][itemid][foodid];
                    num += foodItem.num;
                    if (item.type == 1) {
                      this.totalPrice += foodItem.num*foodItem.price;
                      if (foodItem.num > 0) {
                        this.cartFoodList[cartFoodNum] = {};
                        this.cartFoodList[cartFoodNum].category_id = item.foods[0].category_id;
                        this.cartFoodList[cartFoodNum].item_id = itemid;
                        this.cartFoodList[cartFoodNum].food_id = foodid;
                        this.cartFoodList[cartFoodNum].num = foodItem.num;
                        this.cartFoodList[cartFoodNum].price = foodItem.price;
                        this.cartFoodList[cartFoodNum].name = foodItem.name;
                        this.cartFoodList[cartFoodNum].specs = foodItem.specs;
                        cartFoodNum ++;
                      }
                    }
                  })
                })
                newArr[index] = num;
              }else {
                newArr[index] = 0;
              }
            })
            this.totalPrice = this.totalPrice.toFixed(2);
            this.categoryNum = [...newArr];
          },
          //展示购物车的商品
          toggleCarList() {
            this.cartFoodList.length ? this.showCartList = !this.showCartList : true;
          },
          //添加商品
          addToCart(category_id, item_id, food_id, name, price, specs){
            this.$store.commit("addCart",{shopid: this.shopId, category_id, item_id, food_id, name, price, specs,shop_name:this.shopName,img_path:this.imgPath})
          },
          //移除商品
          removeOutCart(category_id, item_id, food_id, name, price, specs) {
            this.$store.commit("reduceCart",{shopid: this.shopId, category_id, item_id, food_id, name, price, specs})
          },
          //清空购物车
          clearCart() {
            this.toggleCarList();
            this.$store.commit('clearCart',this.shopId);
          },
          //隐藏动画
          hideLoading(){
            this.showLoading = false;
          },
          //展示选择商品的列表
          showChooseList(foods) {
            if(foods) {
              this.choosedFoods = foods;
            }
            this.showSpecs = !this.showSpecs;
            this.specsIndex = 0;
          },
          chooseIndex(index) {
            this.specsIndex = index;
          },
          //规格添加购物车
          addSpecs(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock){
            this.$store.commit("addCart",{shopid: this.shopId, category_id, item_id, food_id, name, price, specs})
          },
          changeTgeIndex(index,name) {
            this.ratingTageIndex = index;
          },
          //返回上一页
          goback(){
            this.$router.go(-1);
          },
          //对图片的路径进行处理
          getImgPath(path) {
            let suffix;
            if(!path) {
              return '//elm.cangdu.org/img/default.jpg'
            }
            if(path.indexOf('jpeg') !== -1){
              suffix = '.jpeg'
            }else {
              suffix = '.png'
            }
            let url = '/' + path.substring(0,1) + '/' + path.substring(1,3) + '/' +path.substring(3) +suffix;
            return "http://fuss10.elemecdn.com" + url;
          }
        },
        watch:{
          showLoading:function(value) {
            if(!value) {
              this.initCategoryNum();
            }
          },
          shopCart: function (value){
            this.initCategoryNum();
          },
        }
    }
</script>

<style scoped>
  p,ul,h3,h4 {
    margin-bottom: 0;
  }
  .ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  /*商铺容器*/
  .shop-container {
    width: 100%;
    height: 100%;
    position: absolute;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: column;
  }
  /*返回按钮*/
  .goback {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2rem;
    z-index: 11;
    padding-top: .1rem;
    padding-left: .3rem;
  }
  .ivu-icon-ios-arrow-back {
    color: #fff;
  }
  .shop_detail_header {
    /*overflow: hidden;*/
    position: relative;
    height: 5rem;
  }
  /*背景*/
  .head_cover_img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    /*设置滤镜，blur为高斯模糊*/
    filter: blur(10px);
  }
  .description_header {
    position: relative;
    z-index: 10;
    background-color: rgba(119, 103, 137, .43);
    padding: .4rem 0 .4rem .4rem;
    width: 100%;
    overflow: hidden;
  }
  .description_top {
    display: flex;
  }
  /*头部的左边部分*/
  .description_left {
    margin-right: .3rem;
  }
  .description_left img {
    width: 2.9rem;
    height: 2.9rem;
    display: block;
    border-radius: .15rem;
  }
  /*头部的右边部分*/
  .description_right {
    flex: 1;
  }
  .description {
    width: 100%;
    font-size: 0.8rem;
    color: #fff;
    font-weight: 700;
    margin-bottom: .3rem;
  }
  .description_text {
    font-size: .5rem;
    color: #fff;
    margin-bottom: .3rem;
  }
  .description_promotion {
    font-size: .5rem;
    color: #fff;
    width: 11.5rem;
  }
  .ivu-icon-ios-arrow-forward{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: .3rem;
    z-index: 11;
    color: rgba(255,255,255,.6);
  }
  /*描述的底部*/
  .description_footer {
    display: flex;
    justify-content: space-between;
    margin-top: .5rem;
    padding-right: 1rem;
  }
  .description_footer .ellipsis {
    width: 84%;
  }
  .description_footer p,.description_footer span{
    font-size: .5rem;
    color: #fff;
  }
  .tip_icon {
    padding: 0 .04rem;
    border: .025rem solid #fff;
    border-radius: .1rem;
    font-size: .4rem;
    display: inline-block;
  }
  .icon2 {
    width: .45rem;
    height: .45rem;
    position: absolute;
    top: 79%;
    right: .2rem;
  }
  /*活动详情*/
  .activities_details {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #262626;
    z-index: 200;
    padding: 1.25rem;
  }
  .activities_shoptitle {
    color: #fff;
    text-align: center;
    font-size: .8rem;
  }
  .activities_list {
    margin-top: 3.5rem;
    margin-bottom: 1rem;
    font-size: .5rem;
    color: #fff;
  }
  .activities_title_style {
    text-align: center;
    margin-bottom: 1rem;
  }
  .activities_title_style span {
    font-size: .5rem;
    color: #fff;
    border: .025rem solid #555;
    padding: .2rem .4rem;
    border-radius: .5rem;
  }
  .activities_details .activities_list li {
    margin-bottom: .2rem;
  }
  .activities_icon {
    padding: 0 .02rem;
    display: inline-block;
    border: .025rem solid #fff;
    border-radius: .1rem;
  }
  .activities_list li span {
    color: #fff;
    line-height: .6rem;
  }
  .activities_shopinfo p {
    line-height: .7rem;
    font-size: .5rem;
    color: #fff;
  }
  .close {
    bottom: 1rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .change_show_type {
    display: flex;
    background-color: #fff;
    padding: .3rem 0 .6rem;
    border-bottom: 1px solid #ebebeb;
  }
  .change_show_type div {
    flex: 1;
    text-align: center;
  }
  .change_show_type div span {
    font-size: .65rem;
    padding: .2rem .1rem;
    border-bottom: .12rem solid #fff;
  }
  .change_show_type .activity_show {
    color: #3190e8;
    border-bottom: .12rem solid #3190e8;
  }
  /*展示商铺的容器*/
  .food_container {
    display: flex;
    flex: 1;
    padding-bottom: .2rem;
    height: 100%;
  }
  .menu_container {
    display: flex;
    flex: 1;
    overflow: hidden;
    position: relative;
  }
  /*商铺容器的左边*/
  .menu_container .menu-left {
    width: 3.8rem;

    overflow-y: scroll;
  }
  .menu_left_li {
    width: 100%;
    padding: .7rem .3rem;
    border-bottom: .025rem solid #ededed;
    box-sizing: border-box;
    border-left: .15rem solid #f8f8f8;
    position: relative;
    display: block;
  }
  .activity_menu {
    border-left: .15rem solid #3190e8;
    background-color: #fff;
  }
  .menu_left_li img {
    width: .5rem;
    height: .6rem;
  }
  .menu_left_li span {
    font-size: .6rem;
    color: #666;
  }
  .category_num {
    position: absolute;
    top: .1rem;
    right: .1rem;
    background-color: #ff461d;
    line-height: .6rem;
    text-align: center;
    border-radius: 50%;
    border: .025rem solid #ff461d;
    min-width: .6rem;
    height: .6rem;
    font-size: .5rem;
    color: #fff;
    font-family: Helvetica Neue,Tahoma,Arial;
  }
  /*商铺容器的右边*/
  .menu-right {
    flex: 4;
    overflow-y: auto;
  }
  .menu-right-header {
    width: 100%;
    padding: .4rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .menu-detail-header-left {
    width: 11rem;
    white-space: nowrap;
    overflow: hidden;
  }
  .menu_item_title {
    font-size: .7rem;
    color: #666;
    font-weight: 700;
  }
  .menu_item_description {
    font-size: .5rem;
    color: #999;
    width: 30%;
    overflow: hidden;
  }
  .menu_detail_header_right {
    width: 1.5rem;
    height: 1rem;
    display: block;
    background-size: 100%;
    background: url("../img/icon_point.png") no-repeat top right;
  }
  .menu_detail_list {
    background-color: #fff;
    padding: .6rem .4rem;
    border-bottom: 1px solid #f8f8f8;
    position: relative;
    overflow: hidden;
  }
  .menu_detail_link {
    display: flex;
  }
  .menu_food_img {
    margin-right: .4rem;
  }
  .menu_food_img img {
    width: 2rem;
    height: 2rem;
    display: block;
  }
  .menu_food_description {
    width: 100%;
  }
  .food_description_head {
    display: flex;
    justify-content: space-between;
    margin-bottom: .2rem;
  }
  .foodname {
    font-size: .7rem;
    color: #333;
  }
  .attributes_ul {
    display: flex;
  }
  .attribute_new {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #4cd964;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: flex-end;
    transform: rotate(-45deg) translate(-.1rem,-1.5rem);
    border: none;
    border-radius: 0;
  }
  .attribute_new p{
    flex: 1;
    text-align: center;
    font-size: .4rem;
    transform: scale(.8) translate(.1rem,-.1rem);
  }
  .food_description_content {
    font-size: .5rem;
    color: #999;
    line-height: .6rem;
  }
  .food_description_sale {
    line-height: .8rem;
  }
  .food_description_sale span {
    font-size: .5rem;
    color: #333;
  }
  .food_activity {
    line-height: .4rem;
  }
  .food_activity span {
    font-size: .3rem;
    /*currentColor表示当前文字颜色*/
    border: 1px solid currentColor;
    border-radius: .3rem;
    padding: .08rem;
    display: inline-block;
    transform: scale(.8);
    margin-left: -.35rem;
  }
  .menu_description_foot {
    margin-left: 2.4rem;
    font-size: 0;
    margin-top: .3rem;
    display: flex;
    justify-content: space-between;
  }
  .food_price span:first-child {
    font-size: .5rem;
    color: #f60;
    margin-right: .05rem;
  }
  .food_price span:nth-child(2) {
    font-size: .7rem;
    color: #f60;
    font-weight: 700;
    margin-right: .3rem;
  }
  .food_price span:nth-child(3) {
    font-size: .5rem;
    color: #666;
  }
  .buy_cart_container {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 133;
    background-color: #3d3d3f;
    width: 100%;
    height: 2rem;
  }
  .cart_icon_num {
    flex: 1;
  }
  .cart_icon_container {
    display: flex;
    background-color: #3d3d3f;
    position: absolute;
    padding: .4rem;
    border: .18rem solid #444;
    border-radius: 50%;
    left: .5rem;
    top: -.7rem;
  }
  .cart_icon_num .cart_icon_activity {
    background-color: #3190e8;
  }
  .cart_list_length {
    position: absolute;
    top: -.25rem;
    right: -.25rem;
    background-color: #ff461d;
    line-height: .7rem;
    text-align: center;
    border-radius: 50%;
    border: .025rem solid #ff461d;
    min-width: .7rem;
    height: .7rem;
    font-size: .5rem;
    color: #fff;
    font-family: Helvetica Neue,Tahoma,Arial;
  }
  .cart_icon_container img {
    width: 1.2rem;
    height: 1.2rem;
  }
  .cart_num {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 3.5rem;
  }
  .cart_num div {
    color: #fff;
  }
  .cart_num div:nth-child(1) {
    font-size: .8rem;
    font-weight: 700;
    margin-bottom: .1rem;
  }
  .cart_num div:nth-child(2) {
    font-size: .4rem;
  }
  .gotopay {
    position: absolute;
    right: 0;
    background-color: #535356;
    width: 5rem;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .buy_cart_container .gotopay_acitvity {
    background-color: #4cd964;
  }
  .gotopay_button_style {
    font-size: .7rem;
    color: #fff;
    font-weight: 700;
  }
  .cart_food_list {
    position: fixed;
    width: 100%;
    padding-bottom: 2rem;
    z-index: 12;
    bottom: 0;
    left: 0;
    background-color: #fff;
  }
  .cart_food_list header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .3rem .6rem;
    background-color: #eceff1;
  }
  .cart_food_list h4 {
    font-size: .7rem;
    color: #666;
  }
  .cart_food_list header img {
    width: .6rem;
    height: .6rem;
    vertical-align: middle;
  }
  .clear_cart {
    font-size: .6rem;
    color: #666;
  }
  .cart_food_detail {
    background-color: #fff;
    max-height: 20rem;
    overflow-y: auto
  }
  .cart_food_detail .cart_food_li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .6rem .5rem;
  }
  .cart_list_num {
    width: 55%;
  }
  .cart_list_num p:nth-child(1) {
    font-size: .7rem;
    color: #666;
    font-weight: 700;
  }
  .cart_list_num p:nth-child(2) {
    font-size: .4rem;
    color: #666;
  }
  .cart_list_price {
    font-size: 0;
  }
  .cart_list_price span:nth-child(1) {
    font-size: .6rem;
    color: #f60;
    font-family: Helvetica Neue,Tahoma;
  }
  .cart_list_price span:nth-child(2) {
    font-size: .7rem;
    color: #f60;
    font-family: Helvetica Neue,Tahoma;
    font-weight: 700;
  }
  .cart_list_control {
    display: flex;
    align-items: center;
  }
  .cart_list_control span {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cart_list_control span img {
    width: .9rem;
    height: .9rem;
  }
  .cart_list_control .span_num {
    font-size: .65rem;
    color: #666;
    min-width: 1rem;
    text-align: center;
    padding-left: .2rem;
    font-family: Helvetica Neue,Tahoma;
  }
  /*规格页面的布局*/
  .specs_list {
    position: fixed;
    top: 35%;
    left: 15%;
    width: 70%;
    background-color: #fff;
    z-index: 18;
    border: 1px;
    border-radius: .2rem;
  }
  .specs_list .specs_list_header h4{
    font-size: .7rem;
    color: #222;
    font-weight: 400;
    text-align: center;
    padding: .5rem;
  }
  .specs_list_header img {
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    right: .5rem;
    top: .5rem;
    color: black;
  }
  .specs_detail {
    padding: .5rem;
  }
  .specs_detail h3 {
    font-size: .6rem;
    color: #666;
  }
  .specs_detail ul {
    display: flex;
    flex-wrap: wrap;
    padding: .4rem 0;
  }
  .specs_detail ul li {
    font-size: .6rem;
    padding: .3rem .5rem;
    border: .025rem solid #ddd;
    border-radius: .2rem;
    margin-right: .5rem;
    margin-bottom: .2rem;
  }
  .specs_detail .specs_activity {
    border-color: #3199e8;
    color: #3199e8;
  }
  .spec_footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f9f9f9;
    padding: .5rem;
    border: 1px;
    border-bottom-left-radius: .2rem;
    border-bottom-right-radius: .2rem;
  }
  .spec_price span {
    color: #ff6600;
  }
  .spec_price span:first-of-type {
    font-size: .5rem;
  }
  .specs_addto_cart {
    width: 4rem;
    height: 1.3rem;
    background-color: #3199e8;
    border: 1px;
    border-radius: .15rem;
    font-size: .6rem;
    color: #fff;
    text-align: center;
    line-height: 1.3rem;
  }
  /*评价模块*/
  .eval_container {
    flex: 1;
    overflow-y: hidden;
    flex-direction: column;
  }
  .eval_header {
    display: flex;
    background-color: #fff;
    padding: .8rem .5rem;
    margin-bottom: .5rem;
  }
  .eval_header_left {
    flex: 3;
    text-align: center;
  }
  .eval_header_left p:first-of-type {
    font-size: 1.2rem;
    color: #f60;
  }
  .eval_header_left p:nth-of-type(2) {
    font-size: .65rem;
    color: #666;
    margin-bottom: .1rem;
  }
  .eval_header_left p:nth-of-type(3) {
    font-size: .4rem;
    color: #999;
  }
  .eval_header_right {
    flex: 4;
  }
  .eval_header_right p {
    font-size: .55rem;
    line-height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .eval_header_right p span:nth-of-type(1) {
    width: 3rem;
    color: #666;
  }
  .eval_header_right p .ivu-rate-disabled {
    position: relative;
    top: -.4rem;
    width: 5rem;
    height: .4rem;
    font-size: .6rem;
  }
  .eval_header_right p span:nth-of-type(2) {
    width: 2rem;
    font-size: .55rem;
    color: #999;
  }
  /*评价的分类*/
  .tag_list_ul {
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    padding: .5rem;
  }
  .tag_list_ul li {
    font-size: .6rem;
    color: #6d7885;
    padding: .3rem;
    background-color: #ebf5ff;
    border-radius: .2rem;
    border: 1px;
    margin: 0 .4rem .2rem 0;
  }
  .tag_list_ul .tagActivity{
    background-color: #3190e8;
    color: #fff;
  }
  .rating_list_ul {
    background-color: #fff;
    padding: 0 .5rem;
  }
  .rating_list_li {
    border-top: 1px solid #f1f1f1;
    display: flex;
    padding: .6rem 0;
  }
  .rating_list_li img {
    width: 1.5rem;
    height: 1.5rem;
    border: .025rem;
    border-radius: 50%;
    margin-right: .8rem;
  }
  .rating_list_details {
    flex: 1;
  }
  .rating_list_details header {
    display: flex;
    flex: 1;
    justify-content: space-between;
    margin-bottom: .3rem;
  }
  .username_star {
    font-size: .55rem;
    color: #666;
  }
  .username {
    color: #666;
  }
  .star_desc {
    display: flex;
    align-items: center;
  }
  .star_desc .ivu-rate-disabled {
    display: flex;
    width: 2rem;
    height: .4rem;
    font-size: .2rem;
  }
  .time_spent_desc {
    font-size: .55rem;
    color: #666;
    margin-left: 1rem;
  }
  .ivu-rate-star {
   margin-top: 2px;
  }
  .rated_at {
    font-size: .4rem;
    color: #999;
  }
  .food_img_ul {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: .4rem;
  }
  .food_img_ul li img {
    width: 3rem;
    height: 3rem;
    margin-right: .4rem;
    display: block;
    border: 0;
    border-radius: 0;
  }
  .food_name_ul {
    display: flex;
    flex-wrap: wrap;
  }
  .food_name_ul li {
    font-size: .55rem;
    color: #999;
    width: 2.2rem;
    padding: .2rem;
    border: .025rem solid #ebebeb;
    border-radius: .15rem;
    margin-right: .3rem;
    margin-bottom: 4px;
  }
</style>
