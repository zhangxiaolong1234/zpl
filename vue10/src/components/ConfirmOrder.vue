<template>
    <div class="confirmOrder_container" v-show="!showLoading">
      <Head head-title="确认订单" go-back="true" signin-up="confirmOrder"></Head>
      <router-link to='/confirmOrder/chooseAddress' class="address_container">
        <div class="address_empty_left">
          <img src="../img/dw.png" alt="" class="address">
          <div class="add_address" v-if="!choosedAddress">请添加一个收货地址</div>
          <div v-else class="address_detail">
            <header>
              <span>{{choosedAddress.name}}</span>
              <span>{{choosedAddress.sex == 1? '先生':'女士'}}</span>
              <span>{{choosedAddress.phone}}</span>
            </header>
            <div class="address_detail_footer">
              <span v-if="choosedAddress.tag" :style="{backgroundColor: iconColor(choosedAddress.tag)}">{{choosedAddress.tag}}</span>
              <p>{{choosedAddress.address_detail}}</p>
            </div>
          </div>
        </div>
        <Icon type="ios-arrow-forward" />
      </router-link>
      <!--送达的样式-->
      <section class="delivery_container container_style">
        <p class="delivery_text">送达时间</p>
        <section class="delivery_time">
          <p>尽快送达|预计 21:52</p>
          <p>蜂鸟专送</p>
        </section>
      </section>
      <!--支付方式-->
      <section class="pay_way container_style">
        <header class="pay_header">
          <span>支付方式</span>
          <div class="more_type">
            <span>在线支付</span>
          </div>
        </header>
        <section class="hongbao">
          <span>红包</span>
          <span>暂时只在饿了么 APP 中支持</span>
        </section>
      </section>
      <section class="food_list">
        <header>
          <img :src="'http://elm.cangdu.org/img/'+checkoutData[0].imgPath" alt="" class="shop_img">
          <span class="shop_title">{{checkoutData[0].shopName}}</span>
        </header>
        <ul class="food_list_ul">
          <li v-for="item in checkoutData" :key="item.id" class="food_item_style">
            <p class="food_name ellipsis">{{item.name}}</p>
            <div class="num_price">
              <span>×{{item.quantity}}</span>
              <span>{{item.price}}</span>
            </div>
          </li>
        </ul>
        <div class="food_item_style">
          <p class="food_name ellipsis">餐盒</p>
          <div class="num_price">
            <span></span>
            <span>￥4</span>
          </div>
        </div>
        <div class="food_item_style">
          <p class="food_name ellipsis">配送费</p>
          <div class="num_price">
            <span></span>
            <span>￥5</span>
          </div>
        </div>
        <div class="food_item_style total_price">
          <p class="food_name ellipsis">订单￥{{totalPrice}}</p>
          <div class="num_price">
            <span>待支付 ¥{{totalPrice}}</span>
          </div>
        </div>
      </section>
      <section class="pay_way container_style">
        <router-link :to="{path:'/confirmOrder/remark'}" class="header_style">
          <span>订单备注</span>
          <div class="more_type">
            <span class="ellipsis">{{remarkText||inputText? remarklist: '口味、偏好等'}}</span>
            <Icon type="ios-arrow-forward" class="choose_paytype"/>
          </div>
        </router-link>
        <div class="hongbao">
          <span class="fp">发票抬头</span>
          <div>
            <input type="text" placeholder="是否要开发票" class="input">
          </div>
        </div>
      </section>
      <section class="confirm_order">
        <p>待支付￥{{totalPrice}}</p>
        <p @click="confrimOrder">确认下单</p>
      </section>
      <AlertTip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></AlertTip>
      <loading v-show="showLoading"></loading>
    </div>
</template>

