<template>
    <div class="food_container">
      <Head :head-title="headTitle" go-back="true"></Head>
      <section class="sort_container">
        <!--左边分类-->
        <div class="sort_item" :class="{choose_type:sortBy == 'food'}">
          <div class="sort_item_container" @click="chooseType('food')">
            <div class="sort_item_border">
              <span :class="{category_title:sortBy == 'food'}">{{foodTitle}}</span>
              <Icon type="ios-arrow-down" />
            </div>
          </div>
          <transition name="showlist" v-show="category">
            <section v-show="sortBy == 'food'" class="category_container sort_detail_type">
              <section class="category_left">
                <ul>
                  <li v-for="(item,index) in category" :key="index" class="category_left_li" :class="{category_active:restaurant_category_id == item.id}" @click="selectCategoryName(item.id, index)">
                  <section>
                    <img :src=getImgPath(item.image_url) v-if="index" class="category_icon">
                    <span>{{item.name}}</span>
                  </section>
                  <section>
                    <span class="category_count">{{item.count}}</span>
                    <Icon type="ios-arrow-forward" />
                  </section>
                  </li>
                </ul>
              </section>
              <section class="category_right">
                <ul>
                  <li v-for="(item,index) in categoryDetail" v-if="index" class="category_right_li" @click="getCategoryIds(item.id, item.name)" :class="{category_right_choosed: restaurant_category_ids == item.id || (!restaurant_category_ids)&&index == 0}">
                    <span>{{item.name}}</span>
                    <span>{{item.count}}</span>
                  </li>
                </ul>
              </section>
            </section>
          </transition>
        </div>
        <!--中间分类-->
        <div class="sort_item" :class="{choose_type:sortBy == 'sort'}">
          <div class="sort_item_container" @click="chooseType('sort')">
            <div class="sort_item_border">
              <span :class="{category_title:sortBy == 'sort'}">排序</span>
              <Icon type="ios-arrow-down" />
            </div>
          </div>
          <transition name="showlist">
            <section v-show="sortBy == 'sort'" class="sort_detail_type">
              <ul class="sort_list_container" @click="sortList($event)">
                <li class="sort_list_li">
                  <img src="../img/sort.png" alt="">
                  <p data="4" :class="{sort_selct: sortByType == 4}">
                    <span>智能排序</span>
                  </p>
                </li>
                <li class="sort_list_li">
                  <img src="../img/dw.png"/>
                  <p data="5" :class="{sort_select: sortByType == 5}">
                    <span>距离最近</span>
                  </p>
                </li>
                <li class="sort_list_li">
                  <img src="../img/hot.png"/>
                  <p data="6" :class="{sort_select: sortByType == 6}">
                    <span>销量最高</span>
                  </p>
                </li>
                <li class="sort_list_li">
                  <img src="../img/money.png">
                  <p data="1" :class="{sort_select: sortByType == 1}">
                    <span>起送价最低</span>
                  </p>
                </li>
                <li class="sort_list_li">
                  <img src="../img/time.png"/>
                  <p data="2" :class="{sort_select: sortByType == 2}">
                    <span>配送速度最快</span>
                  </p>
                </li>
                <li class="sort_list_li">
                  <img src="../img/score.png">
                  <p data="3" :class="{sort_select: sortByType == 3}">
                    <span>评分最高</span>
                  </p>
                </li>
              </ul>
            </section>
          </transition>
        </div>
        <!--筛选-->
        <div class="sort_item" :class="{choose_type:sortBy == 'activity'}">
          <div class="sort_item_container" @click="chooseType('activity')">
              <span :class="{category_title:sortBy == 'activity'}">筛选</span>
              <Icon type="ios-arrow-down" />
          </div>
          <transition name="showlist">
            <section v-show="sortBy == 'activity'" class="sort_detail_type filter_container">
                <section style="width: 100%;">
                <header class="filter_header_style">配送方式</header>
                <ul class="filter_ul">
                  <li v-for="(item, index) in Delivery" :key="index" class="filter_li" @click="selectDeliveryMode(item.id)">
                    <img src="../img/bird.png" alt="">
                    <span :class="{selected_filter: delivery_mode == item.id}">{{item.text}}</span>
                  </li>
                </ul>
              </section>
              <section style="width: 100%;">
                <header class="filter_header_style">商家属性（可以多选）</header>
                <ul class="filter_ul" style="paddingBottom: .5rem;">
                  <li v-for="(item,index) in Activity" :key="index" class="filter_li" @click="selectSupportIds(index, item.id)">
                    <span class="filter_icon" :style="{color: '#' + item.icon_color, borderColor: '#' + item.icon_color}" v-show="!support_ids[index].status">{{item.icon_name}}</span>
                    <span :class="{selected_filter: support_ids[index].status}">{{item.name}}</span>
                  </li>
                </ul>
              </section>
              <footer class="confirm_filter">
                <div class="clear_all filter_button_style" @click="clearSelect">清空</div>
                <div class="confirm_select filter_button_style" @click="confirmSelectFun">确定<span v-show="filterNum">({{filterNum}})</span></div>
              </footer>
            </section>
          </transition>
        </div>
      </section>
      <transition name="showcover">
        <div class="back_cover" v-show="sortBy"></div>
      </transition>
      <section class="shop_list_container">
        <ShopList :geohash="geohash" :restaurantCategoryId="restaurant_category_id" :restaurantCategoryIds="restaurant_category_ids" :order-by='sortByType' :deliveryMode="delivery_mode" :confirmSelect="confirmStatus" :support-ids="support_ids" v-if="geohash"></ShopList>
      </section>
    </div>
