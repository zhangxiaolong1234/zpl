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

const store = new Vuex.Store({
  state:{
    youhui:[],//有几张优惠券
    user_name: '',
    addlist:[],
    AddArr:{},
    firstadd:'',
    username:'',
    phoneNum:''
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
