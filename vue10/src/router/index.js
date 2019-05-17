import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
import City from '../components/City';
import Service from '../components/Service';
import ServiceDetail from '../components/ServiceDetail';
import Wode from '../components/Wode';
import Reset from '../components/Reset';
import Register from '../components/Register';
import Seek from '../components/Seek';
import Balance from '../components/Balance';
import Balancecard from '../components/Balancecard';
import Integral from '../components/Integral';
import Info from '../components/Info';
import Benefit from '../components/Benefit';
import HbDescription from '../components/HbDescription';
import HbExchange from '../components/HbExchange';
import HbRecommend from '../components/HbRecommend';
import HbHistory from '../components/HbHistory';
import Download from '../components/Download';
import Integralcard from '../components/Integralcard';
import ChangeName from '../components/ChangeName';
import ChangeAdd from '../components/ChangeAdd';
import AppendAdd from '../components/AppendAdd';
import SearchAdd from '../components/SearchAdd';
import SearchMaster from '../components/SearchMaster';
//会员中心
import Vipcard from '../components/Vipcard';
//在线支付
import Payment from '../components/Payment';
//兑换会员
import Usecart from '../components/Usecart';
//购买记录
import InvoiceRecord from '../components/InvoiceRecord';

export default new Router({
  routes: [
    {path:'/',redirect:'/wode'},
    {path: '/city/:cityid',component: City},
    {path:'/service',component:Service},
    {name:'sd',path:'/service/serviceDetail',component:ServiceDetail},
    {path:'/reset',component:Reset},
    {path:'/register',component: Register},
    {path:'/seek',component:Seek},
    {path:'/wode',component:Wode,children:[
        {path:'info',component:Info,children:[
            {path:'changeName',component:ChangeName},
            {path:'changeAdd',component:ChangeAdd,children:[
                {path:'appendAdd/:adressLi', name:'apd',component:AppendAdd,children:[
                    {path:'searchAdd',component:SearchAdd}
                  ]}
              ]},
          ]},
      ]},
    {path:'/balance',component:Balance,children:[
        {path:'balancecard',component:Balancecard},
      ]},
    {path:'/integral',component:Integral,children: [
        {path:'balancecard',component:Balancecard},
      ]},
    {path:'/benefit',component:Benefit,children:[
        {path:'hbdescription',component:HbDescription},
      ]},
    {path:'/hbexchange',component:HbExchange},
    {path:'/hbrecommend',component:HbRecommend},
    {path:'/hbHistory',component:HbHistory},
    {path:'/download',component:Download},
    {path:'/integralcard',component:Integralcard},
    {path:'/searchMaster',component:SearchMaster},
    {path:'/vipcard',component:Vipcard},
    {path:'/payment',component:Payment},
    {path:'/usecart',component:Usecart},
    {path:'/invoiceRecord',component:InvoiceRecord},
  ]
})
