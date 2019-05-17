<template>
  <div class="shop_list">
    <ul v-if="shopListArr.length">
      <p v-if="false">{{geohash,restaurantCategoryId,restaurantCategoryIds,ordeBy,deliveryMode,supportIds,confirmSelect}}</p>
      <router-link :to="{path: 'shop', query:{geohash, id: item.id}}" v-for="item in shopListArr" :key="item.id" tag="li" class="shop_li">
        <section>
          <img :src="'http://elm.cangdu.org/img/'+item.image_path" class="shop_img">
        </section>
        <section class="shop_list_right">
          <header class="shop_detail_header">
            <h4 :class="item.is_premium? 'premium': ''" class="shop_title ellipsis">{{item.name}}</h4>
            <ul class="shop_detail_ul">
              <li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>
            </ul>
          </header>
          <h5 class="rating_order_num">
            <section class="rating_order_num_left">
              <section class="rating_section">
                <div class="rating-container">
                  <Rate disabled v-model="valueDisabled" />
                </div>
                <span class="rating_num">{{item.rating}}</span>
              </section>
              <section class="order_section">
                月售{{item.recent_order_num}}单
              </section>
            </section>
            <section class="rating_order_num_right">
              <span class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
              <span class="delivery_style delivery_right" v-if="zhunshi(item.supports)">准时达</span>
            </section>
          </h5>
          <h5 class="fee_distance">
            <p class="fee">
              ¥{{item.float_minimum_order_amount}}起送
              <span class="segmentation">/</span>
              {{item.piecewise_agent_fee.tips}}
            </p>
            <p class="distance_time">
							<span v-if="Number(item.distance)">{{item.distance > 1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}
								<span class="segmentation">/</span>
							</span>
              <span v-else>{{item.distance}}</span>
              <span class="segmentation">/</span>
              <span class="order_time">{{item.order_lead_time}}</span>
            </p>
          </h5>
        </section>
      </router-link>
    </ul>

  </div>
</template>

<script>
    import Vue from 'vue';
    export default {
        name: "ShopList",
        data() {
          return {
            shopListArr:[],
            geohash1: '',
            address:{},
            valueDisabled:6
          }
        },
        props: ['restaurantCategoryId', 'restaurantCategoryIds', 'orderBy', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],

        mounted() {
          //   ?latitude='+this.geohash.split(',')[0]+'&longitude='+this.geohash.split(',')[1]+'&restaurant_category_id='+this.restaurantCategoryId+'&restaurant_category_ids='+this.restaurantCategoryIds
          Vue.axios.get('https://elm.cangdu.org/shopping/restaurants',{
            params:{
              latitude:this.geohash.split(',')[0],
              longitude:this.geohash.split(',')[1],
              restaurant_category_id: this.restaurantCategoryId
            }
          }).then((res)=>{
            // console.log(res.data);
            let res1 = res.data;
            this.shopListArr = [...res1];
            // console.log(this.shopListArr)
          })
        },
        methods: {
          zhunshi(supports) {
            let zhunStatus;
            if ((supports instanceof Array) && supports.length) {
              supports.forEach(item => {
                if (item.icon_name === '准') {
                  zhunStatus = true;
                }
              })
            }else{
              zhunStatus = false;
            }
            return zhunStatus
          },
          async listenPropChange(){
            // console.log(this.restaurantCategoryId)
            let supportStr = '';
            this.supportIds.forEach(item => {
              if (item.status) {
                supportStr += '&support_ids[]=' + item.id;
              }
            });
            Vue.axios.get('https://elm.cangdu.org/shopping/restaurants?latitude='+this.geohash.split(',')[0]+'&longitude='+this.geohash.split(',')[1]+'&restaurant_category_id='+this.restaurantCategoryId+'&order_by='+this.orderBy+'&restaurant_category_ids[]='+this.restaurantCategoryIds+'&delivery_mode[]='+this.deliveryMode + supportStr).then((res)=>{
              // console.log(res.data);
              let res1 = res.data;
              this.shopListArr = [...res1];
              // console.log(this.shopListArr)
            })
          },
        },
        watch: {
          // 监听商品分类的id是否变化
          restaurantCategoryIds: function (value){
            this.listenPropChange();
          },
          //监听排序是否需要重新渲染
          orderBy: function (value){
            this.listenPropChange();
          },
          //监听父级的确认按钮是否被点击，并且返回一个自定义事件通知父级，已经接收到数据，此时父级才可以清除已选状态
          confirmSelect: function (value){
            this.listenPropChange();
          }
        }
    }
</script>

<style scoped>
  h4,h5,p {
    margin-bottom: 0;
    line-height: 0;
  }
  .shop_li {
    display: flex;
    border-bottom: .025rem solid #f1f1f1;
    padding: .7rem .4rem;
  }
  .shop_img {
    width: 2.7rem;
    height: 2.7rem;
    display: block;
    margin-right: .4rem;
  }
  .shop_list_right {
    flex: auto;
  }
  .shop_detail_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .shop_detail_header ul {
    margin-bottom: 0;
  }
  .shop_detail_header .premium::before {
    content: "\54C1\724C";
    display: inline-block;
    font-size: .5rem;
    line-height: .6rem;
    color: #333;
    background-color: #ffd930;
    padding: 0 .1rem;
    border-radius: .1rem;
    margin-right: .2rem;
  }
  .shop_title {
    width: 8.5rem;
    color: #333;
    padding-top: .01rem;
    font: .65rem/.65rem PingFangSC-Regular;
    font-weight: 700;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .shop_detail_ul {
    display: flex;
    transform: scale(.8);
    margin-right: -.3rem;
  }
  .shop_detail_ul .supports {
    font-size: .5rem;
    color: #999;
    border: .025rem solid #f1f1f1;
    padding: 0 .04rem;
    border-radius: .08rem;
    margin-left: .05rem;
  }
  .rating_order_num {
    display: flex;
    justify-content: space-between;
    height: .6rem;
    margin-top: .52rem;
    font-size: .6rem;
  }
  .rating_order_num_left {
    display: flex;
    justify-content: flex-start;
  }
  .rating-container {
    position: relative;
    top: .2rem;
  }
  .rating-container .ivu-rate {
    width: 4rem;
    height: .3rem;
    font-size: .3rem;
  }
  .rating_num {
    font-size: .4rem;
    color: #ff6000;
    margin-left: 4.2rem;
    vertical-align: .2rem;
  }
  .order_section {
    transform: scale(.8);
    margin-top: .2rem;
    margin-left: .2rem;
    font-size: .4rem;
    color: #666;
  }
  .rating_order_num_right {
    display: flex;
    align-items: center;
    transform: scale(.7);
    min-width: 5rem;
    justify-content: flex-end;
    margin-right: -.8rem;
  }
  .rating_order_num_right .delivery_left {
    color: #fff;
    background-color: #3190e8;
    border: .025rem solid #3190e8;
  }
  .rating_order_num_right .delivery_style {
    font-size: .4rem;
    padding: .4rem .08rem 0.4rem;
    border-radius: .08rem;
    margin-left: .08rem;
  }
  .fee_distance{
    margin-top: .52rem;
    display: flex;
    justify-content: space-between;
    font-size: .5rem;
    color: #333;
  }
  .fee {
    transform: scale(.9);
    font-size: .5rem;
    color: #666;
  }
  .distance_time {
    transform: scale(.9);
  }
  .distance_time .order_time{
    color: #3190e8;
  }
</style>
