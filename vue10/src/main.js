import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Vuex from 'vuex'
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(Vuex);
axios.defaults.withCredentials = true;

import {setStore,getStore} from "./LocalStorage/storeLocalStorage";
const store = new Vuex.Store({
  state: {
    youhui: [],//有几张优惠券
    user_name: '',
    historyList:[],
    addlist: [],
    AddArr: {},
    firstadd: '',
    username: '',
    phoneNum: '',
    geohash: '34.71682,113.73561 ',
    geohash1: '',
    userInfo: null,
    login: true,
    message: '',
    //商户的id
    shopId: '',
    //加入购物车的列表
    cartList: {},
    //确认备注的信息
    remarkText: '',
    //输入备注的信息
    inputText: '',
    //选择地址的信息
    place: null,
    //确认订单页的地址
    newAddress: [],
    //选择的地址
    choosedAddress: null,
    //选择地址的index
    addressIndex: null,
    orderMessage: null
  },
  mutations: {
    SetMsg(state, user_name) {
      state.user_name = user_name
    },
    setUserName(state,username){
      state.username = username;
    },
    //记录用户信息
    recordUserInfo(state, info) {
      state.userInfo = info;
      state.login = true;
      setStore('user_id', info.user_id)
    },
    //保存经纬度
    saveGeohash(state, geohash1) {
      state.geohash = geohash1;
    },
    //保存商户id
    saveShopId(state, shopId) {
      state.shopId = shopId;
    },
    //添加购物车
    addCart(state, {shopid,
      category_id,
      item_id,
      food_id,
      name,
      price,
      specs,
      packing_fee,
      sku_id,
      stock,
      shop_name,
      img_path
    }) {
      let cart = state.cartList;
      let shop = cart[shopid] = (cart[shopid] || {});
      let category = shop[category_id] = (shop[category_id] || {});
      let item = category[item_id] = (category[item_id] || {});
      if (item[food_id]) {
        item[food_id]['num']++;
      } else {
        item[food_id] = {
          "num": 1,
          "id": food_id,
          "name": name,
          "price": price,
          "specs": specs,
          "packing_fee": packing_fee,
          "sku_id": sku_id,
          "stock": stock,
          "shopName": shop_name,
          "imgPath": img_path
        };
      }
      state.cartList = {...cart};
      setStore('buyCart', state.cartList);
    },
    //减少购物车
    reduceCart(state, {
      shopid,
      category_id,
      item_id,
      food_id,
      name,
      price,
      specs,
      packing_fee,
      sku_id,
      stock
    }) {
      let cart = state.cartList;
      let shop = (cart[shopid] || {});
      let category = (shop[category_id] || {});
      let item = (category[item_id] || {});
      if (item && item[food_id]) {
        if (item[food_id]['num'] > 0) {
          item[food_id]['num']--;
          state.cartList = {...cart};
          //存入localStorage
          setStore('buyCart', state.cartList);
        } else {
          //商品数量为0，则清空当前商品的信息
          item[food_id] = null;
        }
      }
    },
    //清空购物车
    clearCart(state, shopid) {
      state.cartList[shopid] = null;
      state.cartList = {...state.cartList};
      setStore('buyCart', state.cartList);
    },
    //网页缓存的购物车
    initCart(state) {
      let initCart = getStore('buyCart');
      if (initCart) {
        state.cartList = JSON.parse(initCart);
      }
    },
    //确认备注信息
    confirmRemark(state, {
      remarkText,
      inputText
    }) {
      state.remarkText = remarkText;
      state.inputText = inputText;
    },
    //保存选择地址的功能
    chooseAddress(state, place) {
      state.place = place;
    },
    //确认地址
    confirmAddress(state, newAddress) {
      state.newAddress.push(newAddress);
    },
    //选择要收货的地址
    choosedAddress(state, {
      address,
      index
    }) {
      state.choosedAddress = address;
      state.addressIndex = index;
    },
    //保存订单的信息
    saveOrderMessage(state, orderMessage) {
      state.orderMessage = orderMessage;
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