</template>

<script>
    import Head from '../Header/Head';
    import Vue from 'vue';
    import ShopList from "../common/ShopList";
    export default {
        name: "Food",
        components: {ShopList, Head},
        data() {
          return {
            //上个页面传递过来的经纬度
            geohash:'',
            //页面标题
            headTitle:'',
            //左侧排序的标题
            foodTitle:'',
            //食品类型的id
            restaurant_category_id:"",
            //筛选的id
            restaurant_category_ids:"",
            //筛选的条件
            sortBy:'',
            //左侧分类的数据
            category:null,
            //左侧分类的详细数据
            categoryDetail:null,
            // 根据何种方式排序
            sortByType: null,
            // 配送方式数据
            Delivery: null,
            // 商家支持活动数据
            Activity: null,
            // 选中的配送方式
            delivery_mode: null,
            // 选中的商铺活动列表
            support_ids: [],
            // 所选中的所有样式的集合
            filterNum: 0,
            // 确认选择
            confirmStatus: false,
            geohash1:'',
          }
        },
        mounted() {
          this.geohash = this.$route.query.geohash;
          this.headTitle = this.$route.query.title;
          this.foodTitle = this.headTitle;
          this.restaurant_category_id = this.$route.query.restaurant_category_id;
          this.geohash1 = this.geohash;
          Vue.axios.get("https://elm.cangdu.org/shopping/v2/restaurant/category?latitude="+this.geohash1.split(',')[0]+'&longitude='+this.geohash1.split(',')[1]).then((res)=>{
            // console.log(res.data)
            this.category = res.data;
            this.category.forEach(item=>{
              if(this.restaurant_category_id == item.id){
                this.categoryDetail = item.sub_categories;
              }
            });
          })
          Vue.axios.get("https://elm.cangdu.org/shopping/v1/restaurants/delivery_modes?latitude="+this.geohash1.split(',')[0]+'&longitude='+this.geohash1.split(',')[1]).then((res)=>{
            this.Delivery = res.data;
          });
          Vue.axios.get("https://elm.cangdu.org/shopping/v1/restaurants/activity_attributes?latitude="+this.geohash1.split(',')[0]+'&longitude='+this.geohash1.split(',')[1]).then((res)=>{
            this.Activity = res.data;
            this.Activity.forEach((item, index) => {
              this.support_ids[index] = { status: false, id: item.id };
            });
          })
        },
        methods: {
          async chooseType(type) {
            if (this.sortBy !== type) {
              this.sortBy = type;
              //food选项中头部标题发生改变，需要特殊处理
              if (type == "food") {
                this.foodTitle = "分类";
              } else {
                //将foodTitle 和 headTitle 进行同步
                this.foodTitle = this.headTitle;
              }
            } else {
              //再次点击相同选项时收回列表
              this.sortBy = "";
              if (type == "food") {
                //将foodTitle 和 headTitle 进行同步
                this.foodTitle = this.headTitle;
              }
            }
          },
          selectCategoryName(id, index) {
            //第一个选项 -- 全部商家 因为没有自己的列表，所以点击则默认获取选所有数据
            if (index === 0) {
              this.restaurant_category_ids = null;
              this.sortBy = "";
              //不是第一个选项时，右侧展示其子级sub_categories的列表
            } else {
              this.restaurant_category_id = id;
              this.categoryDetail = this.category[index].sub_categories;
            }
          },

          //获取筛选的条件
          sortList(event) {
            let node;
            // 如果点击的是 span 中的文字，则需要获取到 span 的父标签 p
            if (event.target.nodeName.toUpperCase() !== "P") {
              node = event.target.parentNode;
            } else {
              node = event.target;
            }
            this.sortByType = parseInt(node.getAttribute("data"));
            // console.log(this.sortByType);
            this.sortBy = "";
          },
          getCategoryIds(id,name) {
            this.restaurant_category_ids = id;
            this.sortBy = "";
            this.foodTitle = this.headTitle = name;
          },
          selectDeliveryMode(id) {
            //delivery_mode为空时，选中当前项，并且filterNum加一
            if (this.delivery_mode == null) {
              this.filterNum++;
              this.delivery_mode = id;
              //delivery_mode为当前已有值时，清空所选项，并且filterNum减一
            } else if (this.delivery_mode == id) {
              this.filterNum--;
              this.delivery_mode = null;
              //delivery_mode已有值且不等于当前选择值，则赋值delivery_mode为当前所选id
            } else {
              this.delivery_mode = id;
            }
          },
          selectSupportIds(index, id) {
            //数组替换新的值
            this.support_ids.splice(index, 1, {
              status: !this.support_ids[index].status,
              id
            });
            //重新计算filterNum的个数
            this.filterNum = this.delivery_mode == null ? 0 : 1;
            this.support_ids.forEach(item => {
              if (item.status) {
                this.filterNum++;
              }
            });
            // console.log(typeof(this.support_ids));
          },
          //只有点击清空按钮才清空数据，否则一直保持原有状态
          clearSelect() {
            this.support_ids.map(item => (item.status = false));
            this.filterNum = 0;
            this.delivery_mode = null;
          },
          //点击确认时，将需要筛选的id值传递给子组件，并且收回列表
          confirmSelectFun() {
            //状态改变时，因为子组件进行了监听，会重新获取数据进行筛选
            this.confirmStatus = !this.confirmStatus;
            this.sortBy = "";
          },
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
        }
    }