<script>
    import Head from "../Header/Head";
    import AlertTip from "../common/AlertTip";
    import Loading from "../common/Loading";
    export default {
        name: "ConfirmOrder",
        components: {Loading, AlertTip, Head},
        data() {
            return {
              showLoading:true,
              checkoutData:'',
              //商户的id
              shopId:'',
              //经纬度
              geohash:'',
              //购物车
              shopCart:null,
              //支付的方式
              payWayId: 1,
              //总价格
              totalPrice:0,
              //点击勾选备注的信息
              remarkText:null,
              //自定义备注的信息
              inputText:null,
              choosedAddress:null,
              showAlert:false,
              alertText:null,
              orderInfo:null
            }
        },
        created() {
          //获取上个页面传递过来的商铺id
          this.shopId = this.$route.query.shopId;
          // console.log(this.shopId);
          //获取上个页面传递过来的经纬度
          this.geohash = this.$route.query.geohash;
          // console.log(this.shopId)
          //获取vuex里面的购物车信息
          this.shopCart = this.$store.state.cartList[this.shopId];
          // console.log(this.$store.state.cartList[this.shopId]);
          //获取vuex存储备注勾选的信息
          this.remarkText = this.$store.state.remarkText;
          //获取vuex存储备注输入的信息
          this.inputText = this.$store.state.inputText;
          //获取选择的地址
          this.choosedAddress = this.$store.state.choosedAddress;
          //获取用户登录信息
          this.userInfo = this.$store.state.userInfo;
        },
        mounted() {
          if(this.geohash) {
            this.initData();
            this.hideLoading();
          }
        },
        computed: {
          remarklist: function (){
            let str = new String;
            if (this.remarkText) {
              Object.values(this.remarkText).forEach(item => {
                str += item[1] + '，';
              })
            }
            //是否有自定义备注，分开处理
            if (this.inputText) {
              return str + this.inputText;
            }else{
              return str.substr(0, str.lastIndexOf('，')) ;
            }
          }
        },
        methods: {
          //初始化数据
           initData(){
            let newArr = new Array;
            Object.values(this.shopCart).forEach(categoryItem => {
              Object.values(categoryItem).forEach(itemValue=> {
                Object.values(itemValue).forEach(item => {
                  newArr.push({
                    attrs: [],
                    extra: {},
                    id: item.id,
                    name: item.name,
                    packing_fee: item.packing_fee,
                    price: item.price,
                    quantity: item.num,
                    sku_id: item.sku_id,
                    specs: [item.specs],
                    stock: item.stock,
                    shopName:item.shopName,
                    imgPath:item.imgPath
                  })
                })
              })
            })
             // console.log(newArr)
            this.checkoutData = newArr;
            this.checkoutData.forEach(item=>{
              this.totalPrice +=item.price*item.quantity;
            });
            this.totalPrice = this.totalPrice + 4 + 5;
          },
          //文字图标
          iconColor(name){
            switch(name){
              case '公司': return '#4cd964';
              case '学校': return '#3190e8';
            }
          },
          //隐藏动画的显示
          hideLoading(){
            this.showLoading = false;
          },
          //确认下单
          confrimOrder() {
             if(!(this.userInfo&&this.userInfo.user_id)) {
               this.showAlert = true;
               this.alertText = '请登录';
               return;
             }else if(!this.choosedAddress) {
               this.showAlert= true;
               this.alertText = '请选择地址';
               return;
             }
             this.orderInfo = this.checkoutData;
             //获取下单的时间
            let date = new Date();
            let year = date.getFullYear();
            // console.log(date.getMonth())
            let month = date.getMonth()+1;
            let day = date.getDate();
            if (month < 10) {
              month = "0" + month;
            }
            if (day < 10) {
              day = "0" + day;
            }
            let hour = date.getHours();
            let minute = date.getMinutes();
            let second = date.getSeconds();
            let nowDate = year + month  + day + hour + minute + second;
            // console.log(nowDate);
            //把订单信息重新存到vuex里面
            this.orderInfo.forEach((item)=>{
              // console.log(item);
              item.choosedAddress = this.choosedAddress;
              item.remarkText = this.remarkText;
              item.inputText = this.inputText;
              item.shopId = this.shopId;
              item.geohash = this.geohash;
              item.userInfo = this.userInfo;
              item.orderTime = nowDate,
              item.totalPrice = this.totalPrice
            })
            this.$store.commit('saveOrderMessage',this.orderInfo);
            this.$router.push('/confirmOrder/payment');
          }
      }
    }
</script>

