import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
import Home from '../components/Home';
import City from '../components/City';
import Service from '../components/Service';
import ServiceDetail from '../components/ServiceDetail';
import Wode from '../components/Wode';
import Reset from '../components/Reset';
import Register from '../components/Register';
import Balance from '../components/Balance';
import Balancecard from '../components/Balancecard';
import Integral from '../components/Integral';
import Info from '../components/Info';
import Benefit from '../components/Benefit';
import HbDescription from '../components/HbDescription';
import HbHistory from '../components/HbHistory';
import Download from '../components/Download';
import Integralcard from '../components/Integralcard';
import ChangeName from '../components/ChangeName';
import ChangeAdd from '../components/ChangeAdd';
import AppendAdd from '../components/AppendAdd';
import SearchAdd from '../components/SearchAdd';
import SearchMaster from '../components/SearchMaster';
import Msite from '../components/Msite';
import Food from '../components/Food';
import Shop from '../components/Shop';
import ShopDetail from '../components/ShopDetail';
import FoodDetail from '../components/FoodDetail';
import ConfirmOrder from '../components/ConfirmOrder';
import Payment from '../components/Payment';
import Remark from '../components/Remark';
import AddAddress from '../components/AddAddress';
import SearchAddress from "../components/SearchAddress";
import ChooseAddress from "../components/ChooseAddress";
import Order from "../components/order/Order";
import OrderDetail from "../components/order/OrderDetail";
import vipDescription from '../components/vipDescription';
import Payment from '../components/Payment';
import Usecart from '../components/Usecart';
import InvoiceRecord from '../components/InvoiceRecord';
import Coupon from '../components/Coupon';
import HbExchange from '../components/HbExchange';
import HbRecommend from '../components/HbRecommend';
import Vipcard from '../components/Vipcard';

export default new Router({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',redirect:'/home'},
    {path: '/city/:cityid',component: City},
    {path:'/service',component:Service},
    {name:'sd',path:'/service/serviceDetail',component:ServiceDetail},
    {path:'/reset',component:Reset},
    {path:'/register',component: Register},
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
    {path:'/hbHistory',component:HbHistory},
    {path:'/download',component:Download},
    {path:'/integralcard',component:Integralcard},
    {path:'/searchMaster',component:SearchMaster},
    {path:'/vipcard',component:Vipcard},
    {path:'/vipdescription',component:vipDescription},
    {path:'/payment',component:Payment},
    {path:'/usecart',component:Usecart},
    {path:'/invoiceRecord',component:InvoiceRecord},
    {path:'/coupon',component:Coupon},
    {path:'/hbexchange',component:HbExchange},
    {path:'/hbrecommend',component:HbRecommend},

    {path:'/msite',component:Msite},
    {path:'/food',component:Food},
    {path:'op',component:Shop},
    {path:'opopDetail/:shopid',component:ShopDetail},
    {path:'op/foodDetail',component:FoodDetail},
    {path:'/confirmOrder',component:ConfirmOrder},
    {path:'/confirmOrder/payment',component:Payment},
    {path:'/confirmOrder/remark',component:Remark},
    {path:'/confirmOrderooseAddress',component:ChooseAddress},
    {path:'/confirmOrderooseAddress/addAddress',component:AddAddress},
    {path:'/confirmOrderooseAddress/addAddressarchAddress',component:SearchAddress},
    {path:'/order',component:Order},
    {path:'/order/orderDetail',component:OrderDetail}
  ]
})
