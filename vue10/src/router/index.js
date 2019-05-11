import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Home from '../components/Home';
import City from '../components/City';
import Service from '../components/Service';
import ServiceDetail from '../components/ServiceDetail';
export default new Router({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:Home},
    {path: '/city/:cityid',component: City},
    // {path:'/',redirect:'/service'},
    {path:'/service',component:Service},
    {name:'sd',path:'/service/serviceDetail',component:ServiceDetail}
  ]
})