<style scoped>
  p,ul {
    margin-bottom: 0;
  }
  .confirmOrder_container {
    padding-bottom: 3rem;
  }
  .address_container,.address_empty_left {
    display: flex;
    align-items: center;
  }
  .address_container {
    min-height: 3.5rem;
    justify-content: space-between;
    padding: 0 .6rem;
    background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAGCAYAAACMyr1NAAAAAXNSR0IArs4c6QAAANxJREFUOBFjZICCpoUPWhn+M7rD+OTQjP8ZztQmymfg0/tr95JlDAz/I/GpISTHyMiwj9Ul1hmbOiaQYNfSx6qUegZkDisD01QQjQv837NMD+iYCFzyxIr/Z2asxqWWBSTx49e/LAZGXEqIFP/PcLgiUfYyPtV/GP62/P9PmU3AANnM6hhzApc9TB3zH+sCrbDFpYBYcQ42pmn41P7av8QC6BlffGoIyTEyMv5nYWCuwaeO6TfDv2x8CoiSY/y/syxa9jY+tYx//7fikydGDhggKxhdoi4Ro3bYqAEAknE5DXYMR0IAAAAASUVORK5CYII=) repeat-x 0 100%;
    background-size: auto .12rem;
    margin-top: 1.95rem;
  }
  .address {
    width: .8rem;
    height: .8rem;
    margin-right: .2rem;
  }
  .add_address {
    font-size: .7rem;
    color: #333;
  }
  .ivu-icon-ios-arrow-forward {
    width: .6rem;
    height: .6rem;
    color: #999;
  }
  .container_style {
    background-color: #fff;
    margin-top: .4rem;
    padding: 0 .7rem;
  }
  .address_detail {
    margin-left: .2rem;
  }
  .address_detail header {
    font-size: .65rem;
    color: #333;
  }
  .address_detail header span:first-of-type {
    font-size: .8rem;
    font-weight: 700;
  }
  .address_detail_footer {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .address_detail_footer span {
    font-size: .5rem;
    color: #fff;
    border-radius: .15rem;
    background-color: #ff5722;
    height: .6rem;
    line-height: .6rem;
    padding: 0 .2rem;
    margin-right: .3rem;
  }
  .address_detail_footer p {
    font-size: .55rem;
    color: #777;
  }
  /*送达时间样式*/
  .delivery_container {
    border-left: 1px solid #3190e8;
    min-height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .delivery_text {
    font-size: .8rem;
    color: #333;
    font-weight: 700;
    padding-left: .3rem;
  }
  .delivery_time {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .delivery_time p:first-of-type {
    font-size: .7rem;
    color: #3190e8;
  }
  .delivery_time p:nth-of-type(2) {
    font-size: .5rem;
    color: #fff;
    background-color: #3190e8;
    width: 2.4rem;
    margin-top: .5rem;
    text-align: center;
    border-radius: .12rem;
    padding: .1rem;
  }
  /*支付样式*/
  .pay_header {
    display: flex;
    justify-content: space-between;
    line-height: 2rem;
  }
  .pay_header span:nth-of-type(1) {
    font-size: .7rem;
    color: #666;
  }
  .more_type span:nth-of-type(1){
    font-size: .6rem;
    color: #aaa;
    width: 10rem;
    display: inline-block;
    text-align: right;
    vertical-align: middle;
  }
  .choose_paytype {
    color: #ccc;
  }
  /*红包样式*/
  .hongbao {
    display: flex;
    justify-content: space-between;
    border-top: 0.025rem solid #f5f5f5;
  }
  .hongbao span {
    font-size: .6rem;
    color: #aaa;
    line-height: 2rem;
  }
  .food_list {
    background-color: #fff;
    margin-top: .4rem;
  }
  .food_list header {
    padding: .7rem;
    border-bottom: .025rem solid #f5f5f5;
  }
  .food_list .shop_img {
    width: 1.2rem;
    height: 1.2rem;
    vertical-align: middle;
  }
  .food_list .shop_title {
    font-size: .8rem;
    color: #333;
  }
  .food_list_ul {
    padding-top: .5rem;
  }
  .food_list_ul .food_item_style {
    display: flex;
    justify-content: space-between;
    line-height: 1.8rem;
    padding: 0 .7rem;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .food_name {
    width: 11rem;
  }
  .food_item_style p,.food_item_style span {
    font-size: .65rem;
    color: #666;
  }
  .num_price {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .food_item_style .num_price span:nth-of-type(1) {
    color: #f60;
  }
  .food_list .food_item_style {
    display: flex;
    justify-content: space-between;
    line-height: 1.8rem;
    padding: 0 .7rem;
  }
  .pay_way .header_style {
    display: flex;
    justify-content: space-between;
    line-height: 2rem;
  }
  .pay_way .header_style span:first-of-type{
    font-size: .7rem;
    color: #666;
  }
  .pay_way .header_style .more_type span:first-of-type {
    font-size: .6rem;
    color: #aaa;
    width: 10rem;
    display: inline-block;
    text-align: right;
    vertical-align: middle;
  }
  .hongbao .fp {
    color: #666;
  }
  .input {
    width: 4rem;
    outline: none;
    border: 0;
    font-size: .6rem;
    text-align: center;
  }
  .input::-webkit-input-placeholder {
    color: #aaa;
  }
  .confirm_order {
    width: 100%;
    height: 2rem;
    display: flex;
    position: fixed;
    bottom: 0;
  }
  .confirm_order p {
    line-height: 2rem;
    font-size: .75rem;
    color: #fff;
  }
  .confirm_order p:first-of-type {
    flex: 5;
    padding-left: .7rem;
    background-color: #3c3c3c;
  }
  .confirm_order p:nth-of-type(2) {
    flex: 2;
    background-color: #56d176;
    text-align: center;
  }
</style>
