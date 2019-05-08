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
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
