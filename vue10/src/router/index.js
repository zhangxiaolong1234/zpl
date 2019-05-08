import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Home from '../components/Home';
import City from '../components/City';
export default new Router({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:Home},
    {path: '/city/:cityid',component: City},
  ]
})