</script>

<style scoped>
  ul {
    margin-bottom: 0;
  }
  .food_container {
    padding-top: 1.95rem;
  }
  .sort_container {
    background-color: #fff;
    border-bottom: .025rem solid #f1f1f1;
    position: fixed;
    top:1.95rem;
    right: 0;
    width: 100%;
    display: flex;
    z-index: 13;
    box-sizing: border-box;
  }
  .sort_item {
    font-size: .55rem;
    color: #444;
    width: 33.3%;
    height: 1.6rem;
    text-align: center;
    line-height: 1rem;
  }
  .sort_item_container {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 14;
    background-color: #fff;
    box-sizing: border-box;
    padding-top: .3rem;
  }
  .sort_item_border {
    border-right: 0.025rem solid #e4e4e4;
    height: 1rem;
  }
  .category_title {
    color: #3190e8;
  }
  .showlist-enter-active,
  .showlist-leave-active {
    transition: all 0.3s;
    transform: translateY(0);
  }
  .showlist-enter,
  .showlist-leave-active {
    opacity: 0;
    transform: translateY(-100%);
  }
  .sort_detail_type {
    width: 100%;
    position: absolute;
    display: flex;
    top:1.6rem;
    left: 0;
    border-top: .025rem solid #e4e4e4;
    background-color: #fff;
  }
  .category_left {
    flex: 1;
    background-color: #f1f1f1;
    height: 16rem;
    overflow-y: auto;
  }
  .category_left_li {
    display: flex;
    justify-content: space-between;
    padding: 0 0.5rem;
  }
  .category_left span {
    font-size: .5rem;
    color: #666;
    line-height: 1.8rem;
  }
  .category_count {
    background-color: #ccc;
    font-size: .4rem;
    color: #fff;
    padding: 0 .1rem;
    border: .025rem solid #ccc;
    border-radius: .8rem;
    vertical-align: middle;
    margin-right: .25rem;
  }
  .category_active {
    background-color: #fff;
  }
  .category_icon {
    width: .8rem;
    height: .8rem;
    vertical-align: middle;
    margin-right: .2rem;
  }
  .category_right {
    flex: 1;
    background-color: #fff;
    padding-left: .5rem;
    height: 16rem;
    overflow-y: auto;
  }
  .category_right_li {
    display: flex;
    justify-content: space-between;
    height: 1.8rem;
    line-height: 1.8rem;
    padding-right: .5rem;
    border-bottom: 0.025rem solid #e4e4e4;
  }
  /*排序样式*/
  .sort_list_container {
    width: 100%;
  }
  .sort_list_li {
    height: 2.5rem;
    display: flex;
    align-items: center;
  }
  .sort_list_li img{
     width: .7rem;
     height: .7rem;
     margin: 0 .3rem 0 .8rem;
   }
  .sort_list_li p {
    line-height: 2.5rem;
    flex: auto;
    text-align: left;
    text-indent: .25rem;
    border-bottom: .025rem solid #e4e4e4;
    justify-content: space-between;
    align-items: center;
    vertical-align: middle;
    margin-bottom: 0;
  }
  /*右侧筛选*/
  .filter_container {
    flex-direction: column;
    align-items: flex-start;
    min-height: 10.6rem;
    background-color: #f1f1f1;
  }
  .filter_header_style {
    font-size: .4rem;
    color: #333;
    line-height: 1.5rem;
    height: 1.5rem;
    text-align: left;
    padding-left: .5rem;
    background-color: #fff;
  }
  .filter_ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 .5rem;
    background-color: #fff;
  }
  .filter_li {
    display: flex;
    align-items: center;
    border: 0.025rem solid #eee;
    width: 4.7rem;
    height: 1.4rem;
    margin-right: .25rem;
    border-radius: .125rem;
    padding: 0 .25rem;
    margin-bottom: .25rem;
  }
  .filter_li img {
    width: .8rem;
    height: .8rem;
    margin-right: .125rem;
  }
  .filter_li span {
    font-size: .4rem;
    color: #333;
  }
  .filter_li .selected_filter {
    color: #3190e8;
  }
  .filter_icon {
    width: .8rem;
    height: .8rem;
    font-size: .5rem;
    border: .025rem solid #e4e4e4;
    border-radius: .15rem;
    margin-right: .25rem;
    line-height: .8rem;
    text-align: center;
  }
  .confirm_filter {
    display: flex;
    background-color: #f1f1f1;
    width: 100%;
    padding: .3rem .2rem;
  }
  .filter_button_style {
    width: 50%;
    height: 1.8rem;
    font-size: .8rem;
    line-height: 1.8rem;
    border-radius: .2rem;
  }
  .clear_all {
    background-color: #fff;
    margin-right: .5rem;
    border: .025rem solid #fff;
  }
  .confirm_select {
    background-color: #56d176;
    color: #fff;
    border: .025rem solid #56d176;
  }
  .shop_list_container {
    margin-top: 1.5rem;
  }
  .showcover-enter-active,
  .showcover-leave-active {
    transition: opacity 0.3s;
  }
  .back_over {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0,0,0,.3)
  }
</style>
