import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(VueAxios, axios);
Vue.config.productionTip = false
Vue.use(iView)

import Vuex from 'vuex'

Vue.use(Vuex)
axios.defaults.withCredentials = true

const store = new Vuex.Store({
  state:{
    youhui:[],//有几张优惠券
    user_name: '',
    addlist:[],
    AddArr:{}
  },
  mutations: {
    SetMsg(state, user_name) {
      state.user_name = user_name
    }
  },
  getters: {
    GetMsg:(state)=>{
      return state.user_name
    }
  },
  actions: {
    SetMsg(state, user_name) {
      store.commit("SetMsg", user_name)
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
