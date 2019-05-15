<template>
    <div class="p1">
      <!--<Benefit></Benefit>-->
      <router-view></router-view>
        <!--头部,展示子组件-->
      <div>
      <!--第一导航栏部分-->
      <div class="zplson1">
        <router-link :to="{}"><</router-link>
        <span class="zpl1">我的</span>
      </div>
      <!--头像部分-->
      <div class="p2">
          <div class="p3"><img src="../images/images/8.png" alt=""></div>
          <div class="p4">
            <span><router-link :to="{path:'/register'}">{{flag}}</router-link></span>
            <!--<div v-else></div>-->
            <p class="el-icon-mobile-phone phoneN" >暂无绑定手机号</p>
          </div>
        <div class="p5" @click="sendUser"><router-link :to="{path:'/wode/info'}">></router-link></div>

      </div>

      <!-- banner区域 -->
      <div class="banner">
        <!-- 左边余额 -->
        <div class="ban_left">
          <!-- 非固定值会替换 -->
         <router-link :to="{path:'/balance'}">
           <b class="ban_b1">0.00</b>
           <span>元</span>
           <br>
           <span>我的余额</span>
         </router-link>
        </div>
        <!-- 中间优惠 -->
        <div class="ban_middle">
          <router-link :to="{path:'/benefit'}">
            <b class="ban_b2">{{$store.state.youhui.length}}</b>
            <span>个</span>
            <br>
            <span>我的优惠</span>
          </router-link>
        </div>
        <!-- 右边积分 -->
        <div class="ban_right">
         <router-link :to="{path:'/integral'}"> <b class="ban_b3">0</b>
           <span>分</span>
           <br>
           <span>我的积分</span>
         </router-link>
        </div>
      </div>
     <div class="p6">
       <div  class="el-icon-s-unfold">
         <router-link :to="{path:''}">我的订单</router-link>
         <span>></span>
       </div>
       <br>
       <div  class="el-icon-s-goods">
         <router-link :to="{path:''}">积分商城</router-link>
         <span>></span>
       </div>
       <br>
       <div  class="el-icon-potato-strips">
         <router-link :to="{path:''}">饿了么会员卡</router-link>
         <span>></span>
       </div>
     </div>
      <!--服务中心-->
      <div class="p7">
        <div  class="el-icon-s-goods">
          <router-link :to="{path:'/service'}">服务中心</router-link>
          <span>></span>
        </div>
        <br>
        <div  class="el-icon-s-goods">
          <router-link :to="{path:'/download'}">下载饿了吗App</router-link>
          <span>></span>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
    import Info from "./Info";
    import Vue from 'vue'
    //小图标
    import ElementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    import Benefit from "./Benefit";

    Vue.use(ElementUI);
    export default {
        name: "Wode",
      data(){
          return{
            name:null,
            flag:null,
            phoneNumb:'暂无手机号'
          }
      },
      mounted(){
          Vue.axios.get('https://elm.cangdu.org/v1/user').then((res)=>{
            //console.log(res.data.username);
            this.name = res.data.username;
            if(this.name = ''){
                this.flag = '注册/登录'
            }else{
              this.flag = res.data.username;
            }

          }).catch((err)=>{
            console.log('请求错误',err);
          })
      },
      methods:{
        sendUser(){
          this.$store.state.username =this.flag;
        }
      },
      components: {Benefit, Info},
    }
</script>

<style scoped>
.p1{
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  position: absolute;
  letf:0;
  right: 0;
  bottom: 0;
  z-index: 2;
  overflow: hidden;
}
.zplson1{
  width: 100%;
  height: 10%;
  background:#3190e8;
  font-size: 1rem;
  text-align: center;
  line-height: 2rem;
  overflow: hidden;
}
.zplson1 a{
  width: 10%;
  height: 100%;
  display: block;
  color: white;
  font-size: 1.3rem;
  float:left;
}
.zpl1{
  width: 80%;
  height: 100%;
  font-size: 1rem;
  color: white;
  float:left;

}
  .p2{
    width: 100%;
    height: 4rem;
    background:#3190e8 ;
  }
  .p3{

    text-align: center;
    line-height: 2.5rem;
    float: left;
    margin-top: 1rem;
    margin-left: 0.5rem;
  }
 .p3 img{
   width: 2.5rem;
   height: 2.5rem;
   border-radius: 50%;
  }
  .p4{
    width: 60%;
    height: 60%;
    /*background: hotpink;*/
    font-size: 0.7rem;
    float: left;
    margin-top: 1rem;
    margin-left: 0.3rem;
  }
  .p4 span{
    display: block;
  }
  .p4 a{
    color: white;
    font-size: 1rem;
  }
  .p4 p.phoneN{
    color: white;
  }
  .p5{
    padding-right: .3rem;
  }
  .p5 a{
    font-size: 1rem;
    float: right;
    color: white;
    margin-top: 1.5rem;
  }
.bg-purple a{
  font-size: 1rem;
  color: orangered;
  text-align: center;
}
.bg-purple-light a{
  font-size: 1rem;
  color: lightcoral;
  text-align: center;
}
.bg-purple a{
  font-size: 1rem;
  color: green;
  text-align: center;
}

  .grid-content p{
    font-size: 0.5rem;
    color: black;
    text-align: center;
  }
  .p6{
    width: 100%;
    height: 15%;
    background: white;
    margin-top: 0.5rem;
  }
  .p6 div{
    width: 100%;
    border-bottom: 2px solid #f5f5f5;
    font-size: 0.7rem;
    padding: .5rem 0 .5rem .5rem;
  }
.p6 div a{
  color: #333;
}
  .p7{
    background: white;
    margin-top: 0.7rem;
  }
.p7 div{
  width: 100%;
  padding: .5rem 0 .5rem .5rem;
  border-bottom: 2px solid #f5f5f5;
  font-size: 0.7rem;
  color: #333;
}
  .p6 span{
      position: absolute;
      right: 0.25rem;
      color: grey;
    }
.p7 span{
  position: absolute;
  right: 0.25rem;
  color: grey;
}
.p7 div a{
  color: #333;
  text-decoration: none;
}
/* banner */
.banner{
  width: 100%;
  height: 4.5rem;
  overflow: hidden;
}
.ban_left,.ban_middle,.ban_right{
  width: 33.33%;
  height: 100%;
  float: left;
  text-align: center;
  padding-top: 1rem;
  background-color: #ffffff;
}
.ban_middle{
  border-left: 1px solid #f5f5f5;
  border-right: 1px solid #f5f5f5;
}
.ban_b1,.ban_b2,.ban_b3{
  font-weight: 700;
  font-size: 1rem;
}
.ban_b1{
  color: orangered;
}
.ban_b2{
  color: red;
}
.ban_b3{
  color: green;
}
.banner span{
  font-size: 0.8rem;
}
/* 分割 */
.part{
  width: 100%;
  height: 1rem;
}

</style>
