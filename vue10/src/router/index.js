import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Home from '../components/Home';
import Product from '../components/Product';
import Mine from '../components/Mine';
export default new Router({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:Home}
  ]
})
